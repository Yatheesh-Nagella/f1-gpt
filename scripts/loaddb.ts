import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import OpenAI from "openai";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import "dotenv/config"

// Define the type for similarity algorithms
type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

const { ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    OPENAI_API_KEY
} = process.env;

// Validate required environment variables
if (!ASTRA_DB_API_ENDPOINT) {
    throw new Error('ASTRA_DB_API_ENDPOINT is required');
}
if (!ASTRA_DB_APPLICATION_TOKEN) {
    throw new Error('ASTRA_DB_APPLICATION_TOKEN is required');
}
if (!ASTRA_DB_COLLECTION) {
    throw new Error('ASTRA_DB_COLLECTION is required');
}
if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required');
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const f1Data = [
    "https://en.wikipedia.org/wiki/Formula_One",
    "https://en.wikipedia.org/wiki/History_of_Formula_One",
    "https://en.wikipedia.org/wiki/List_of_Formula_One_drivers",
    "https://www.formula1.com/en/racing/2025"
]

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

// Initialize the text splitter
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100,
});

const ensureCollection = async (similarityMetric: SimilarityMetric = "dot_product") => {
    try {
        console.log(`Checking if collection '${ASTRA_DB_COLLECTION}' exists...`);
        
        // Try to access the collection first
        const collection = await db.collection(ASTRA_DB_COLLECTION);
        
        try {
            // Try a simple operation to see if collection exists
            await collection.countDocuments({}, 1);
            console.log(`✓ Collection '${ASTRA_DB_COLLECTION}' already exists and is accessible.`);
            return;
        } catch (collectionError) {
            console.log(`Collection might not exist, attempting to create...`);
        }

        // If we get here, try to create the collection
        const res = await db.createCollection(ASTRA_DB_COLLECTION, {
            vector: {
                dimension: 1536,
                metric: similarityMetric,
            }
        });
        console.log("✓ Collection created successfully:", res);
        
    } catch (error: any) {
        // Handle the specific CollectionAlreadyExistsError
        if (error.message?.includes('already exists') || error.constructor?.name === 'CollectionAlreadyExistsError') {
            console.log(`✓ Collection '${ASTRA_DB_COLLECTION}' already exists. Continuing...`);
            return;
        }
        
        console.error("Error with collection setup:", error);
        throw error;
    }
}

const loadSampleData = async () => {
    console.log("🚀 Starting data loading process...");
    
    const collection = await db.collection(ASTRA_DB_COLLECTION);
    
    // Check existing documents count
    try {
        const existingCount = await collection.countDocuments({}, 1000);
        console.log(`📊 Current documents in collection: ${existingCount}`);
    } catch (error) {
        console.log("Could not count existing documents, continuing...");
    }
    
    let totalChunksProcessed = 0;
    
    for (const [urlIndex, url] of f1Data.entries()) {
        console.log(`\n📄 Processing ${urlIndex + 1}/${f1Data.length}: ${url}`);
        
        try {
            const content = await scrapePage(url);
            
            if (!content || content.trim().length === 0) {
                console.log(`⚠️ No content scraped from ${url}, skipping...`);
                continue;
            }
            
            const chunks = await splitter.splitText(content);
            console.log(`📝 Generated ${chunks.length} chunks from ${url}`);
            
            // Process chunks in batches to avoid rate limits
            for (const [chunkIndex, chunk] of chunks.entries()) {
                if (chunk.trim().length < 50) {
                    console.log(`⚠️ Skipping very short chunk ${chunkIndex + 1}`);
                    continue;
                }
                
                try {
                    console.log(`⚙️ Processing chunk ${chunkIndex + 1}/${chunks.length} from ${url}`);
                    
                    const embedding = await openai.embeddings.create({
                        model: "text-embedding-3-small",
                        input: chunk.trim(),
                        encoding_format: "float"
                    });

                    const vector = embedding.data[0].embedding;
                    const res = await collection.insertOne({
                        $vector: vector,
                        text: chunk.trim(),
                        source: url,
                        sourceIndex: urlIndex,
                        chunkIndex: chunkIndex,
                        createdAt: new Date().toISOString(),
                        contentLength: chunk.length
                    });
                    
                    totalChunksProcessed++;
                    console.log(`✅ Inserted chunk ${chunkIndex + 1}/${chunks.length} (Total: ${totalChunksProcessed})`);
                    
                    // Small delay to avoid rate limits
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                } catch (chunkError) {
                    console.error(`❌ Error processing chunk ${chunkIndex + 1} from ${url}:`, chunkError);
                    continue; // Continue with next chunk
                }
            }
            
            console.log(`✅ Completed processing: ${url}`);
            
        } catch (urlError) {
            console.error(`❌ Error processing URL ${url}:`, urlError);
            continue; // Continue with next URL
        }
    }
    
    console.log(`\n🎉 Finished! Processed ${totalChunksProcessed} chunks total.`);
}

// Enhanced scraping function with better error handling
const scrapePage = async (url: string): Promise<string> => {
    console.log(`🔍 Scraping: ${url}`);
    
    try {
        const loader = new PuppeteerWebBaseLoader(url, {
            launchOptions: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            },
            gotoOptions: {
                waitUntil: "domcontentloaded",
                timeout: 30000
            },
            evaluate: async (page, browser) => {
                try {
                    const result = await page.evaluate(() => {
                        // Remove script and style elements
                        const scripts = document.querySelectorAll('script, style');
                        scripts.forEach(el => el.remove());
                        
                        // Get main content (try different selectors)
                        const content = 
                            document.querySelector('main')?.textContent ||
                            document.querySelector('.mw-parser-output')?.textContent ||
                            document.querySelector('article')?.textContent ||
                            document.body.textContent ||
                            '';
                        
                        return content.trim();
                    });
                    return result;
                } finally {
                    await browser.close();
                }
            },
        });
        
        const content = await loader.scrape();
        console.log(`✅ Successfully scraped ${content?.length || 0} characters from ${url}`);
        return content || '';
        
    } catch (error) {
        console.error(`❌ Failed to scrape ${url}:`, error);
        return '';
    }
};

// Main execution
async function main() {
    try {
        await ensureCollection();
        await loadSampleData();
    } catch (error) {
        console.error("❌ Script failed:", error);
        process.exit(1);
    }
}

main();
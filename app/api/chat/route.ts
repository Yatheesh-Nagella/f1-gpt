import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse} from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  OPENAI_API_KEY,
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

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = "";

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION as string);
      
      // Fix: Use empty object {} instead of null for the filter
      const cursor = collection.find({}, {
        sort: {
          $vector: embedding.data[0].embedding,
        },
        limit: 10,
      });

      const documents = await cursor.toArray();

      const docsMap = documents?.map((doc) => doc.text);

      docContext = JSON.stringify(docsMap);
    } catch  {
      return new Response("Internal server error collection", { status: 500 });
    }

    const template = {
      role: "system" as const,
      content: `
        You are an AI assistant who knows everything about Formula 1. Use the below context to augment what you know about Formula 1. The context will provide you with the most recent page data from wikipedia and others.
        If the context doesn't include the information you need answer based on your existing knowledge and don't mention the source of your information or what the context does or doesn't include.
        Format response using markdown where applicable and don't return images.
        ---------------
        START CONTEXT
        ${docContext}
        END CONTEXT
        ---------------
        QUESTION: ${latestMessage}
        ---------------
        `,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [template, ...messages],
    });

    // Fix: Cast the response to the expected type for OpenAIStream
    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);
  } catch {
    return new Response("Internal server error embedding", { status: 500 });
  }
}

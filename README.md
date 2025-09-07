# F1-GPT 🏎️

An AI-powered Formula 1 chatbot built with Next.js, OpenAI, and DataStax Astra DB that provides intelligent answers about Formula 1 racing, drivers, teams, and history.

## 🎯 Features

- **Intelligent F1 Assistant**: Ask questions about Formula 1 drivers, teams, races, and statistics
- **Real-time Streaming**: Get responses in real-time with streaming text output
- **Vector Search**: Powered by DataStax Astra DB for semantic search through F1 knowledge base
- **Modern UI**: Clean and responsive interface with F1-themed design
- **Comprehensive Knowledge**: Pre-loaded with Wikipedia data about Formula 1

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **AI/ML**: OpenAI GPT-3.5-turbo, OpenAI Embeddings (text-embedding-3-small)
- **Database**: DataStax Astra DB (Vector Database)
- **Deployment**: Vercel (recommended)
- **Data Processing**: LangChain, Puppeteer for web scraping

## 🚀 Quick Start

### Prerequisites

- Node.js 20.11.0
- npm or yarn
- DataStax Astra DB account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yatheesh-Nagella/f1-gpt.git
   cd f1-gpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   ASTRA_DB_API_ENDPOINT=your_astra_db_endpoint
   ASTRA_DB_APPLICATION_TOKEN=your_astra_db_token
   ASTRA_DB_NAMESPACE=your_namespace
   ASTRA_DB_COLLECTION=f1gpt
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
f1-gpt/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── components/
│   │   └── Bubble.tsx            # UI component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── scripts/
│   └── loaddb.ts                 # Database seeding script
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

## 🎮 Usage

### Basic Chat
Simply type your Formula 1 questions in the chat interface:
- "Who is the current F1 champion?"
- "Tell me about Lewis Hamilton's career"
- "What are the F1 team standings?"
- "How does DRS work in Formula 1?"

### Prompt Suggestions
The app includes built-in prompt suggestions covering:
- **Current Season**: Championship standings, driver performance
- **Historical Data**: Records, legendary drivers, memorable moments
- **Technical**: Car mechanics, rules, strategies
- **Teams**: Constructor history and achievements
- **Circuits**: Track information and characteristics

## 🔧 Configuration

### Database Setup

1. **Create Astra DB Instance**
   - Sign up at [DataStax Astra](https://astra.datastax.com/)
   - Create a new Vector Database
   - Get your API endpoint and application token

2. **Collection Configuration**
   ```typescript
   // Collection settings
   dimension: 1536,          // OpenAI embedding dimension
   metric: "dot_product"     // Similarity metric
   ```

### OpenAI Configuration

- **Model**: GPT-4.0 for chat completion
- **Embeddings**: text-embedding-4.0 (1536 dimensions)
- **Streaming**: Enabled for real-time responses

## 🎨 Customization

### Adding New Data Sources

Edit `scripts/loaddb.ts` and add URLs to the `f1Data` array:
```typescript
const f1Data = [
    "https://en.wikipedia.org/wiki/Formula_One",
    "https://en.wikipedia.org/wiki/History_of_Formula_One",
    // Add more URLs here
];
```

### Modifying Prompt Suggestions

Update the suggestions in your components:
```typescript
const suggestions = [
    "Your custom F1 question here",
    // Add more suggestions
];
```

### Styling

The app uses Tailwind CSS with a red and black F1-themed color scheme:
- Primary: Red variants (`red-600`, `red-700`)
- Secondary: Black and gray tones
- Accent: White for contrast

## 📊 Performance

- **Chunk Size**: 512 characters with 100 character overlap
- **Vector Search**: Top 10 most relevant chunks per query
- **Response Time**: Typically 2-5 seconds for complete responses
- **Embedding Cache**: Embeddings stored in Astra DB for fast retrieval

## 🚨 Troubleshooting

### Common Issues

1. **Collection Already Exists Error**
   ```bash
   # The seeding script handles this automatically
   npm run seed
   ```

2. **Environment Variables Not Found**
   - Ensure all required variables are in `.env.local`
   - Check variable names match exactly

3. **OpenAI Rate Limits**
   - Implement rate limiting in production
   - Consider upgrading to higher tier OpenAI plan

4. **Module Resolution Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

## 🔐 Security

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Implement rate limiting for production deployment
- Consider implementing authentication for production use

## 📈 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   vercel --prod
   ```

2. **Add Environment Variables**
   In Vercel dashboard, add all environment variables from `.env.local`

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

### Alternative Platforms
- **Netlify**: Requires build command adjustments
- **Railway**: Good for full-stack apps
- **DigitalOcean App Platform**: Scalable option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-5 and embeddings API
- DataStax for Astra DB vector database
- LangChain for document processing
- Next.js team for the awesome framework
- Formula 1 community for the inspiration

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the DataStax Astra DB documentation
- Consult OpenAI API documentation

---

Built with ❤️ for Formula 1 fans and AI enthusiasts
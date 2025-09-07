# F1-GPT 🏎️

An AI-powered Formula 1 chatbot built with Next.js, OpenAI, and DataStax Astra DB that provides intelligent answers about Formula 1 racing, drivers, teams, and history.

**Live Demo**: [https://f1-jcx8yjg0o-yatheesh-nagellas-projects.vercel.app/](https://f1-jcx8yjg0o-yatheesh-nagellas-projects.vercel.app/)

## 🎯 Features

- **Intelligent F1 Assistant**: Ask questions about Formula 1 drivers, teams, races, and statistics
- **Real-time Streaming**: Get responses in real-time with streaming text output
- **Vector Search**: Powered by DataStax Astra DB for semantic search through F1 knowledge base
- **Modern UI**: Clean and responsive interface with glassmorphism effects and F1-themed design
- **Home & GitHub Integration**: Quick access to reset and view source code
- **Comprehensive Knowledge**: Pre-loaded with Wikipedia data about Formula 1

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Pure CSS (no framework dependencies)
- **AI/ML**: OpenAI GPT-3.5-turbo, OpenAI Embeddings (text-embedding-3-small)
- **Database**: DataStax Astra DB (Vector Database)
- **UI Components**: Lucide React icons
- **Deployment**: Vercel
- **Data Processing**: LangChain, Puppeteer for web scraping

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
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

4. **Seed the database** (optional - if you want to add more data)
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
│   │       └── route.ts            # Chat API endpoint (OpenAI + Astra DB)
│   ├── assets/
│   │   ├── background.jpeg         # Background image
│   │   └── logo.webp               # F1 GPT logo
│   ├── components/
│   │   ├── Bubble.tsx              # Chat bubble component
│   │   ├── LoadingBubble.tsx       # Loading indicator bubble
│   │   ├── PromptSuggestionsRow.tsx# Prompt suggestions row
│   │   └── PromptSuggestionButton.tsx # Individual suggestion cards
│   ├── global.css                  # Global styles with glassmorphism effects
│   ├── layout.tsx                  # App root layout
│   └── page.tsx                    # Main chat page
├── scripts/
│   └── loaddb.ts                   # Database seeding script
├── .env.local                      # Environment variables (not committed)
├── next.config.js                  # Next.js configuration
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── README.md                       # Project documentation
└── LICENSE                         # Project license
```

## 🎮 Usage

### Basic Chat
Simply type your Formula 1 questions in the chat interface:
- "Who is the current F1 champion?"
- "Tell me about Lewis Hamilton's career"
- "What are the F1 team standings?"
- "How does DRS work in Formula 1?"

### Built-in Features
- **Suggestion Cards**: Click on pre-built prompts covering standings, records, champions, history, recent events, and rules
- **Home Button**: Reset to the welcome screen anytime
- **GitHub Button**: View the source code on GitHub
- **Responsive Design**: Works seamlessly on desktop and mobile

### Prompt Categories
- **Standings**: Current F1 team standings
- **Records**: Fastest lap times and racing records
- **Champions**: World championship history and drivers
- **History**: Monaco Grand Prix and other historical events
- **Recent**: Latest championship results
- **Rules**: F1 regulations and technical details

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

- **Model**: GPT-3.5-turbo for chat completion
- **Embeddings**: text-embedding-3-small (1536 dimensions)
- **Streaming**: Enabled for real-time responses via Vercel AI SDK

## 🎨 Design Features

### Modern UI Elements
- **Glassmorphism Effects**: Semi-transparent cards with backdrop blur
- **F1 Theme**: Red and black color scheme inspired by Formula 1
- **Animated Backgrounds**: Subtle floating orbs and gradient effects
- **Responsive Grid**: Suggestion cards adapt to screen size
- **Smooth Transitions**: Hover effects and micro-interactions

### CSS Architecture
- **Pure CSS**: No external CSS frameworks for better performance
- **Custom Animations**: Pulse effects, bounce animations, and smooth transitions
- **Mobile-First**: Responsive design with mobile-optimized touch targets

## 📊 Performance

- **Chunk Size**: 512 characters with 100 character overlap
- **Vector Search**: Top 10 most relevant chunks per query
- **Response Time**: Typically 2-5 seconds for complete responses
- **Build Size**: ~110KB First Load JS for optimal performance
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
   - For Vercel deployment, add them in the dashboard
   - Check variable names match exactly

3. **OpenAI Rate Limits**
   - Implement rate limiting in production
   - Consider upgrading to higher tier OpenAI plan

4. **Build Issues**
   - Ensure Node.js 18+ is installed
   - Delete `node_modules` and run `npm install`
   - Check for TypeScript errors with `npm run build`

## 🔐 Security

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Implement rate limiting for production deployment
- Consider implementing authentication for production use

## 📈 Deployment

### Vercel Deployment (Used for live demo)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Add Environment Variables**
   In Vercel dashboard, add all variables from `.env.local`

4. **Deploy**
   Vercel automatically builds and deploys on every push to main

### Build Configuration
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 18.x

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-3.5-turbo and embeddings API
- DataStax for Astra DB vector database
- Vercel AI SDK for streaming responses
- LangChain for document processing
- Next.js team for the framework
- Lucide React for beautiful icons
- Formula 1 community for the inspiration

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the [live demo](https://f1-jcx8yjg0o-yatheesh-nagellas-projects.vercel.app/)
- Consult the DataStax Astra DB documentation
- Review OpenAI API documentation

---

Built with ❤️ for Formula 1 fans and AI enthusiasts
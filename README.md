# TechScope - Your Tech News Hub

A vibrant tech blog aggregator that curates content from major technology companies and presents their concepts in an engaging, fun, and easily digestible format for tech enthusiasts.

## Features

- **Rich Tech Content**: In-depth articles from OpenAI, Netflix, Apple, Tesla, Microsoft, Amazon, Google, and more
- **Interactive Navigation**: Functional dropdown menus for filtering by categories and sources
- **Responsive Design**: Modern UI inspired by Product Hunt and The Verge
- **Technical Deep Dives**: Detailed explanations of how companies build their technology
- **Performance Optimized**: Smooth scrolling, lazy loading, and GPU acceleration
- **Real-time Filtering**: Search and filter articles by company, category, or keywords

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **shadcn/ui** components for consistent design
- **TanStack Query** for efficient data fetching
- **Wouter** for lightweight routing

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** support (currently using in-memory storage)
- **RESTful API** design

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/techscope.git
cd techscope
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000`

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and configurations
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data storage layer
├── shared/          # Shared types and schemas
└── components.json  # shadcn/ui configuration
```

## API Endpoints

- `GET /api/articles` - List all articles with optional filtering
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles/:id/like` - Like an article
- `GET /api/sources` - List content sources
- `GET /api/categories` - List article categories

## Features in Detail

### Content Categories
- 🤖 AI & Machine Learning
- ⚡ Performance & Hardware
- 🔐 Cybersecurity
- 💻 Web Development
- 📱 Mobile Technology
- 🔗 Blockchain

### Tech Companies Covered
- OpenAI (GPT-4 Vision, AI breakthroughs)
- Netflix (AI-powered recommendations)
- Apple (M3 chip architecture)
- Tesla (Full Self-Driving technology)
- Microsoft (Azure edge computing)
- Amazon (AI-powered logistics)
- Google (Quantum computing)
- Meta (AR glasses technology)
- NVIDIA (Blackwell AI chips)
- And many more...

## Deployment

The app is designed for easy deployment to platforms like:
- Replit
- Vercel
- Netlify
- Traditional hosting providers

For production deployment, set up a PostgreSQL database and configure the `DATABASE_URL` environment variable.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Product Hunt and The Verge
- Built with modern web technologies
- Powered by real tech company innovations
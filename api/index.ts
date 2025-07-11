import express, { type Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple in-memory storage for articles
const articles = [
  {
    id: 1,
    title: "OpenAI Launches Revolutionary GPT-4 Vision: The Game-Changer for Multimodal AI",
    summary: "🎯 The Big Idea: OpenAI's latest model can now \"see\" and understand images alongside text, marking a massive leap in AI capabilities.",
    content: "OpenAI's breakthrough combines computer vision with language processing in an unprecedented way...",
    source: "OpenAI",
    sourceIcon: "🤖",
    sourceColor: "#412991",
    sourceUrl: "https://openai.com/blog/chatgpt-can-now-see-hear-and-speak",
    category: "AI/ML",
    categoryEmoji: "🤖",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=300&fit=crop",
    readTime: 3,
    views: 12500,
    likes: 456,
    featured: true,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Google's Quantum Computing Breakthrough: Willow Chip Changes Everything",
    summary: "🚀 Quantum Leap: Google's new Willow quantum processor can perform calculations in minutes that would take classical supercomputers billions of years.",
    content: "Google's Willow quantum chip represents a monumental breakthrough in quantum computing...",
    source: "Google",
    sourceIcon: "🔵",
    sourceColor: "#4285F4",
    sourceUrl: "https://blog.google/technology/research/google-willow-quantum-chip/",
    category: "AI/ML",
    categoryEmoji: "🤖",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
    readTime: 6,
    views: 15400,
    likes: 892,
    featured: false,
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  }
];

const sources = [
  { id: 1, name: "OpenAI", icon: "🤖", color: "#412991" },
  { id: 2, name: "Google", icon: "🔵", color: "#4285F4" },
  { id: 3, name: "Netflix", icon: "🔴", color: "#E50914" },
  { id: 4, name: "Apple", icon: "🍎", color: "#007AFF" },
];

const categories = [
  { id: 1, name: "AI/ML", emoji: "🤖", color: "#6366F1" },
  { id: 2, name: "Performance", emoji: "⚡", color: "#F59E0B" },
  { id: 3, name: "Security", emoji: "🔐", color: "#EF4444" },
];

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API Routes
app.get("/api/articles", (req, res) => {
  try {
    const { search, sources: sourcesFilter, categories: categoriesFilter, featured } = req.query;
    
    let filteredArticles = [...articles];
    
    if (search) {
      const searchTerm = String(search).toLowerCase();
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.summary.toLowerCase().includes(searchTerm) ||
        article.source.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)
      );
    }
    
    if (featured !== undefined) {
      filteredArticles = filteredArticles.filter(article => article.featured === (featured === 'true'));
    }
    
    res.json(filteredArticles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

app.get("/api/articles/featured", (req, res) => {
  try {
    const featuredArticles = articles.filter(article => article.featured);
    res.json(featuredArticles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch featured articles" });
  }
});

app.get("/api/articles/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const article = articles.find(a => a.id === id);
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch article" });
  }
});

app.post("/api/articles/:id/like", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const article = articles.find(a => a.id === id);
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    
    article.likes += 1;
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to like article" });
  }
});

app.get("/api/sources", (req, res) => {
  try {
    res.json(sources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sources" });
  }
});

app.get("/api/categories", (req, res) => {
  try {
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// For Vercel, export the app as default
export default app;
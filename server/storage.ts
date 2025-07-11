import { articles, sources, categories, type Article, type InsertArticle, type Source, type Category } from "@shared/schema";

export interface IStorage {
  // Articles
  getArticles(filters?: {
    sources?: string[];
    categories?: string[];
    timeRange?: string;
    search?: string;
    featured?: boolean;
  }): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticleLikes(id: number): Promise<Article | undefined>;
  
  // Sources
  getSources(): Promise<Source[]>;
  
  // Categories
  getCategories(): Promise<Category[]>;
}

export class MemStorage implements IStorage {
  private articles: Map<number, Article>;
  private sources: Map<number, Source>;
  private categories: Map<number, Category>;
  private currentArticleId: number;
  private currentSourceId: number;
  private currentCategoryId: number;

  constructor() {
    this.articles = new Map();
    this.sources = new Map();
    this.categories = new Map();
    this.currentArticleId = 1;
    this.currentSourceId = 1;
    this.currentCategoryId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize sources
    const sourcesData = [
      { name: "TechCrunch", icon: "🟢", color: "#00D562" },
      { name: "Ars Technica", icon: "🟠", color: "#FF6900" },
      { name: "Google", icon: "🔵", color: "#4285F4" },
      { name: "Meta", icon: "🔵", color: "#1877F2" },
      { name: "Stripe", icon: "🟣", color: "#6772E5" },
      { name: "Wired", icon: "⚫", color: "#000000" },
    ];

    sourcesData.forEach(source => {
      const id = this.currentSourceId++;
      this.sources.set(id, { id, ...source, active: true });
    });

    // Initialize categories
    const categoriesData = [
      { name: "AI/ML", emoji: "🤖", color: "#6366F1" },
      { name: "Blockchain", emoji: "🔗", color: "#F59E0B" },
      { name: "Security", emoji: "🔐", color: "#EF4444" },
      { name: "Mobile", emoji: "📱", color: "#10B981" },
      { name: "Web Dev", emoji: "💻", color: "#8B5CF6" },
      { name: "VR/AR", emoji: "🥽", color: "#F59E0B" },
      { name: "Fintech", emoji: "💰", color: "#EC4899" },
      { name: "Performance", emoji: "⚡", color: "#F59E0B" },
    ];

    categoriesData.forEach(category => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { id, ...category });
    });

    // Initialize articles
    const articlesData = [
      {
        title: "OpenAI Launches Revolutionary GPT-4 Vision: The Game-Changer for Multimodal AI",
        summary: "🎯 The Big Idea: OpenAI's latest model can now \"see\" and understand images alongside text, marking a massive leap in AI capabilities. Think of it as giving ChatGPT eyes!",
        content: "OpenAI's breakthrough combines computer vision with language processing in an unprecedented way...",
        source: "TechCrunch",
        sourceIcon: "🟢",
        sourceColor: "#00D562",
        category: "AI/ML",
        categoryEmoji: "🤖",
        imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=300&fit=crop",
        readTime: 3,
        views: 12500,
        likes: 456,
        featured: true,
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        title: "WebAssembly's Rise: Why Every Developer Should Care 🚀",
        summary: "💡 Simply Put: WebAssembly lets you run super-fast code in browsers, opening doors for high-performance web apps like never before.",
        content: "WebAssembly is revolutionizing web development by enabling near-native performance...",
        source: "Ars Technica",
        sourceIcon: "🟠",
        sourceColor: "#FF6900",
        category: "Web Dev",
        categoryEmoji: "💻",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
        readTime: 2,
        views: 8300,
        likes: 234,
        featured: false,
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      },
      {
        title: "Crypto Payments Go Mainstream: A Fintech Revolution 💳",
        summary: "🎯 The Shift: Major payment processors are finally embracing cryptocurrency, making digital payments as easy as using a credit card.",
        content: "The fintech industry is witnessing a paradigm shift as traditional payment methods merge with cryptocurrency...",
        source: "Stripe",
        sourceIcon: "🟣",
        sourceColor: "#6772E5",
        category: "Fintech",
        categoryEmoji: "💰",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
        readTime: 3,
        views: 6700,
        likes: 189,
        featured: false,
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      },
      {
        title: "Android 14 Privacy Features: Your Data, Your Rules 🔒",
        summary: "🛡️ What's New: Google's latest Android update puts you in complete control of your personal data with revolutionary privacy tools.",
        content: "Android 14 introduces groundbreaking privacy features that give users unprecedented control...",
        source: "Google",
        sourceIcon: "🔵",
        sourceColor: "#4285F4",
        category: "Security",
        categoryEmoji: "🔐",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
        readTime: 4,
        views: 9200,
        likes: 298,
        featured: false,
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      },
      {
        title: "Metaverse Meets Reality: Virtual Workspaces Are Here 🌐",
        summary: "🚀 The Future: Virtual offices are becoming real alternatives to physical spaces, complete with immersive collaboration tools and digital presence.",
        content: "The metaverse is no longer just a concept but a practical solution for modern workspaces...",
        source: "Meta",
        sourceIcon: "🔵",
        sourceColor: "#1877F2",
        category: "VR/AR",
        categoryEmoji: "🥽",
        imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=200&fit=crop",
        readTime: 5,
        views: 7800,
        likes: 267,
        featured: false,
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      },
      {
        title: "Quantum Computing Breakthrough: IBM's 1000-Qubit Processor",
        summary: "⚡ Game Changer: IBM's latest quantum processor brings us closer to solving problems that are impossible for classical computers.",
        content: "IBM's quantum computing milestone represents a significant step toward practical quantum applications...",
        source: "Wired",
        sourceIcon: "⚫",
        sourceColor: "#000000",
        category: "AI/ML",
        categoryEmoji: "🤖",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
        readTime: 6,
        views: 5400,
        likes: 156,
        featured: false,
        publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000), // 16 hours ago
      }
    ];

    articlesData.forEach(article => {
      const id = this.currentArticleId++;
      this.articles.set(id, { id, ...article });
    });
  }

  async getArticles(filters?: {
    sources?: string[];
    categories?: string[];
    timeRange?: string;
    search?: string;
    featured?: boolean;
  }): Promise<Article[]> {
    let articles = Array.from(this.articles.values());

    if (filters) {
      if (filters.sources && filters.sources.length > 0) {
        articles = articles.filter(article => filters.sources!.includes(article.source));
      }

      if (filters.categories && filters.categories.length > 0) {
        articles = articles.filter(article => filters.categories!.includes(article.category));
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        articles = articles.filter(article =>
          article.title.toLowerCase().includes(searchLower) ||
          article.summary.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower)
        );
      }

      if (filters.featured !== undefined) {
        articles = articles.filter(article => article.featured === filters.featured);
      }

      if (filters.timeRange) {
        const now = new Date();
        const timeLimit = new Date();
        
        switch (filters.timeRange) {
          case "24h":
            timeLimit.setHours(now.getHours() - 24);
            break;
          case "week":
            timeLimit.setDate(now.getDate() - 7);
            break;
          case "month":
            timeLimit.setMonth(now.getMonth() - 1);
            break;
        }
        
        articles = articles.filter(article => new Date(article.publishedAt) >= timeLimit);
      }
    }

    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentArticleId++;
    const article: Article = { 
      ...insertArticle, 
      id, 
      views: 0, 
      likes: 0 
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticleLikes(id: number): Promise<Article | undefined> {
    const article = this.articles.get(id);
    if (article) {
      article.likes += 1;
      this.articles.set(id, article);
      return article;
    }
    return undefined;
  }

  async getSources(): Promise<Source[]> {
    return Array.from(this.sources.values());
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
}

export const storage = new MemStorage();

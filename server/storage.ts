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
      { name: "Netflix", icon: "🔴", color: "#E50914" },
      { name: "Apple", icon: "🍎", color: "#000000" },
      { name: "Microsoft", icon: "🟦", color: "#0078D4" },
      { name: "Amazon", icon: "🟡", color: "#FF9900" },
      { name: "Tesla", icon: "⚡", color: "#CC0000" },
      { name: "OpenAI", icon: "🤖", color: "#412991" },
      { name: "Spotify", icon: "🟢", color: "#1DB954" },
      { name: "Uber", icon: "⚫", color: "#000000" },
      { name: "Airbnb", icon: "🏠", color: "#FF5A5F" },
      { name: "Shopify", icon: "🛍️", color: "#96BF48" },
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
        content: "OpenAI's breakthrough combines computer vision with language processing in an unprecedented way. This revolutionary update allows the AI to process and understand images, charts, graphs, and visual content alongside traditional text input. The implications are massive for industries ranging from education to healthcare, where visual analysis meets conversational AI. Early tests show remarkable accuracy in describing complex scenes, reading handwritten notes, and even understanding memes and cultural references in images.",
        source: "OpenAI",
        sourceIcon: "🤖",
        sourceColor: "#412991",
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
        title: "Netflix's AI Revolution: How Machine Learning Powers Your Next Binge",
        summary: "🎬 Behind the Scenes: Netflix uses advanced AI to predict what you'll love, optimize video quality, and even help create content. Their recommendation engine processes 1 trillion data points daily!",
        content: "Netflix has quietly become one of the world's most sophisticated AI companies. Their recommendation system doesn't just look at what you watch—it analyzes when you pause, rewind, or skip content. The platform uses computer vision to analyze movie scenes, natural language processing for subtitles and reviews, and deep learning to optimize streaming quality in real-time. Most fascinating is their use of AI in content creation, helping writers identify trending themes and even predicting which original shows will become hits before filming begins.",
        source: "Netflix",
        sourceIcon: "🔴",
        sourceColor: "#E50914",
        category: "AI/ML",
        categoryEmoji: "🤖",
        imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=200&fit=crop",
        readTime: 4,
        views: 8900,
        likes: 342,
        featured: false,
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
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
        title: "Apple's M3 Chip Revolution: Why Your MacBook Just Got Supercharged",
        summary: "🍎 Performance Leap: Apple's new M3 chip delivers 40% faster performance while using less power. It's like having a supercomputer in your laptop!",
        content: "Apple's M3 chip represents the culmination of years of silicon innovation. Built on 3-nanometer technology, it packs 25 billion transistors and delivers unprecedented performance per watt. The chip excels in machine learning tasks, video editing, and 3D rendering while maintaining all-day battery life. What's revolutionary is the unified memory architecture that allows the CPU, GPU, and Neural Engine to share data seamlessly, eliminating traditional bottlenecks.",
        source: "Apple",
        sourceIcon: "🍎",
        sourceColor: "#000000",
        category: "Performance",
        categoryEmoji: "⚡",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=200&fit=crop",
        readTime: 5,
        views: 11200,
        likes: 398,
        featured: false,
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
      {
        title: "Tesla's FSD Beta: Autonomous Driving Finally Gets Real",
        summary: "🚗 Future is Now: Tesla's Full Self-Driving technology is rolling out to more drivers, bringing us closer to truly autonomous vehicles on everyday roads.",
        content: "Tesla's Full Self-Driving (FSD) Beta represents the most advanced consumer-available autonomous driving technology. Using only cameras and neural networks, Tesla vehicles can navigate complex city streets, handle traffic lights, and make split-second decisions. The system learns from every Tesla on the road, creating a vast neural network that improves constantly. While not perfect, early beta testers report remarkable capabilities in urban environments that seemed impossible just years ago.",
        source: "Tesla",
        sourceIcon: "⚡",
        sourceColor: "#CC0000",
        category: "AI/ML",
        categoryEmoji: "🤖",
        imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=200&fit=crop",
        readTime: 4,
        views: 9800,
        likes: 423,
        featured: false,
        publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
      },
      {
        title: "Spotify's AI DJ: Your Personal Music Curator Gets Smarter",
        summary: "🎵 Music Discovery: Spotify's AI can now predict your mood, suggest perfect playlists, and even create custom mixes that feel like they were made just for you.",
        content: "Spotify's latest AI features go beyond simple recommendation algorithms. The platform now analyzes your listening patterns, time of day, weather, and even your recent activity to curate personalized experiences. The AI DJ feature creates seamless transitions between songs, adds commentary, and introduces you to new artists based on your evolving taste. Machine learning models process acoustic features, lyrical content, and user behavior to create the most sophisticated music discovery platform ever built.",
        source: "Spotify",
        sourceIcon: "🟢",
        sourceColor: "#1DB954",
        category: "AI/ML",
        categoryEmoji: "🤖",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
        readTime: 3,
        views: 7600,
        likes: 234,
        featured: false,
        publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000), // 9 hours ago
      },
      {
        title: "Microsoft Azure's Cloud Breakthrough: Edge Computing Goes Mainstream",
        summary: "☁️ Computing Evolution: Microsoft's edge computing solutions bring cloud power directly to your devices, reducing latency and enabling real-time applications.",
        content: "Microsoft Azure's edge computing platform is revolutionizing how we think about cloud services. By processing data closer to where it's generated, edge computing dramatically reduces latency and enables real-time applications that were previously impossible. From autonomous vehicles to smart manufacturing, Azure's edge solutions are powering the next generation of intelligent applications. The platform seamlessly integrates with existing cloud infrastructure while providing local processing power for mission-critical operations.",
        source: "Microsoft",
        sourceIcon: "🟦",
        sourceColor: "#0078D4",
        category: "Performance",
        categoryEmoji: "⚡",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
        readTime: 4,
        views: 6700,
        likes: 189,
        featured: false,
        publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000), // 11 hours ago
      },
      {
        title: "Amazon's Delivery Revolution: Drones and AI Transform Logistics",
        summary: "📦 Future Delivery: Amazon's combination of AI-powered logistics and drone delivery is reshaping how we think about getting packages from warehouse to doorstep.",
        content: "Amazon's logistics network has become a marvel of AI optimization and automation. Their fulfillment centers use machine learning to predict demand, optimize inventory placement, and coordinate robotic systems. The introduction of Prime Air drone delivery represents the next evolution, using computer vision and autonomous navigation to deliver packages within hours. AI algorithms route packages through the most efficient paths, considering weather, traffic, and delivery windows to create an almost magical customer experience.",
        source: "Amazon",
        sourceIcon: "🟡",
        sourceColor: "#FF9900",
        category: "AI/ML",
        categoryEmoji: "🤖",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=200&fit=crop",
        readTime: 5,
        views: 8300,
        likes: 267,
        featured: false,
        publishedAt: new Date(Date.now() - 13 * 60 * 60 * 1000), // 13 hours ago
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

      if (filters.timeRange && filters.timeRange !== "all") {
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
      likes: 0,
      featured: insertArticle.featured || false
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

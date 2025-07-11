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
        content: "OpenAI's breakthrough combines computer vision with language processing in an unprecedented way. This revolutionary update allows the AI to process and understand images, charts, graphs, and visual content alongside traditional text input. The implications are massive for industries ranging from education to healthcare, where visual analysis meets conversational AI.\n\nEarly tests show remarkable accuracy in describing complex scenes, reading handwritten notes, and even understanding memes and cultural references in images. The model can analyze medical scans, interpret complex diagrams, and even help with creative tasks like logo design and visual storytelling.\n\nWhat makes this truly revolutionary is the unified approach - instead of separate models for text and vision, GPT-4V processes both modalities simultaneously, creating richer understanding and more nuanced responses. This opens doors for applications in accessibility, education, content creation, and scientific research that were previously impossible with text-only AI.\n\nThe technology represents years of research in multimodal learning, where AI systems learn to correlate visual and textual information just like humans naturally do when reading illustrated books or analyzing data visualizations.",
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
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        title: "Netflix's AI Revolution: How Machine Learning Powers Your Next Binge",
        summary: "🎬 Behind the Scenes: Netflix uses advanced AI to predict what you'll love, optimize video quality, and even help create content. Their recommendation engine processes 1 trillion data points daily!",
        content: "Netflix has quietly become one of the world's most sophisticated AI companies, revolutionizing how entertainment content is discovered, created, and delivered. Their recommendation system is far more complex than simply tracking what you watch—it analyzes micro-behaviors like when you pause, rewind, fast-forward, or abandon content, creating detailed viewing fingerprints.\n\nThe platform employs computer vision algorithms to analyze individual movie frames, identifying visual elements, color palettes, and even emotional tones in scenes. This visual analysis is combined with natural language processing of subtitles, reviews, and metadata to create comprehensive content profiles. The result? Eerily accurate predictions about what you'll want to watch next.\n\nBut Netflix's AI goes beyond recommendations. Their algorithms optimize video encoding and streaming quality in real-time, adjusting bitrates based on your device, connection speed, and viewing conditions. They use machine learning to determine optimal thumbnail images for each show, personalizing even the artwork you see based on your preferences.\n\nPerhaps most intriguingly, Netflix leverages AI in content creation itself. Their algorithms analyze viewing patterns to identify trending themes, optimal episode lengths, and even predict which original series concepts are most likely to succeed before production begins. This data-driven approach to entertainment has fundamentally changed how content is greenlit and produced in Hollywood.",
        source: "Netflix",
        sourceIcon: "🔴",
        sourceColor: "#E50914",
        sourceUrl: "https://research.netflix.com/business-area/machine-learning",
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
        title: "Apple's M3 Chip Revolution: Why Your MacBook Just Got Supercharged",
        summary: "🍎 Performance Leap: Apple's new M3 chip delivers 40% faster performance while using less power. It's like having a supercomputer in your laptop!",
        content: "Apple's M3 chip represents the culmination of years of relentless silicon innovation, marking a watershed moment in personal computing performance. Built on cutting-edge 3-nanometer process technology, this marvel of engineering packs an staggering 25 billion transistors into a space smaller than a postage stamp, delivering unprecedented performance per watt that redefines what's possible in portable computing.\n\nThe M3's architecture is a masterclass in efficiency. The chip excels in machine learning tasks, professional video editing, and complex 3D rendering while maintaining the all-day battery life that has become Apple's signature. This isn't just about raw speed—it's about intelligent performance that adapts to your workflow.\n\nWhat makes the M3 truly revolutionary is its unified memory architecture (UMA), a design philosophy that eliminates the traditional bottlenecks between CPU, GPU, and Neural Engine. Instead of data shuttling between separate memory pools, all processing units share a single, high-bandwidth memory system, enabling seamless collaboration between different types of workloads.\n\nThe real-world implications are profound: 4K video editing that feels effortless, AI-powered features that respond instantly, and creative workflows that no longer require compromises between performance and portability. The M3 doesn't just make computers faster—it makes them smarter, anticipating and accelerating the tasks that matter most to users.",
        source: "Apple",
        sourceIcon: "🍎",
        sourceColor: "#000000",
        sourceUrl: "https://www.apple.com/newsroom/2023/10/apple-unveils-m3-m3-pro-and-m3-max-the-most-advanced-chips-for-a-personal-computer/",
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
        content: "Tesla's Full Self-Driving (FSD) Beta represents the most advanced consumer-available autonomous driving technology. Using only cameras and neural networks, Tesla vehicles can navigate complex city streets, handle traffic lights, and make split-second decisions. The system learns from every Tesla on the road, creating a vast neural network that improves constantly.\n\nWhat sets Tesla's approach apart is their commitment to pure vision-based autonomy. While competitors rely on expensive LiDAR sensors, Tesla believes that if humans can drive with just their eyes, so can AI. This philosophy has led to breakthrough developments in computer vision and neural network architectures specifically designed for real-world driving scenarios.\n\nThe FSD Beta continuously improves through over-the-air updates, literally getting smarter overnight. Each Tesla on the road contributes to a massive dataset that helps the system learn to handle edge cases and unusual driving scenarios. From navigating construction zones to dealing with aggressive drivers, the system is becoming remarkably human-like in its decision-making.\n\nWhile regulatory approval and safety validation remain ongoing challenges, Tesla's FSD Beta represents a glimpse into a future where autonomous vehicles could revolutionize transportation, reduce accidents, and provide mobility solutions for those unable to drive traditional vehicles.",
        source: "Tesla",
        sourceIcon: "⚡",
        sourceColor: "#CC0000",
        sourceUrl: "https://www.tesla.com/support/autopilot",
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
        content: "Spotify's latest AI features go beyond simple recommendation algorithms, creating a truly personalized music experience that feels almost telepathic. The platform now analyzes your listening patterns, time of day, weather conditions, and even your recent activity to curate experiences that match your exact mood and context.\n\nThe AI DJ feature represents a breakthrough in automated content curation. It creates seamless transitions between songs, adds personalized commentary, and introduces you to new artists based on your evolving taste profile. The system understands not just what you like, but when and why you like it, creating different musical journeys for your morning commute versus your evening workout.\n\nBehind the scenes, sophisticated machine learning models process acoustic features like tempo, key, and energy levels alongside lyrical content and cultural context. The AI considers factors like genre evolution, seasonal trends, and even global events to keep recommendations fresh and relevant.\n\nPerhaps most impressively, Spotify's AI learns from negative feedback as much as positive. When you skip a song, the system doesn't just note the rejection—it analyzes exactly when you skipped, what you were doing, and what you played next to build a more nuanced understanding of your preferences.",
        source: "Spotify",
        sourceIcon: "🟢",
        sourceColor: "#1DB954",
        sourceUrl: "https://newsroom.spotify.com/2023-02-22/spotify-debuts-a-new-ai-dj-right-in-your-pocket/",
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
        content: "Microsoft Azure's edge computing platform is revolutionizing how we think about cloud services, bringing computational power closer to where data is generated and actions need to be taken. By processing data at the edge of the network rather than in distant data centers, this approach dramatically reduces latency and enables real-time applications that were previously impossible.\n\nThe implications span numerous industries. In autonomous vehicles, edge computing enables split-second decision-making without relying on potentially unreliable internet connections. In smart manufacturing, real-time analysis of sensor data can prevent equipment failures before they occur. Healthcare applications can process patient monitoring data instantly, triggering immediate alerts when intervention is needed.\n\nAzure's edge solutions seamlessly integrate with existing cloud infrastructure, creating a hybrid environment where some processing happens locally while other tasks leverage the full power of cloud resources. This flexibility allows organizations to optimize for both performance and cost, keeping latency-sensitive operations local while utilizing cloud scalability for data-intensive analytics.\n\nThe platform includes specialized hardware optimized for edge deployments, AI-powered management tools that automatically optimize workload placement, and robust security features that protect data across distributed environments. As 5G networks expand and IoT devices proliferate, edge computing is becoming essential infrastructure for the next generation of intelligent applications.",
        source: "Microsoft",
        sourceIcon: "🟦",
        sourceColor: "#0078D4",
        sourceUrl: "https://azure.microsoft.com/en-us/solutions/edge-computing/",
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
        content: "Amazon's logistics network has evolved into a marvel of AI optimization and automation that processes millions of packages daily with unprecedented efficiency. Their fulfillment centers represent the cutting edge of robotic automation, where machine learning algorithms predict demand patterns, optimize inventory placement, and coordinate complex robotic systems that work alongside human employees.\n\nThe introduction of Prime Air drone delivery represents the next evolutionary leap in logistics. These autonomous aircraft use advanced computer vision and navigation systems to deliver packages directly to customers' backyards within hours of ordering. The drones can navigate complex urban environments, avoid obstacles, and land precisely in designated delivery zones.\n\nBehind the scenes, sophisticated AI algorithms orchestrate the entire supply chain. Machine learning models analyze purchasing patterns, weather conditions, traffic data, and delivery windows to determine optimal routing strategies. The system can predict which items will be popular in specific geographic areas and preposition inventory accordingly, reducing delivery times.\n\nPerhaps most impressively, Amazon's logistics AI learns and adapts continuously. Every delivery provides data that improves future routing decisions, and the system automatically adjusts to changing conditions like traffic patterns, weather events, or special circumstances. This creates an almost magical customer experience where packages seem to arrive exactly when needed.",
        source: "Amazon",
        sourceIcon: "🟡",
        sourceColor: "#FF9900",
        sourceUrl: "https://www.amazon.com/Amazon-Prime-Air/b?node=8037720011",
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

import express from "express";

// Complete article collection for Vercel deployment
const articles = [
  {
    id: 1,
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
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
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
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
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
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
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
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
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
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 6,
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
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 7,
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
    publishedAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 8,
    title: "Google's Quantum Computing Breakthrough: Willow Chip Changes Everything",
    summary: "🚀 Quantum Leap: Google's new Willow quantum processor can perform calculations in minutes that would take classical supercomputers billions of years.",
    content: "Google's Willow quantum chip represents a monumental breakthrough in quantum computing, solving a calculation in under 5 minutes that would take today's fastest supercomputers 10 septillion years to complete. This isn't just faster computing—it's a fundamental shift in how we approach computational problems that were previously impossible.\n\nThe Willow chip features 105 qubits arranged in a sophisticated architecture that maintains quantum coherence longer than any previous system. What makes this revolutionary is the breakthrough in quantum error correction. For the first time, adding more qubits actually reduces errors rather than increasing them, solving a problem that has plagued quantum computing for decades.\n\nThe implications span multiple industries. In drug discovery, Willow could simulate molecular interactions with unprecedented accuracy, accelerating the development of new medicines. In cryptography, it threatens current encryption methods while enabling quantum-safe security protocols. For artificial intelligence, quantum-enhanced machine learning could solve optimization problems that are intractable for classical computers.\n\nGoogle's approach uses superconducting qubits cooled to near absolute zero, creating a quantum state where particles can exist in multiple states simultaneously. This superposition, combined with quantum entanglement, enables parallel processing on a scale that classical computers cannot match. The team has demonstrated quantum supremacy in specific tasks, proving that quantum advantages are not just theoretical but practically achievable.",
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
  },
  {
    id: 9,
    title: "Meta's AR Glasses: The Future of Mixed Reality is Here",
    summary: "🥽 Reality Reimagined: Meta's latest AR glasses blend digital and physical worlds seamlessly, powered by custom silicon and advanced AI.",
    content: "Meta's breakthrough AR glasses represent the convergence of years of research in optics, miniaturization, and artificial intelligence. Unlike bulky VR headsets, these glasses look nearly identical to regular eyewear while projecting high-resolution holograms directly into your field of vision.\n\nThe technical achievement is staggering. Custom silicon chips, smaller than a fingernail, process complex 3D environments in real-time while maintaining all-day battery life. Advanced waveguide technology directs light precisely to create sharp, bright images that appear to float in space. Eye-tracking sensors with sub-millimeter precision ensure holograms remain perfectly anchored to the real world.\n\nThe AI integration is particularly impressive. Computer vision algorithms continuously map your environment, identifying objects, surfaces, and people with remarkable accuracy. Natural language processing enables voice commands that feel truly conversational. The system learns your preferences and habits, proactively surfacing relevant information without being intrusive.\n\nPractical applications are endless. Architects can visualize buildings before construction, surgeons can access patient data without looking away from operations, and remote workers can collaborate as if they're in the same room. The glasses seamlessly switch between augmented reality overlays and traditional computing interfaces, making digital information feel as natural as physical objects.",
    source: "Meta",
    sourceIcon: "🔵",
    sourceColor: "#1877F2",
    sourceUrl: "https://about.meta.com/realitylabs/orion/",
    category: "VR/AR",
    categoryEmoji: "🥽",
    imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=200&fit=crop",
    readTime: 5,
    views: 12800,
    likes: 567,
    featured: false,
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 10,
    title: "NVIDIA's Next-Gen AI Chips: Blackwell Architecture Unleashed",
    summary: "💎 Processing Power: NVIDIA's Blackwell chips deliver 20x performance improvements for AI training while using 50% less energy.",
    content: "NVIDIA's Blackwell architecture represents the most significant leap in AI computing since the introduction of GPUs for machine learning. Built on advanced 4nm process technology, these chips integrate 208 billion transistors into a revolutionary design that fundamentally changes how AI models are trained and deployed.\n\nThe breakthrough lies in the multi-chip module design. Two GPU dies are connected by a 10TB/s NVLink interconnect, creating what effectively functions as a single, massive processor. This approach overcomes the physical limitations of single-chip designs while maintaining the tight coupling necessary for AI workloads. The result is unprecedented performance for large language models and computer vision tasks.\n\nBlackwell's transformer engine is specifically optimized for the attention mechanisms that power modern AI. Hardware-accelerated operations that previously required multiple processing steps now complete in single clock cycles. The chip includes dedicated tensor cores for mixed-precision arithmetic, enabling faster training without sacrificing model accuracy.\n\nEnergy efficiency improvements are equally impressive. Advanced power management dynamically adjusts voltage and frequency based on workload requirements. Sparsity optimization automatically identifies and skips zero-value computations, reducing power consumption by up to 50% for typical AI workloads. These improvements make training frontier AI models more accessible while reducing environmental impact.",
    source: "NVIDIA",
    sourceIcon: "🟢",
    sourceColor: "#76B900",
    sourceUrl: "https://www.nvidia.com/en-us/data-center/blackwell/",
    category: "Performance",
    categoryEmoji: "⚡",
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop",
    readTime: 7,
    views: 18200,
    likes: 743,
    featured: false,
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 11,
    title: "Uber's Autonomous Fleet: Self-Driving Cars Hit the Streets",
    summary: "🚗 Driverless Future: Uber's autonomous vehicles are now operating in select cities, combining LiDAR, cameras, and AI for safe navigation.",
    content: "Uber's autonomous vehicle program has reached a crucial milestone with the deployment of self-driving cars in real-world conditions. The technical complexity of this achievement cannot be overstated—these vehicles must safely navigate unpredictable urban environments while maintaining the reliability and safety standards passengers expect.\n\nThe sensor fusion system is the heart of the technology. Multiple LiDAR units create precise 3D maps of the environment, while high-resolution cameras provide detailed visual information about traffic signs, pedestrians, and road conditions. Radar sensors detect objects in adverse weather conditions when cameras might struggle. All this data is processed by AI systems that make thousands of decisions per second.\n\nThe AI software stack represents years of development and testing. Deep learning models trained on millions of miles of driving data can predict pedestrian behavior, anticipate traffic patterns, and respond to edge cases that human programmers never explicitly coded. The system continuously learns from the entire fleet, with insights from one vehicle immediately shared with all others.\n\nSafety systems include multiple redundancies. If any sensor fails, backup systems maintain full functionality. Remote human operators can intervene if the AI encounters situations beyond its training. The vehicles communicate with Uber's traffic management systems, optimizing routes based on real-time conditions and coordinating with other autonomous vehicles to reduce congestion.",
    source: "Uber",
    sourceIcon: "⚫",
    sourceColor: "#000000",
    sourceUrl: "https://www.uber.com/us/en/autonomous/",
    category: "AI/ML",
    categoryEmoji: "🤖",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop",
    readTime: 6,
    views: 14500,
    likes: 634,
    featured: false,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 12,
    title: "Airbnb's AI Host: Machine Learning Transforms Travel Experiences",
    summary: "🏠 Smart Hospitality: Airbnb's AI algorithms personalize every aspect of travel, from recommendations to pricing optimization.",
    content: "Airbnb's AI transformation goes far beyond simple property recommendations. The platform has evolved into a sophisticated machine learning ecosystem that optimizes every aspect of the travel experience, from initial search to post-stay feedback, creating unprecedented personalization at scale.\n\nThe recommendation engine analyzes hundreds of factors to match guests with perfect properties. Machine learning models consider travel history, seasonal preferences, group dynamics, and even subtle behavioral patterns like how long users spend viewing certain types of photos. The system learns from successful bookings and continuously refines its understanding of what makes a great match.\n\nDynamic pricing algorithms represent another breakthrough. The system analyzes local events, weather patterns, competitor pricing, and historical demand to optimize rates in real-time. This isn't just automated pricing—it's predictive economics that anticipates market changes before they happen. Hosts benefit from optimized revenue while guests get fair pricing based on true market value.\n\nThe AI also enhances safety and trust through sophisticated fraud detection. Computer vision analyzes property photos for authenticity, natural language processing evaluates review sentiment for anomalies, and behavioral analysis identifies suspicious booking patterns. These systems work invisibly in the background, maintaining platform integrity while enabling genuine connections between hosts and guests.",
    source: "Airbnb",
    sourceIcon: "🔴",
    sourceColor: "#FF5A5F",
    sourceUrl: "https://news.airbnb.com/airbnb-2023-winter-release/",
    category: "AI/ML",
    categoryEmoji: "🤖",
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=200&fit=crop",
    readTime: 5,
    views: 11200,
    likes: 445,
    featured: false,
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 13,
    title: "Shopify's Commerce Engine: AI-Powered E-commerce Revolution",
    summary: "🛒 Retail Innovation: Shopify's AI tools help merchants predict trends, optimize inventory, and create personalized shopping experiences.",
    content: "Shopify's AI revolution is transforming e-commerce from reactive retail to predictive commerce. The platform's machine learning capabilities don't just process transactions—they anticipate customer behavior, optimize supply chains, and create shopping experiences that feel almost telepathic in their relevance.\n\nThe predictive analytics engine analyzes millions of transactions to identify emerging trends before they become obvious. Machine learning models detect patterns in seasonal buying, geographic preferences, and product correlations that human analysts might miss. This enables merchants to stock inventory proactively and launch marketing campaigns at optimal moments.\n\nPersonalization reaches unprecedented levels through deep learning algorithms that understand individual customer journeys. The system tracks micro-interactions—how long someone hovers over a product, which images they zoom in on, what they add to cart but don't purchase. This behavioral data creates detailed customer profiles that enable hyper-targeted product recommendations and dynamic pricing.\n\nThe AI-powered fulfillment network optimizes logistics in real-time. Algorithms predict demand by geographic region, automatically rebalance inventory across warehouses, and choose optimal shipping methods based on cost, speed, and environmental impact. This creates a seamless experience where products seem to magically appear when and where customers need them, while merchants enjoy reduced costs and improved efficiency.",
    source: "Shopify",
    sourceIcon: "🟢",
    sourceColor: "#96BF48",
    sourceUrl: "https://www.shopify.com/editions/summer2024",
    category: "AI/ML",
    categoryEmoji: "🤖",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
    readTime: 6,
    views: 13700,
    likes: 521,
    featured: false,
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 14,
    title: "Stripe's Financial Infrastructure: AI-Powered Payment Processing",
    summary: "💳 Fintech Evolution: Stripe's AI algorithms detect fraud, optimize routing, and provide real-time financial insights for global commerce.",
    content: "Stripe's AI-powered financial infrastructure has evolved beyond simple payment processing into a sophisticated economic intelligence platform. The system processes millions of transactions daily while making thousands of real-time decisions about fraud detection, payment routing, and risk assessment that would be impossible for human operators.\n\nThe fraud detection engine employs advanced machine learning models that analyze transaction patterns, user behavior, and contextual signals to identify suspicious activity with remarkable accuracy. The system learns from every transaction, continuously improving its ability to distinguish between legitimate purchases and fraudulent attempts. False positive rates have dropped dramatically while catching sophisticated fraud attempts that traditional rules-based systems miss.\n\nIntelligent payment routing optimizes transaction success rates by automatically selecting the best payment processor for each transaction. The AI considers factors like geographic location, payment method, transaction amount, and historical success rates to route payments through the most reliable path. This optimization increases approval rates while reducing processing costs for merchants.\n\nThe platform provides real-time financial insights through sophisticated analytics that go beyond simple transaction reporting. Machine learning models identify revenue trends, predict cash flow patterns, and detect anomalies that might indicate business issues or opportunities. These insights enable businesses to make data-driven decisions about pricing, inventory, and growth strategies.",
    source: "Stripe",
    sourceIcon: "🟣",
    sourceColor: "#6772E5",
    sourceUrl: "https://stripe.com/radar",
    category: "Fintech",
    categoryEmoji: "💰",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    readTime: 6,
    views: 15600,
    likes: 578,
    featured: false,
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
  }
];

const sources = [
  { id: 1, name: "TechCrunch", icon: "🟢", color: "#00D562" },
  { id: 2, name: "Ars Technica", icon: "🟠", color: "#FF6900" },
  { id: 3, name: "Google", icon: "🔵", color: "#4285F4" },
  { id: 4, name: "Meta", icon: "🔵", color: "#1877F2" },
  { id: 5, name: "Stripe", icon: "🟣", color: "#6772E5" },
  { id: 6, name: "Wired", icon: "⚫", color: "#000000" },
  { id: 7, name: "Netflix", icon: "🔴", color: "#E50914" },
  { id: 8, name: "Apple", icon: "🍎", color: "#000000" },
  { id: 9, name: "Microsoft", icon: "🟦", color: "#0078D4" },
  { id: 10, name: "Amazon", icon: "🟡", color: "#FF9900" },
  { id: 11, name: "Tesla", icon: "⚡", color: "#CC0000" },
  { id: 12, name: "OpenAI", icon: "🤖", color: "#412991" },
  { id: 13, name: "Spotify", icon: "🟢", color: "#1DB954" },
  { id: 14, name: "Uber", icon: "⚫", color: "#000000" },
  { id: 15, name: "Airbnb", icon: "🏠", color: "#FF5A5F" },
  { id: 16, name: "Shopify", icon: "🛍️", color: "#96BF48" },
  { id: 17, name: "NVIDIA", icon: "🟢", color: "#76B900" },
  { id: 18, name: "X", icon: "⚫", color: "#000000" },
  { id: 19, name: "GitHub", icon: "⚫", color: "#24292e" },
  { id: 20, name: "AMD", icon: "🔴", color: "#ED1C24" },
];

const categories = [
  { id: 1, name: "AI/ML", emoji: "🤖", color: "#6366F1" },
  { id: 2, name: "Blockchain", emoji: "🔗", color: "#F59E0B" },
  { id: 3, name: "Security", emoji: "🔐", color: "#EF4444" },
  { id: 4, name: "Mobile", emoji: "📱", color: "#10B981" },
  { id: 5, name: "Web Dev", emoji: "💻", color: "#8B5CF6" },
  { id: 6, name: "VR/AR", emoji: "🥽", color: "#F59E0B" },
  { id: 7, name: "Fintech", emoji: "💰", color: "#EC4899" },
  { id: 8, name: "Performance", emoji: "⚡", color: "#F59E0B" },
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
    
    if (sourcesFilter) {
      const sourcesList = Array.isArray(sourcesFilter) ? sourcesFilter : [sourcesFilter];
      filteredArticles = filteredArticles.filter(article => 
        sourcesList.includes(article.source)
      );
    }
    
    if (categoriesFilter) {
      const categoriesList = Array.isArray(categoriesFilter) ? categoriesFilter : [categoriesFilter];
      filteredArticles = filteredArticles.filter(article => 
        categoriesList.includes(article.category)
      );
    }
    
    if (featured !== undefined) {
      filteredArticles = filteredArticles.filter(article => article.featured === (featured === 'true'));
    }
    
    // Sort by published date (newest first)
    filteredArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
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

// For Vercel serverless functions
export default (req: any, res: any) => {
  return app(req, res);
};
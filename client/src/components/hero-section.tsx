export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stay Ahead of the Tech Curve 🚀
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover, learn, and explore the latest tech trends through curated content from industry leaders, 
            simplified for everyone.
          </p>
        </div>
        
        {/* Featured Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-card rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Tech Blogs</div>
          </div>
          <div className="text-center p-4 bg-card rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-secondary">1.2K</div>
            <div className="text-sm text-muted-foreground">Articles Daily</div>
          </div>
          <div className="text-center p-4 bg-card rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-accent">99%</div>
            <div className="text-sm text-muted-foreground">Quality Score</div>
          </div>
          <div className="text-center p-4 bg-card rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-highlight">2min</div>
            <div className="text-sm text-muted-foreground">Avg Read Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}

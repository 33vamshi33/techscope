import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🔭</span>
              </div>
              <h3 className="text-xl font-bold">TechScope</h3>
            </div>
            <p className="text-muted max-w-md">
              Curating the best tech content from around the web, 
              making complex concepts accessible to everyone in the tech community.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Browse</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted hover:text-background transition-colors">Featured Articles</a>
              <a href="#" className="block text-muted hover:text-background transition-colors">AI & Machine Learning</a>
              <a href="#" className="block text-muted hover:text-background transition-colors">Web Development</a>
              <a href="#" className="block text-muted hover:text-background transition-colors">Mobile Tech</a>
              <a href="#" className="block text-muted hover:text-background transition-colors">Security</a>
            </div>
          </div>
          
          {/* Sources */}
          <div>
            <h4 className="font-semibold mb-4">Sources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted hover:text-background transition-colors">TechCrunch</a>
              <a href="#" className="block text-muted hover:text-background transition-colors">Ars Technica</a>
              <a href="#" className="block text-muted hover:text-background transition-colors">Wired</a>
              <a href="#" className="block text-muted hover:text-background transition-colors">The Verge</a>
              <a href="#" className="block text-muted hover:text-background transition-colors">All Sources</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            © 2024 TechScope. Made with ❤️ for the tech community.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted hover:text-background text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted hover:text-background text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-muted hover:text-background text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Search, Menu, Bookmark, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "wouter";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🔭</span>
              </div>
              <h1 className="text-xl font-bold text-primary">TechScope</h1>
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tech topics, blogs, or concepts..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Featured
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center">
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem 
                className="cursor-pointer hover:bg-accent" 
                onClick={() => onSearchChange("AI")}
              >
                  <span className="mr-2">🤖</span>
                  AI & Machine Learning
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("performance")}
                >
                  <span className="mr-2">⚡</span>
                  Performance
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("security")}
                >
                  <span className="mr-2">🔐</span>
                  Cybersecurity
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("blockchain")}
                >
                  <span className="mr-2">🔗</span>
                  Blockchain
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("web")}
                >
                  <span className="mr-2">💻</span>
                  Web Development
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("mobile")}
                >
                  <span className="mr-2">📱</span>
                  Mobile Technology
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center">
                  Sources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("OpenAI")}
                >
                  <span className="mr-2">🤖</span>
                  OpenAI
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("Netflix")}
                >
                  <span className="mr-2">🔴</span>
                  Netflix
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("Apple")}
                >
                  <span className="mr-2">🍎</span>
                  Apple
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("Tesla")}
                >
                  <span className="mr-2">⚡</span>
                  Tesla
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("Spotify")}
                >
                  <span className="mr-2">🟢</span>
                  Spotify
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("Microsoft")}
                >
                  <span className="mr-2">🟦</span>
                  Microsoft
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-accent" 
                  onClick={() => onSearchChange("Amazon")}
                >
                  <span className="mr-2">🟡</span>
                  Amazon
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
              <Bookmark className="mr-2 h-4 w-4" />
              My Feed
            </Button>
          </nav>
          
          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Menu className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/" className="w-full">Featured</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="w-full">Categories</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="w-full">Sources</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="w-full flex items-center">
                  <Bookmark className="mr-2 h-4 w-4" />
                  My Feed
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

import { Clock, Eye, Heart, Share, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Article } from "@shared/schema";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/articles/${article.id}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      queryClient.invalidateQueries({ queryKey: ['/api/articles/featured'] });
      toast({
        title: "Article liked!",
        description: "Thanks for your feedback.",
      });
    },
  });

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Link href={`/article/${article.id}`}>
      <div className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group card-hover">
      <img 
        src={article.imageUrl} 
        alt={article.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="mr-2" style={{ color: article.sourceColor }}>
            {article.sourceIcon}
          </span>
          <span className="text-sm text-muted-foreground font-medium">{article.source}</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{timeAgo(article.publishedAt)}</span>
          <div className="ml-auto flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {article.categoryEmoji} {article.category}
            </Badge>
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              🚀 Featured
            </Badge>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {article.readTime} min read
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <Eye className="mr-1 h-4 w-4" />
              {article.views.toLocaleString()} views
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                likeMutation.mutate();
              }}
              disabled={likeMutation.isPending}
              className="p-2 text-muted-foreground hover:text-highlight transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span className="ml-1 text-xs">{article.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-muted-foreground hover:text-secondary transition-colors"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

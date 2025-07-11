import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share, Bookmark } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/articles/${article.id}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
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
    <div className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group card-hover">
      <img 
        src={article.imageUrl} 
        alt={article.title}
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      <div className="p-5">
        <div className="flex items-center mb-3">
          <span className="mr-2" style={{ color: article.sourceColor }}>
            {article.sourceIcon}
          </span>
          <span className="text-sm text-muted-foreground">{article.source}</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{timeAgo(article.publishedAt)}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              {article.categoryEmoji} {article.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">{article.readTime} min read</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                likeMutation.mutate();
              }}
              disabled={likeMutation.isPending}
              className="p-1 text-muted-foreground hover:text-highlight transition-colors"
            >
              <Heart className="h-3 w-3" />
              <span className="ml-1 text-xs">{article.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-muted-foreground hover:text-accent transition-colors"
            >
              <Share className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-muted-foreground hover:text-secondary transition-colors"
            >
              <Bookmark className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

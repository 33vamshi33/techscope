import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Eye, Heart, Share, Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ArticlePage() {
  const [, params] = useRoute("/article/:id");
  const articleId = params?.id;
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: article, isLoading } = useQuery({
    queryKey: [`/api/articles/${articleId}`],
    enabled: !!articleId,
  });

  const likeMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/articles/${articleId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/articles/${articleId}`] });
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-64 w-full mb-6 rounded-xl" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background page-transition smooth-scroll">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-up">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 p-0 h-auto text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>

        {/* Hero Image */}
        <div className="relative mb-8">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
          />
          {article.featured && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
              ⭐ Featured
            </Badge>
          )}
        </div>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center">
            <span className="mr-2" style={{ color: article.sourceColor }}>
              {article.sourceIcon}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{article.source}</span>
          </div>
          <span className="text-sm text-muted-foreground">{timeAgo(article.publishedAt)}</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {article.categoryEmoji} {article.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            {article.readTime} min read
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Eye className="mr-1 h-4 w-4" />
            {article.views.toLocaleString()} views
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Summary */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8 border-l-4 border-primary">
          <p className="text-lg text-foreground font-medium leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div className="text-foreground leading-relaxed text-lg space-y-4">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => likeMutation.mutate()}
              disabled={likeMutation.isPending}
              className="flex items-center space-x-2"
            >
              <Heart className="h-4 w-4" />
              <span>{article.likes} Likes</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </Button>
          </div>
          <Button 
            className="gradient-bg text-white flex items-center space-x-2"
            onClick={() => window.open(article.sourceUrl, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Original</span>
          </Button>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
          <div className="text-center py-8">
            <p className="text-muted-foreground">More related articles coming soon...</p>
            <Link href="/">
              <Button variant="outline" className="mt-4">
                Browse All Articles
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SidebarFilters from "@/components/sidebar-filters";
import FeaturedArticle from "@/components/featured-article";
import ArticleCard from "@/components/article-card";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Flame, Plus } from "lucide-react";
import type { Article } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>(["TechCrunch", "Ars Technica"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["AI/ML"]);
  const [timeRange, setTimeRange] = useState("24h");

  const { data: featuredArticles, isLoading: featuredLoading } = useQuery({
    queryKey: ['/api/articles/featured'],
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ['/api/articles', {
      sources: selectedSources.length > 0 ? selectedSources.join(',') : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
      timeRange,
      search: searchQuery || undefined,
    }],
  });

  const { data: sources } = useQuery({
    queryKey: ['/api/sources'],
  });

  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  const featuredArticle = featuredArticles?.[0];
  const regularArticles = articles?.filter((article: Article) => !article.featured) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <SidebarFilters
            sources={sources || []}
            categories={categories || []}
            selectedSources={selectedSources}
            selectedCategories={selectedCategories}
            timeRange={timeRange}
            onSourcesChange={setSelectedSources}
            onCategoriesChange={setSelectedCategories}
            onTimeRangeChange={setTimeRange}
          />
          
          <div className="flex-1">
            {/* Featured Article */}
            {featuredLoading ? (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-6 w-6 mr-2" />
                  <Skeleton className="h-8 w-48" />
                </div>
                <Skeleton className="h-80 w-full rounded-xl" />
              </div>
            ) : featuredArticle ? (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
                  <span className="text-secondary mr-2">⭐</span>
                  Featured Today
                </h2>
                <FeaturedArticle article={featuredArticle} />
              </div>
            ) : null}

            {/* Trending Articles */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
                <Flame className="mr-2 text-highlight" />
                Trending Now
              </h2>
            </div>

            {/* Articles Grid */}
            {articlesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-card rounded-xl p-5 shadow-sm">
                    <Skeleton className="h-40 w-full mb-4 rounded-lg" />
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {regularArticles.map((article: Article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center py-8">
              <Button className="gradient-bg text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <Plus className="mr-2 h-4 w-4" />
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </main>

      <NewsletterSection />
      <Footer />
    </div>
  );
}

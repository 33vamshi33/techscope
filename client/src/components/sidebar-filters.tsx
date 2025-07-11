import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Source, Category } from "@shared/schema";

interface SidebarFiltersProps {
  sources: Source[];
  categories: Category[];
  selectedSources: string[];
  selectedCategories: string[];
  timeRange: string;
  onSourcesChange: (sources: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onTimeRangeChange: (timeRange: string) => void;
}

export default function SidebarFilters({
  sources,
  categories,
  selectedSources,
  selectedCategories,
  timeRange,
  onSourcesChange,
  onCategoriesChange,
  onTimeRangeChange,
}: SidebarFiltersProps) {
  const handleSourceToggle = (sourceName: string) => {
    if (selectedSources.includes(sourceName)) {
      onSourcesChange(selectedSources.filter(s => s !== sourceName));
    } else {
      onSourcesChange([...selectedSources, sourceName]);
    }
  };

  const handleCategoryToggle = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      onCategoriesChange(selectedCategories.filter(c => c !== categoryName));
    } else {
      onCategoriesChange([...selectedCategories, categoryName]);
    }
  };

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-card rounded-xl p-6 shadow-sm sticky top-24">
        <h3 className="font-semibold text-lg mb-4 flex items-center text-foreground">
          <Filter className="mr-2 text-primary h-5 w-5" />
          Filter Content
        </h3>
        
        {/* Source Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-card-foreground">Sources</h4>
          <div className="space-y-2">
            {sources.map((source) => (
              <label 
                key={source.id} 
                className="flex items-center cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
              >
                <Checkbox
                  checked={selectedSources.includes(source.name)}
                  onCheckedChange={() => handleSourceToggle(source.name)}
                  className="text-primary"
                />
                <span className="ml-3 mr-2" style={{ color: source.color }}>
                  {source.icon}
                </span>
                <span className="text-sm text-card-foreground">{source.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-card-foreground">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedCategories.includes(category.name)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary hover:text-secondary-foreground'
                }`}
                onClick={() => handleCategoryToggle(category.name)}
              >
                <span className="mr-1">{category.emoji}</span>
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Time Filter */}
        <div>
          <h4 className="font-medium mb-3 text-card-foreground">Time Range</h4>
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="week">Last week</SelectItem>
              <SelectItem value="month">Last month</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  );
}

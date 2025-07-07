import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { TubeBender } from "@shared/schema";
import { sortProductsByScore } from "@/lib/scoring-algorithm";

export interface FilterCriteria {
  maxPrice: number;
  usaOnly: boolean;
  pipeCapable: boolean;
  squareTubeCapable: boolean;
  benderType: "all" | "manual" | "hydraulic";
  category: "all" | "entry" | "mid-range" | "professional";
}

interface ProductFiltersProps {
  products: TubeBender[];
  onFilterChange: (filteredProducts: TubeBender[]) => void;
  className?: string;
}

export default function ProductFilters({ products, onFilterChange, className = "" }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    maxPrice: 5000,
    usaOnly: false,
    pipeCapable: false,
    squareTubeCapable: false,
    benderType: "all",
    category: "all"
  });

  const [showFilters, setShowFilters] = useState(false);

  // Get price range from products
  const prices = products.map(p => {
    // Extract price from priceRange (e.g., "$1,500" or "$1,500-$2,000")
    const priceMatch = p.priceRange.match(/\$([0-9,]+)/);
    return priceMatch ? parseFloat(priceMatch[1].replace(/,/g, "")) : 0;
  });
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const applyFilters = (newFilters: FilterCriteria) => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(product => {
      const priceMatch = product.priceRange.match(/\$([0-9,]+)/);
      const price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, "")) : 0;
      return price <= newFilters.maxPrice;
    });

    // USA manufacturing filter
    if (newFilters.usaOnly) {
      filtered = filtered.filter(product => 
        product.countryOfOrigin === "USA" || product.countryOfOrigin === "United States"
      );
    }

    // Die availability filters
    if (newFilters.pipeCapable) {
      filtered = filtered.filter(product => 
        product.features.some(feature => 
          feature.toLowerCase().includes("pipe") || 
          feature.toLowerCase().includes("round tube")
        )
      );
    }

    if (newFilters.squareTubeCapable) {
      filtered = filtered.filter(product => 
        product.features.some(feature => 
          feature.toLowerCase().includes("square") || 
          feature.toLowerCase().includes("rectangular")
        )
      );
    }

    // Bender type filter
    if (newFilters.benderType !== "all") {
      filtered = filtered.filter(product => {
        const isHydraulic = product.powerType === "Hydraulic" || 
                           product.features.some(f => f.toLowerCase().includes("hydraulic"));
        
        if (newFilters.benderType === "hydraulic") {
          return isHydraulic;
        } else {
          return !isHydraulic;
        }
      });
    }

    // Category filter
    if (newFilters.category !== "all") {
      filtered = filtered.filter(product => product.category === newFilters.category);
    }

    // Sort filtered results by score (highest to lowest)
    const sortedFiltered = sortProductsByScore(filtered);
    onFilterChange(sortedFiltered);
  };

  const updateFilter = (key: keyof FilterCriteria, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterCriteria = {
      maxPrice: maxPrice,
      usaOnly: false,
      pipeCapable: false,
      squareTubeCapable: false,
      benderType: "all",
      category: "all"
    };
    setFilters(defaultFilters);
    const sortedProducts = sortProductsByScore(products);
    onFilterChange(sortedProducts);
  };

  const activeFilterCount = [
    filters.maxPrice < maxPrice,
    filters.usaOnly,
    filters.pipeCapable,
    filters.squareTubeCapable,
    filters.benderType !== "all",
    filters.category !== "all"
  ].filter(Boolean).length;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
        
        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="text-sm">
            Clear all filters
          </Button>
        )}
      </div>

      {showFilters && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Filter Products
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-3">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">
                💡 How to use filters:
              </p>
              <ol className="text-sm text-blue-600 dark:text-blue-400 space-y-1 list-decimal list-inside">
                <li>Select your filter criteria below</li>
                <li>Click the "Filters" button above to collapse this panel</li>
                <li>Your filtered results will appear automatically</li>
              </ol>
              <p className="text-xs text-blue-500 dark:text-blue-500 mt-2 italic">
                The filters apply instantly when you collapse this menu
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Range */}
            <div className="space-y-2">
              <Label>Maximum Price: ${filters.maxPrice.toLocaleString()}</Label>
              <Slider
                value={[filters.maxPrice]}
                onValueChange={(value) => updateFilter("maxPrice", value[0])}
                max={maxPrice}
                min={minPrice}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${minPrice.toLocaleString()}</span>
                <span>${maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Manufacturing Location */}
            <div className="space-y-2">
              <Label>Manufacturing Location</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usa-only"
                  checked={filters.usaOnly}
                  onCheckedChange={(checked) => updateFilter("usaOnly", checked)}
                />
                <Label htmlFor="usa-only" className="text-sm font-normal">
                  Made in USA only
                </Label>
              </div>
            </div>

            {/* Die Availability */}
            <div className="space-y-3">
              <Label>Die Availability</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pipe-capable"
                    checked={filters.pipeCapable}
                    onCheckedChange={(checked) => updateFilter("pipeCapable", checked)}
                  />
                  <Label htmlFor="pipe-capable" className="text-sm font-normal">
                    Pipe/Round tube dies available
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="square-capable"
                    checked={filters.squareTubeCapable}
                    onCheckedChange={(checked) => updateFilter("squareTubeCapable", checked)}
                  />
                  <Label htmlFor="square-capable" className="text-sm font-normal">
                    Square/Rectangular tube dies available
                  </Label>
                </div>
              </div>
            </div>

            {/* Bender Type */}
            <div className="space-y-2">
              <Label>Bender Type</Label>
              <Select value={filters.benderType} onValueChange={(value) => updateFilter("benderType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bender type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="manual">Manual Only</SelectItem>
                  <SelectItem value="hydraulic">Hydraulic Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Price Category</Label>
              <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid-range">Mid-Range</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
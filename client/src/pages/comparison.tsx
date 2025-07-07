import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ComparisonTable from "@/components/comparison-table";
import { ArrowLeft, Filter, RefreshCw } from "lucide-react";
import { TubeBender } from "@shared/schema";
import { Link } from "wouter";

export default function Comparison() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [brandFilter, setBrandFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [originFilter, setOriginFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");

  const { data: allTubeBenders, isLoading } = useQuery<TubeBender[]>({
    queryKey: ["/api/tube-benders"],
  });

  const filteredProducts = allTubeBenders?.filter(product => {
    if (brandFilter && brandFilter !== "all" && product.brand !== brandFilter) return false;
    if (categoryFilter && categoryFilter !== "all" && product.category !== categoryFilter) return false;
    if (originFilter && originFilter !== "all" && product.countryOfOrigin !== originFilter) return false;
    if (priceFilter && priceFilter !== "all") {
      const price = parseInt(product.priceRange.replace(/[^0-9]/g, ''));
      switch (priceFilter) {
        case "budget":
          return price < 800;
        case "mid":
          return price >= 800 && price < 1500;
        case "premium":
          return price >= 1500;
        default:
          return true;
      }
    }
    return true;
  }) || [];

  const displayProducts = selectedProducts.length > 0 
    ? filteredProducts.filter(p => selectedProducts.includes(p.id))
    : filteredProducts;

  const toggleProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setBrandFilter("all");
    setCategoryFilter("all");
    setOriginFilter("all");
    setPriceFilter("all");
    setSelectedProducts([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  const brands = Array.from(new Set(allTubeBenders?.map(p => p.brand) || []));
  const categories = Array.from(new Set(allTubeBenders?.map(p => p.category) || []));
  const origins = Array.from(new Set(allTubeBenders?.map(p => p.countryOfOrigin) || []));

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-primary hover:text-primary/80 flex items-center text-sm mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Reviews
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Tube Bender Comparison Tool
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Compare specifications, features, and value across different tube bender models
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    Filters
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Brand Filter */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Brand
                  </Label>
                  <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Category
                  </Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'professional' ? 'Professional' :
                           category === 'heavy-duty' ? 'Heavy-Duty' :
                           category === 'budget' ? 'Budget' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Origin Filter */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Country of Origin
                  </Label>
                  <Select value={originFilter} onValueChange={setOriginFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {origins.map(origin => (
                        <SelectItem key={origin} value={origin}>{origin}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Price Range
                  </Label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="budget">Budget (&lt; $800)</SelectItem>
                      <SelectItem value="mid">Mid-Range ($800-$1,500)</SelectItem>
                      <SelectItem value="premium">Premium ($1,500+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Product Selection */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Select Products to Compare
                  </Label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`product-${product.id}`}
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                        <Label
                          htmlFor={`product-${product.id}`}
                          className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                        >
                          {product.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Results */}
          <div className="lg:col-span-3">
            {/* Summary */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {displayProducts.length} of {allTubeBenders?.length || 0} products
              </div>
              
              {selectedProducts.length > 0 && (
                <Badge variant="outline">
                  {selectedProducts.length} selected for comparison
                </Badge>
              )}
              
              {(brandFilter || categoryFilter || originFilter || priceFilter) && (
                <div className="flex flex-wrap gap-2">
                  {brandFilter && <Badge variant="secondary">Brand: {brandFilter}</Badge>}
                  {categoryFilter && <Badge variant="secondary">Category: {categoryFilter}</Badge>}
                  {originFilter && <Badge variant="secondary">Origin: {originFilter}</Badge>}
                  {priceFilter && <Badge variant="secondary">Price: {priceFilter}</Badge>}
                </div>
              )}
            </div>

            {/* Comparison Table */}
            {displayProducts.length > 0 ? (
              <ComparisonTable products={displayProducts} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    No products match your current filters.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Additional Information */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quality vs. Price Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-success rounded-full mt-1 mr-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">USA-Made Equipment</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Higher initial cost but lower long-term ownership costs due to superior support and build quality.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">Import Equipment</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Lower initial cost but potential for higher maintenance and support costs over time.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comparison Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Consider total cost of ownership, not just initial price</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Factor in support quality and parts availability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Match capacity and features to your specific needs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Consider upgrade paths and customization options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

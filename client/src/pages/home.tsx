import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product-card";
import ComparisonTable from "@/components/comparison-table";
import TubeBenderFinder from "@/components/tube-bender-finder";
import ProductFilters from "@/components/product-filters";

import HeroPhoto from "@/components/hero-photo";
import { sortProductsByScore } from "@/lib/scoring-algorithm";
import { Tag, Shield, TrendingUp, Star, Scale, Calculator, BookOpen, Trophy, CheckCircle, Plus, Minus, ExternalLink } from "lucide-react";
import { TubeBender } from "@shared/schema";

export default function Home() {
  const { data: tubeBenders, isLoading } = useQuery<TubeBender[]>({
    queryKey: ["/api/tube-benders"],
  });

  const [filteredProducts, setFilteredProducts] = useState<TubeBender[]>([]);

  // Update filtered products when data loads and sort by score
  useEffect(() => {
    if (tubeBenders) {
      const sortedProducts = sortProductsByScore(tubeBenders);
      setFilteredProducts(sortedProducts);
    }
  }, [tubeBenders]);

  const topPicks = filteredProducts?.slice(0, 3) || [];
  const rogueFab = tubeBenders?.find(b => b.brand === "RogueFab");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-bg text-white py-20 min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
        {/* Industrial Photo Background */}
        <HeroPhoto />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Best Tube Bender Reviews 2025
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Independent expert reviews and transparent scoring to help you choose the perfect tube bender
          </p>
          
          {/* Key Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-blue-200">11-Point</div>
              <div className="text-sm text-blue-100">Scoring Algorithm</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-blue-200">12+</div>
              <div className="text-sm text-blue-100">Brands Reviewed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-blue-200">100%</div>
              <div className="text-sm text-blue-100">Transparent Methodology</div>
            </div>
          </div>
          
          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center text-blue-100">
              <Tag className="text-accent mr-2 h-5 w-5" />
              <span className="font-medium">Expert Tested</span>
            </div>
            <div className="flex items-center text-blue-100">
              <Shield className="text-success mr-2 h-5 w-5" />
              <span className="font-medium">Unbiased Reviews</span>
            </div>
            <div className="flex items-center text-blue-100">
              <TrendingUp className="text-accent mr-2 h-5 w-5" />
              <span className="font-medium">Value-Focused</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Star className="mr-2 h-5 w-5" />
              See Top Picks
            </Button>
            <Link href="/comparison">
              <Button size="lg" variant="secondary">
                <Scale className="mr-2 h-5 w-5" />
                Compare Models
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white dark:bg-gray-800 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {rogueFab && (
              <Link href={`/product/${rogueFab.id}`}>
                <Badge variant="default" className="bg-accent hover:bg-accent/80 text-accent-foreground px-4 py-2 cursor-pointer">
                  <Trophy className="mr-1 h-3 w-3" />
                  #1 RogueFab M6xx
                </Badge>
              </Link>
            )}
            {topPicks.slice(1).map((product, index) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Badge variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-secondary/80">
                  #{index + 2} {product.brand} {product.model.split('/')[0]}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section id="comparison" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Quick Comparison
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how the top tube benders stack up against each other
            </p>
          </div>

          {tubeBenders && (
            <>
              <ProductFilters 
                products={tubeBenders} 
                onFilterChange={setFilteredProducts}
                className="mb-8"
              />
              <ComparisonTable products={filteredProducts} />
            </>
          )}
        </div>
      </section>

      {/* Detailed Reviews Section */}
      <section id="reviews" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              In-Depth Reviews
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive analysis of each tube bender's performance, value, and suitability
            </p>
          </div>

          {rogueFab && (
            <div className="mb-16">
              <div className="bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 rounded-2xl p-8 shadow-lg border-l-4 border-success">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <img
                      src={rogueFab.imageUrl || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                      alt={`${rogueFab.name} tube bender in professional workshop setting`}
                      className="rounded-lg shadow-md w-full h-64 object-cover"
                    />
                    
                    <div className="mt-4 text-center">
                      <Badge className="bg-accent text-accent-foreground mb-2">
                        <Trophy className="mr-1 h-3 w-3" />
                        EDITOR'S CHOICE
                      </Badge>
                      <div className="text-success font-bold text-xl">Best Overall Value</div>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <div className="flex items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mr-4">
                        {rogueFab.name}
                      </h3>
                      <Badge className="bg-success text-success-foreground">
                        #1 PICK
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                      {rogueFab.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                        <div className="text-2xl font-bold text-success">
                          {rogueFab.maxCapacity}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Max OD</div>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                        <div className="text-2xl font-bold text-success">{rogueFab.bendAngle}°</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Max Bend</div>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                        <div className="text-2xl font-bold text-success">
                          {rogueFab.countryOfOrigin}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Made In</div>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                        <div className="text-2xl font-bold text-success">Life</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Warranty</div>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-success mb-3 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          PROS
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {rogueFab.pros.slice(0, 5).map((pro, index) => (
                            <li key={index} className="flex items-start">
                              <Plus className="text-success mt-1 mr-2 h-3 w-3 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          CONS
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {rogueFab.cons.map((con, index) => (
                            <li key={index} className="flex items-start">
                              <Minus className="text-red-600 mt-1 mr-2 h-3 w-3 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {rogueFab.purchaseUrl && rogueFab.purchaseUrl !== "#" && (
                        <Button
                          className="bg-accent hover:bg-accent/90 text-accent-foreground"
                          onClick={() => window.open(rogueFab.purchaseUrl || "#", '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View on RogueFab.com
                        </Button>
                      )}
                      <Link href={`/product/${rogueFab.id}`}>
                        <Button variant="outline">
                          Read Full Review
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Top Picks */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topPicks.slice(1).map((product, index) => (
              <ProductCard key={product.id} product={product} rank={index + 2} />
            ))}
          </div>
        </div>
      </section>

      {/* Tube Bender Finder */}
      <div id="finder">
        <TubeBenderFinder />
      </div>

      {/* Buyer's Guide */}
      <section id="guide" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Complete Buyer's Guide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about choosing the right tube bender
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Key Factors */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                11 Critical Factors to Consider
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Type of Tube Bender
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Choose between Open Rotary Draw, Mandrel, Roll, or Ram-style based on your specific applications.
                      </p>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Best for roll cages:</strong> Open Rotary Draw Bender (like RogueFab M6xx)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Power Source
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Manual benders are cost-effective but require more effort. Hydraulic systems provide consistent power for thick materials.
                      </p>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Pro tip:</strong> Double-acting hydraulic systems are faster than single-acting
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Manufacturing Quality
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        American-made equipment typically offers superior build quality, support, and long-term reliability.
                      </p>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Consider:</strong> Material quality, precision machining, and warranty coverage
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div>
              <div className="bg-accent text-accent-foreground rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Quick Decision Tree</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-semibold mb-1">Professional Use?</div>
                    <div className="opacity-90">→ RogueFab M6xx Series</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Maximum Capacity?</div>
                    <div className="opacity-90">→ Baileigh RDB-050</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Tight Budget?</div>
                    <div className="opacity-90">→ JD2 Model 32</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Light Hobby Use?</div>
                    <div className="opacity-90">→ Woodward Fab WFB2</div>
                  </div>
                </div>
              </div>

              {/* Material Guide */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Material Compatibility
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Mild Steel</span>
                    <span className="text-success">✓ All Models</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">4130 Chromoly</span>
                    <span className="text-success">✓ All Models</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Aluminum</span>
                    <span className="text-success">✓ All Models</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Stainless Steel</span>
                    <span className="text-amber-600">⚠ Check Specs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Titanium</span>
                    <span className="text-amber-600">⚠ Premium Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Bender Types Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Other Types of Tube Benders
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              While our focus is on manually operated rotary draw benders, here are other types you might encounter
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mandrel Benders */}
            <Link href="/mandrel-benders">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3 mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Mandrel Benders
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Precision benders that use an internal mandrel to prevent tube collapse during tight radius bends. Essential for exhaust systems and hydraulic lines.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <strong>Best for:</strong> Exhaust systems, hydraulic lines, tight radius bends
                </div>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Learn More <ExternalLink className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>

            {/* Roll Benders */}
            <Link href="/roll-benders">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-3 mr-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Roll Benders
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Large radius bending machines that use multiple rollers to gradually form curves. Ideal for architectural work and large diameter tubes.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <strong>Best for:</strong> Architectural work, large diameter tubes, gentle curves
                </div>
                <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                  Learn More <ExternalLink className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>

            {/* Ram-Style Benders */}
            <Link href="/ram-benders">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-3 mr-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                    <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    Ram-Style Benders
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Heavy-duty benders that use hydraulic rams to push tubes around fixed dies. Excellent for structural work and thick-wall tubing.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <strong>Best for:</strong> Structural work, thick-wall tubing, heavy-duty applications
                </div>
                <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium">
                  Learn More <ExternalLink className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Focus on Manually Operated Rotary Draw Benders
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                This website specializes in reviews of manually operated rotary draw tube benders like the RogueFab M6xx series. 
                These are the most versatile and cost-effective choice for roll cage fabrication, chassis work, and general tube bending applications.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

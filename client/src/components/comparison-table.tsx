import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScoringBreakdown from "./scoring-breakdown";
import { calculateTubeBenderScore } from "@/lib/scoring-algorithm";
import PricingExplanation from "./pricing-explanation";
import PriceBreakdown from "./price-breakdown";

import { ExternalLink, Trophy, Medal } from "lucide-react";
import { TubeBender } from "@shared/schema";
import { Link } from "wouter";

interface ComparisonTableProps {
  products: TubeBender[];
}

export default function ComparisonTable({ products }: ComparisonTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<TubeBender | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-4 w-4 text-accent" />;
      case 1:
      case 2:
        return <Medal className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const handlePriceClick = (product: TubeBender) => {
    setSelectedProduct(product);
    setShowBreakdown(true);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Tube Bender Comparison
        </CardTitle>
        <p className="text-sm text-center text-muted-foreground mt-2">
          Products ranked by comprehensive scoring algorithm • Highest rated first
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                <TableHead className="text-white font-semibold min-w-[200px]">Model</TableHead>
                <TableHead className="text-white font-semibold text-center relative">
                  <div>Rating</div>
                  <div className="relative">
                    <button 
                      onClick={() => window.open('/scoring-methodology', '_blank')}
                      className="text-xs text-blue-200 hover:text-blue-100 underline mt-1"
                      type="button"
                    >
                      scoring details
                    </button>
                  </div>
                </TableHead>
                <TableHead className="text-white font-semibold text-center relative">
                  <div>Price Range</div>
                  <div className="text-xs text-blue-200 font-normal">(complete setup)</div>
                  <div className="relative">
                    <PricingExplanation />
                  </div>
                </TableHead>
                <TableHead className="text-white font-semibold text-center">Max Capacity</TableHead>
                <TableHead className="text-white font-semibold text-center">Power Type</TableHead>
                <TableHead className="text-white font-semibold text-center">Mandrel Bender</TableHead>
                <TableHead className="text-white font-semibold text-center">Origin</TableHead>
                <TableHead className="text-white font-semibold text-center">Best For</TableHead>
                <TableHead className="text-white font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    product.isRecommended ? 'bg-green-50 dark:bg-green-900/10' : ''
                  }`}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index)}
                        <Badge
                          variant={index === 0 ? "default" : "secondary"}
                          className={
                            index === 0
                              ? "bg-accent hover:bg-accent/80"
                              : index < 3
                              ? "bg-gray-600 text-white"
                              : ""
                          }
                        >
                          #{index + 1}
                        </Badge>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {product.model}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-16 h-16 mb-2">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                          <circle 
                            cx="32" 
                            cy="32" 
                            r="28" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            fill="transparent" 
                            className="text-gray-200 dark:text-gray-700"
                          />
                          <circle 
                            cx="32" 
                            cy="32" 
                            r="28" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            fill="transparent" 
                            strokeDasharray={`${Math.round(calculateTubeBenderScore(product).totalScore) * 1.76} 176`}
                            className={Math.round(calculateTubeBenderScore(product).totalScore) >= 85 ? "text-green-500" : 
                                     Math.round(calculateTubeBenderScore(product).totalScore) >= 75 ? "text-blue-500" : 
                                     Math.round(calculateTubeBenderScore(product).totalScore) >= 65 ? "text-yellow-500" : "text-red-500"}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                              {Math.round(calculateTubeBenderScore(product).totalScore)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">/100</div>
                          </div>
                        </div>
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary hover:underline cursor-pointer transition-colors">
                          Click for breakdown
                        </button>
                      </Link>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <button
                      onClick={() => handlePriceClick(product)}
                      className="font-semibold cursor-pointer hover:underline transition-colors text-gray-900 dark:text-gray-100 hover:text-primary"
                    >
                      {product.priceRange}
                    </button>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Click for breakdown
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center font-medium">
                    {product.maxCapacity}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {product.powerType}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <Badge 
                      variant={product.mandrelBender === "Available" ? "default" : "secondary"}
                      className={product.mandrelBender === "Available" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {product.mandrelBender}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className={`font-semibold ${
                      product.countryOfOrigin === 'USA' ? 'text-success' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {product.countryOfOrigin}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {product.category === 'professional' ? 'Professional' :
                       product.category === 'heavy-duty' ? 'Heavy-Duty' :
                       product.category === 'budget' ? 'Budget' : product.category}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="flex flex-col space-y-1">
                      <Link href={`/product/${product.id}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          Review
                        </Button>
                      </Link>
                      {product.purchaseUrl && product.purchaseUrl !== "#" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs"
                          onClick={() => window.open(product.purchaseUrl || "#", '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {selectedProduct && (
        <PriceBreakdown
          product={selectedProduct}
          isOpen={showBreakdown}
          onClose={() => setShowBreakdown(false)}
        />
      )}
    </Card>
  );
}

import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScoringBreakdown from "./scoring-breakdown";
import ProductImage from "./product-image";
import { ExternalLink, Trophy, Medal, DollarSign } from "lucide-react";
import { TubeBender } from "@shared/schema";
import { calculateTubeBenderScore } from "@/lib/scoring-algorithm";

interface ProductCardProps {
  product: TubeBender;
  rank?: number;
}

export default function ProductCard({ product, rank }: ProductCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4" />;
      case 2:
      case 3:
        return <Medal className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-accent text-accent-foreground";
      case 2:
        return "bg-gray-600 text-white";
      case 3:
        return "bg-amber-600 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "professional":
        return "Professional";
      case "heavy-duty":
        return "Heavy-Duty";
      case "budget":
        return "Budget Pick";
      default:
        return category;
    }
  };

  return (
    <Card className={`h-full transition-all duration-200 hover:shadow-lg ${product.isRecommended ? 'ring-2 ring-success/20 bg-green-50/50 dark:bg-green-900/10' : ''}`}>
      <CardContent className="p-6">
        {/* Rank and Category */}
        <div className="flex items-center justify-between mb-4">
          {rank && (
            <Badge className={`${getRankColor(rank)} flex items-center space-x-1`}>
              {getRankIcon(rank)}
              <span>#{rank}</span>
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {getCategoryLabel(product.category)}
          </Badge>
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <ProductImage 
            imageUrl={product.imageUrl}
            productName={product.name}
            className="rounded-lg shadow-md w-full h-48"
            showOverlay={false}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {product.model}
            </p>
          </div>

          {/* Objective Score */}
          <ScoringBreakdown product={product} />

          {/* Key Specs */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Price Range:</span>
              <span className="font-semibold text-success">{product.priceRange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Max Capacity:</span>
              <span className="font-semibold">{product.maxCapacity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Made In:</span>
              <span className={`font-semibold ${product.countryOfOrigin === 'USA' ? 'text-success' : 'text-gray-700 dark:text-gray-300'}`}>
                {product.countryOfOrigin}
              </span>
            </div>
          </div>

          {/* Top Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-success">Top Features:</h4>
            <ul className="text-xs space-y-1">
              {product.pros.slice(0, 3).map((pro, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-success mr-1">+</span>
                  <span className="text-gray-600 dark:text-gray-400">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Link href={`/product/${product.id}`}>
              <Button className="w-full" variant="default">
                Read Full Review
              </Button>
            </Link>
            
            {product.purchaseUrl && product.purchaseUrl !== "#" && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(product.purchaseUrl || '', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Product
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

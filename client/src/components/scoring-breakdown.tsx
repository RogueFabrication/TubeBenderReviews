import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { calculateTubeBenderScore, type ScoredTubeBender } from "@/lib/scoring-algorithm";
import type { TubeBender } from "@shared/schema";

interface ScoringBreakdownProps {
  product: TubeBender;
  className?: string;
}

export default function ScoringBreakdown({ product, className = "" }: ScoringBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Simple fallback scoring for products without new fields
  let scoredProduct;
  try {
    scoredProduct = calculateTubeBenderScore(product);
  } catch (error) {
    // Fallback simple scoring based on existing fields
    const baseScore = Math.round(parseFloat(product.rating) * 10);
    scoredProduct = {
      ...product,
      totalScore: baseScore,
      scoreBreakdown: [
        {
          criteria: "Overall Rating",
          points: baseScore,
          maxPoints: 100,
          reasoning: `Based on ${product.rating}/10 rating`
        }
      ]
    };
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Objective Score</CardTitle>
            <CardDescription>Algorithm-based evaluation</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {scoredProduct.totalScore}/100
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              {isExpanded ? (
                <>
                  Hide Breakdown <ChevronUp className="ml-1 h-3 w-3" />
                </>
              ) : (
                <>
                  Show Breakdown <ChevronDown className="ml-1 h-3 w-3" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {scoredProduct.scoreBreakdown.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.criteria}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.reasoning}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <Badge variant={item.points > item.maxPoints * 0.7 ? "default" : "secondary"}>
                    {item.points}/{item.maxPoints}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Total Score:</span>
              <Badge className="text-sm px-3 py-1">
                {scoredProduct.totalScore}/100
              </Badge>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/scoring-methodology">
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="mr-2 h-3 w-3" />
                How scores are calculated
              </Button>
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
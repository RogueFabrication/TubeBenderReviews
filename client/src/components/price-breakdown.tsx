import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, DollarSign } from "lucide-react";
import { TubeBender } from "@shared/schema";

interface PriceBreakdownProps {
  product: TubeBender;
  isOpen: boolean;
  onClose: () => void;
}

interface PriceComponent {
  item: string;
  price: string;
  priceRange?: { min: number; max: number };
  description: string;
  required: boolean;
}

const getPriceBreakdown = (product: TubeBender): { components: PriceComponent[], total: string } => {
  // If product has componentPricing data, use it
  if (product.componentPricing) {
    const formatPrice = (min: number, max: number) => {
      if (min === max) {
        return `$${min.toLocaleString()}`;
      } else {
        return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
      }
    };

    const components: PriceComponent[] = [
      {
        item: "Frame",
        price: formatPrice(product.componentPricing.frame.min, product.componentPricing.frame.max),
        priceRange: product.componentPricing.frame,
        description: "Base bender frame with degree markings and structural components",
        required: true
      },
      {
        item: "Hydraulic Ram",
        price: formatPrice(product.componentPricing.hydraulicRam.min, product.componentPricing.hydraulicRam.max),
        priceRange: product.componentPricing.hydraulicRam,
        description: product.componentPricing.hydraulicRam.min === 0 && product.componentPricing.hydraulicRam.max === 0 
          ? "Manual operation (no hydraulic system included)" 
          : "Hydraulic cylinder with pump and controls",
        required: true
      },
      {
        item: "Die",
        price: formatPrice(product.componentPricing.die.min, product.componentPricing.die.max),
        priceRange: product.componentPricing.die,
        description: "Bend die set for specified tube diameter and radius",
        required: true
      },
      {
        item: "Stand/Mount",
        price: formatPrice(product.componentPricing.standMount.min, product.componentPricing.standMount.max),
        priceRange: product.componentPricing.standMount,
        description: "Mounting stand or hardware for operation",
        required: true
      }
    ];

    const totalMin = Object.values(product.componentPricing).reduce((sum, comp) => sum + comp.min, 0);
    const totalMax = Object.values(product.componentPricing).reduce((sum, comp) => sum + comp.max, 0);
    const totalPrice = totalMin === totalMax ? `$${totalMin.toLocaleString()}` : `$${totalMin.toLocaleString()} - $${totalMax.toLocaleString()}`;

    return {
      components,
      total: totalPrice
    };
  }

  // Fallback to static pricing data
  switch (product.brand) {
    case "RogueFab":
      return {
        components: [
          { item: "M601 Base Frame", price: "$995", description: "Manual tube bender frame with degree markings", required: true },
          { item: "Hydraulic Ram Kit", price: "$450", description: "Single-acting hydraulic cylinder with hand pump", required: true },
          { item: "1.5\" Round Die Set", price: "$185", description: "180° CLR=4.5\" bend die with pressure die", required: true },
          { item: "Stand/Mount", price: "$125", description: "Heavy-duty steel stand with mounting hardware", required: true },

        ],
        total: "$1,895"
      };
    
    case "Baileigh":
      return {
        components: [
          { item: "RDB-050 Base Unit", price: "$2,195", description: "Manual bender with integrated stand", required: true },
          { item: "1.5\" Round Die Set", price: "$285", description: "180° CLR=4.5\" bend die set", required: true },
          { item: "Degree Dial", price: "$65", description: "Precision angle measurement system", required: true },
          { item: "Shipping", price: "$350", description: "Freight shipping due to weight", required: true }
        ],
        total: "$2,895"
      };
    
    case "JD2":
      if (product.model === "Model 32-H") {
        return {
          components: [
            { item: "Model 32 Base", price: "$745", description: "Manual bender frame (made-to-order)", required: true },
            { item: "Hydraulic Pump Kit", price: "$545", description: "Electric pump with controls and fittings", required: true },
            { item: "Stand Kit", price: "$295", description: "Heavy-duty stand with mounting plate", required: true },
            { item: "1.5\" Round Die", price: "$235", description: "180° CLR=4.5\" single die", required: true },
            { item: "Electrical Setup", price: "$40", description: "Wiring harness and controls", required: true },
            { item: "Shipping", price: "$185", description: "Standard shipping (6-8 week lead time)", required: true }
          ],
          total: "$2,045"
        };
      } else {
        return {
          components: [
            { item: "Model 32 Base", price: "$745", description: "Manual bender frame (made-to-order)", required: true },
            { item: "Stand Kit", price: "$295", description: "Heavy-duty stand with mounting plate", required: true },
            { item: "1.5\" Round Die", price: "$235", description: "180° CLR=4.5\" single die", required: true },
            { item: "Handle Assembly", price: "$85", description: "Operating handle with degree markings", required: true },
            { item: "Shipping", price: "$185", description: "Standard shipping (6-8 week lead time)", required: true }
          ],
          total: "$1,545"
        };
      }
    
    case "Woodward Fab":
      return {
        components: [
          { item: "WFB2 Base Unit", price: "$329", description: "Basic manual tube bender", required: true },
          { item: "Basic Stand", price: "$145", description: "Simple steel stand assembly", required: true },
          { item: "1.5\" Round Die", price: "$195", description: "180° CLR=4.5\" basic die", required: true },
          { item: "Hardware Kit", price: "$45", description: "Mounting bolts and basic hardware", required: true },
          { item: "Shipping", price: "$125", description: "Standard ground shipping", required: true }
        ],
        total: "$839"
      };

    case "JMR Manufacturing":
      if (product.model === "TBM-250R") {
        return {
          components: [
            { item: "TBM-250R Base", price: "$295", description: "RaceLine manual bender frame", required: true },
            { item: "Operating Stand", price: "$125", description: "Required mounting stand for operation", required: true },
            { item: "Operating Handle", price: "$95", description: "Required manual operating handle", required: true },
            { item: "1.5\" Round Die", price: "$285", description: "180° CLR=4.5\" single die", required: true },
            { item: "Shipping", price: "$85", description: "Ground shipping to Phoenix, AZ shown as example. This data will fluctuate", required: true }
          ],
          total: "$885"
        };
      } else if (product.model.includes("RaceLine")) {
        return {
          components: [
            { item: "TBM-250U RaceLine Base", price: "$495", description: "RaceLine model with bronze bushings", required: true },
            { item: "Operating Stand", price: "$125", description: "Required mounting stand for operation", required: true },
            { item: "Operating Handle", price: "$95", description: "Required manual operating handle", required: true },
            { item: "1.5\" Round Die", price: "$285", description: "180° CLR=4.5\" single die", required: true },
            { item: "Shipping", price: "$85", description: "Standard shipping (typically 1 week)", required: true }
          ],
          total: "$1,085"
        };
      }
      break;

    case "Pro-Tools":
      if (product.model === "105HD") {
        return {
          components: [
            { item: "105HD Base Unit", price: "$995", description: "Heavy-duty manual bender with 5/8\" frame", required: true },
            { item: "Mounting Stand", price: "$195", description: "Required bench or floor mounting stand", required: true },
            { item: "1.5\" Die Package", price: "$269", description: "Complete die set CLR=4.5\"", required: true },
            { item: "Shipping", price: "$150", description: "Freight shipping due to weight", required: true }
          ],
          total: "$1,609"
        };
      } else if (product.model === "BRUTE") {
        return {
          components: [
            { item: "BRUTE Base Unit", price: "$3,995", description: "15-ton hydraulic system with 1\" frame", required: true },
            { item: "1.5\" Die Package", price: "$450", description: "Heavy-duty die set CLR=4.5\"", required: true },
            { item: "Air Setup", price: "$195", description: "Compressed air fittings and controls", required: true },
            { item: "Freight Shipping", price: "$360", description: "Professional installation available", required: true }
          ],
          total: "$5,000"
        };
      }
      break;

    case "Mittler Bros":
      return {
        components: [
          { item: "Model 2500 Base", price: "$2,895", description: "25-ton hydraulic bender frame", required: true },
          { item: "1.5\" Die Set", price: "$385", description: "180° CLR=4.5\" die set", required: true },
          { item: "Portable Stand", price: "$295", description: "Heavy-duty portable work stand", required: true },
          { item: "Shipping", price: "$275", description: "Freight shipping (heavy unit)", required: true }
        ],
        total: "$3,850"
      };

    case "Hossfeld":
      return {
        components: [
          { item: "Standard No. 2 Base", price: "$1,495", description: "Classic universal bender frame", required: true },
          { item: "1.5\" Tube Tooling", price: "$345", description: "Complete tooling set CLR=4.5\"", required: true },
          { item: "Mounting Hardware", price: "$85", description: "Bench or stand mounting kit", required: true },
          { item: "Shipping", price: "$125", description: "Standard ground shipping", required: true }
        ],
        total: "$2,050"
      };

    case "SWAG Off Road":
      return {
        components: [
          { item: "REV 2 Base Unit", price: "$770", description: "Precision-machined bender frame with bronze bushings", required: true },
          { item: "1.5\" Round Die", price: "$311", description: "120° CLR=4.5\" precision die", required: true },
          { item: "Shipping", price: "$0", description: "Free shipping on orders over $500", required: true },
          { item: "Optional Ram", price: "$250", description: "8-ton air/hydraulic long ram (recommended)", required: false }
        ],
        total: "$1,081"
      };
    
    default:
      return {
        components: [
          { item: "Base Configuration", price: "Varies", description: "Complete setup pricing", required: true }
        ],
        total: product.priceRange
      };
  }
  
  // Fallback return for any unmatched cases
  return {
    components: [
      { item: "Base Configuration", price: "Varies", description: "Complete setup pricing", required: true }
    ],
    total: product.priceRange
  };
};

export default function PriceBreakdown({ product, isOpen, onClose }: PriceBreakdownProps) {
  if (!isOpen || !product) return null;
  
  const breakdown = getPriceBreakdown(product);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">
            {product.name} - Price Breakdown
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Complete Setup Configuration
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Ready-to-use setup for bending 1.5" round tube with 180° minimum capacity
              </p>
              {product.componentPricing && (
                <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                  ⚡ Component-level pricing shows individual MIN/MAX values for each part
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              {breakdown.components.map((component, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {component.item}
                      </span>
                      {component.required && (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {component.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {component.price}
                    </span>
                    {component.priceRange && component.priceRange.min !== component.priceRange.max && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Min: ${component.priceRange.min.toLocaleString()} | Max: ${component.priceRange.max.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-green-900 dark:text-green-100">
                    Total Complete Setup
                  </span>
                </div>
                <span className="text-xl font-bold text-green-900 dark:text-green-100">
                  {breakdown.total}
                </span>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                Important Notes
              </h4>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                {(product.importantNotes || [
                  "Prices current as of January 2025",
                  "Additional dies and accessories sold separately",
                  "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
                  "Hydraulic upgrades available for compatible models"
                ]).map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
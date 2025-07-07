import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

export default function PricingExplanation() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 h-auto"
      >
        <Info className="h-3 w-3 mr-1" />
        Pricing Details
        {isExpanded ? (
          <ChevronUp className="h-3 w-3 ml-1" />
        ) : (
          <ChevronDown className="h-3 w-3 ml-1" />
        )}
      </Button>
      
      {isExpanded && (
        <div className="absolute z-50 mt-2 w-80 -left-32 lg:-left-16">
          <Card className="shadow-lg border-2">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Complete Setup Pricing Includes:
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="border-l-3 border-blue-500 pl-3">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Base Machine</div>
                  <div className="text-gray-600 dark:text-gray-400">Tube bender unit as specified</div>
                </div>
                
                <div className="border-l-3 border-green-500 pl-3">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Hydraulic System</div>
                  <div className="text-gray-600 dark:text-gray-400">Lowest-cost hydraulic option where applicable</div>
                </div>
                
                <div className="border-l-3 border-orange-500 pl-3">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Die Set</div>
                  <div className="text-gray-600 dark:text-gray-400">1.5" round tube die for 180° minimum bend capacity</div>
                </div>
                
                <div className="border-l-3 border-purple-500 pl-3">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Stand/Mount</div>
                  <div className="text-gray-600 dark:text-gray-400">Included if required for operation</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Prices represent ready-to-use setups for 1.5" tube bending. 
                  Additional dies, accessories, and shipping costs are separate.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
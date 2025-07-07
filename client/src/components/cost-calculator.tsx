import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Gavel, Clock, Truck } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface CostCalculationResult {
  request: {
    usage: string;
    material: string;
    timeline: string;
  };
  calculations: Array<{
    id: number;
    name: string;
    brand: string;
    initialCost: number;
    maintenanceCost: number;
    supportCost: number;
    downtimeCost: number;
    totalCost: number;
    countryOfOrigin: string;
    supportQuality: number;
    buildQuality: number;
  }>;
  bestValue: {
    name: string;
    totalCost: number;
  };
  savings: number;
}

export default function CostCalculator() {
  const [usage, setUsage] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [results, setResults] = useState<CostCalculationResult | null>(null);

  const calculateMutation = useMutation({
    mutationFn: async (data: { usage: string; material: string; timeline: string }) => {
      const response = await apiRequest("POST", "/api/cost-calculator", data);
      return response.json();
    },
    onSuccess: (data: CostCalculationResult) => {
      setResults(data);
    },
  });

  const handleCalculate = () => {
    if (!usage || !material || !timeline) return;
    
    calculateMutation.mutate({
      usage,
      material,
      timeline,
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Total Cost of Ownership Calculator
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover the hidden costs of cheaper alternatives vs. quality American-made equipment
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Your Requirements
              </h3>
              
              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Usage (bends/month)
                  </Label>
                  <Select value={usage} onValueChange={setUsage}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select usage level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light (&lt; 50 bends)</SelectItem>
                      <SelectItem value="medium">Medium (50-200 bends)</SelectItem>
                      <SelectItem value="heavy">Heavy (200+ bends)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Material
                  </Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild-steel">Mild Steel</SelectItem>
                      <SelectItem value="chromoly">4130 Chromoly</SelectItem>
                      <SelectItem value="aluminum">Aluminum</SelectItem>
                      <SelectItem value="stainless-steel">Stainless Steel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Timeline
                  </Label>
                  <Select value={timeline} onValueChange={setTimeline}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2-years">1-2 years</SelectItem>
                      <SelectItem value="3-5-years">3-5 years</SelectItem>
                      <SelectItem value="5-plus-years">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={handleCalculate}
                  disabled={!usage || !material || !timeline || calculateMutation.isPending}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {calculateMutation.isPending ? "Calculating..." : "Calculate True Cost"}
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Hidden Cost Factors
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertTriangle className="text-amber-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Support Quality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Import brands often lack US-based technical support
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Gavel className="text-accent mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Maintenance Costs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Lower quality materials = higher ongoing maintenance
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Downtime Impact</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Equipment failure costs more than initial savings
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Truck className="text-red-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Parts Availability</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Import parts may have long lead times or be discontinued
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          {results && (
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <h4 className="text-lg font-bold text-success mb-4">Your Cost Analysis</h4>
              <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${Math.round(results.calculations[results.calculations.length - 1]?.totalCost || 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Highest Cost Option</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    ${Math.round(results.bestValue.totalCost)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Best Value Option</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    ${Math.round(results.savings)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Potential Savings</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Best Value:</strong> {results.bestValue.name} offers the lowest total cost of ownership
                over your selected timeline, considering maintenance, support, and downtime costs.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle, AlertCircle, DollarSign, Wrench } from "lucide-react";
import { TubeBender } from "@shared/schema";
import ProductCard from "./product-card";

interface ScoredTubeBender extends TubeBender {
  score: number;
  reasons: string[];
}

interface FinderCriteria {
  budget: number;
  maxDiameter: string;
  usage: string;
  experience: string;
  priority: string;
}

export default function TubeBenderFinder() {
  const [step, setStep] = useState(1);
  const [criteria, setCriteria] = useState<FinderCriteria>({
    budget: 5000,
    maxDiameter: "",
    usage: "",
    experience: "",
    priority: ""
  });
  const [recommendations, setRecommendations] = useState<ScoredTubeBender[]>([]);

  const { data: allTubeBenders } = useQuery<TubeBender[]>({
    queryKey: ['/api/tube-benders']
  });

  const budgetRanges = [
    { value: 2000, label: "Under $2,000" },
    { value: 5000, label: "$2,000 - $5,000" },
    { value: 10000, label: "$5,000 - $10,000" },
    { value: 15000, label: "$10,000 - $15,000" },
    { value: 25000, label: "$15,000 - $25,000" },
    { value: 50000, label: "$25,000+" }
  ];

  const diameterOptions = [
    { value: "0.5", label: '1/2" (0.5")' },
    { value: "0.75", label: '3/4" (0.75")' },
    { value: "1", label: '1" (1.0")' },
    { value: "1.25", label: '1 1/4" (1.25")' },
    { value: "1.5", label: '1 1/2" (1.5")' },
    { value: "1.75", label: '1 3/4" (1.75")' },
    { value: "2", label: '2" (2.0")' },
    { value: "2.5", label: '2 1/2" (2.5")' },
    { value: "3", label: '3" (3.0")' }
  ];

  const usageOptions = [
    { value: "hobby", label: "Hobby/Personal Projects", description: "Occasional use, weekend projects" },
    { value: "small-business", label: "Small Business/Side Work", description: "Regular use, small production runs" },
    { value: "production", label: "Production/Commercial", description: "Daily use, high volume production" }
  ];

  const experienceOptions = [
    { value: "beginner", label: "Beginner", description: "First tube bender, learning the basics" },
    { value: "intermediate", label: "Intermediate", description: "Some experience, familiar with tube bending" },
    { value: "expert", label: "Expert", description: "Professional fabricator, advanced techniques" }
  ];

  const priorityOptions = [
    { value: "price", label: "Lowest Price", description: "Budget is the primary concern" },
    { value: "quality", label: "Quality & Durability", description: "Long-term reliability and build quality" },
    { value: "speed", label: "Speed & Efficiency", description: "Fast setup and production speed" },
    { value: "versatility", label: "Versatility", description: "Handle various materials and tube sizes" }
  ];

  const findRecommendations = () => {
    if (!allTubeBenders) return;

    let scored: ScoredTubeBender[] = allTubeBenders.map((bender: TubeBender) => {
      let score = 0;
      let reasons: string[] = [];

      // Budget scoring
      const priceNum = parseInt(bender.priceRange.replace(/[$,]/g, '').split('-')[0]);
      if (priceNum <= criteria.budget) {
        score += 25;
      } else if (priceNum <= criteria.budget * 1.2) {
        score += 15;
        reasons.push("Slightly over budget but excellent value");
      }

      // Diameter capacity
      const maxCapacity = parseFloat(bender.maxCapacity.replace(/[^0-9.]/g, ''));
      const requiredDiameter = parseFloat(criteria.maxDiameter);
      if (maxCapacity >= requiredDiameter) {
        score += 20;
        if (maxCapacity >= requiredDiameter * 1.5) {
          score += 5;
          reasons.push("Handles larger tubes for future growth");
        }
      } else {
        score -= 50; // Major penalty for insufficient capacity
      }

      // Usage pattern matching
      if (criteria.usage === "hobby" && bender.category === "Manual") {
        score += 15;
        reasons.push("Perfect for hobby use");
      } else if (criteria.usage === "small-business" && (bender.category === "Semi-Automatic" || bender.brand === "RogueFab")) {
        score += 15;
        reasons.push("Great for small business efficiency");
      } else if (criteria.usage === "production" && (bender.category === "CNC" || bender.brand === "RogueFab")) {
        score += 20;
        reasons.push("Built for production environments");
      }

      // Experience level
      if (criteria.experience === "beginner" && bender.brand === "RogueFab") {
        score += 10;
        reasons.push("User-friendly for beginners");
      } else if (criteria.experience === "expert" && bender.category === "CNC") {
        score += 15;
        reasons.push("Advanced features for experts");
      }

      // Priority matching
      if (criteria.priority === "quality" && (bender.brand === "RogueFab" || bender.countryOfOrigin === "USA")) {
        score += 15;
        reasons.push("Superior American-made quality");
      } else if (criteria.priority === "price" && bender.countryOfOrigin !== "USA") {
        score += 10;
        reasons.push("Budget-friendly option");
      } else if (criteria.priority === "speed" && bender.brand === "RogueFab") {
        score += 10;
        reasons.push("Fast setup and operation");
      }

      // Country of origin bonus
      if (bender.countryOfOrigin === "USA") {
        score += 10;
        reasons.push("Made in USA - superior support and quality");
      }

      return { ...bender, score, reasons } as ScoredTubeBender;
    });

    // Filter out benders that can't handle the required diameter
    scored = scored.filter((bender: ScoredTubeBender) => {
      const maxCapacity = parseFloat(bender.maxCapacity.replace(/[^0-9.]/g, ''));
      return maxCapacity >= parseFloat(criteria.maxDiameter);
    });

    // Sort by score and take top 3
    scored.sort((a: ScoredTubeBender, b: ScoredTubeBender) => b.score - a.score);
    setRecommendations(scored.slice(0, 3));
    setStep(4);
  };

  const resetFinder = () => {
    setStep(1);
    setCriteria({
      budget: 5000,
      maxDiameter: "",
      usage: "",
      experience: "",
      priority: ""
    });
    setRecommendations([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Find Your Perfect Tube Bender</CardTitle>
          <CardDescription>
            Answer a few questions to get personalized recommendations based on your needs and budget
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= stepNum 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
              </div>
              {stepNum < 4 && (
                <ArrowRight className={`w-4 h-4 mx-2 ${
                  step > stepNum ? 'text-blue-600' : 'text-gray-400'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Budget & Diameter */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Budget & Tube Size Requirements
            </CardTitle>
            <CardDescription>
              What's your budget and what's the largest tube diameter you need to bend?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Maximum Budget</Label>
              <div className="mt-2">
                <Slider
                  value={[criteria.budget]}
                  onValueChange={(values) => setCriteria({...criteria, budget: values[0]})}
                  max={50000}
                  min={1000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>$1,000</span>
                  <span className="font-medium text-blue-600">
                    ${criteria.budget.toLocaleString()}
                  </span>
                  <span>$50,000+</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Largest Tube Diameter Needed</Label>
              <Select value={criteria.maxDiameter} onValueChange={(value) => setCriteria({...criteria, maxDiameter: value})}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select tube diameter" />
                </SelectTrigger>
                <SelectContent>
                  {diameterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => setStep(2)} 
              disabled={!criteria.maxDiameter}
              className="w-full"
            >
              Next: Usage & Experience
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Usage & Experience */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Usage & Experience Level
            </CardTitle>
            <CardDescription>
              Tell us about how you'll use the tube bender and your experience level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Primary Usage</Label>
              <div className="grid gap-3 mt-2">
                {usageOptions.map((option) => (
                  <Card 
                    key={option.value}
                    className={`cursor-pointer border-2 transition-colors ${
                      criteria.usage === option.value 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCriteria({...criteria, usage: option.value})}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Experience Level</Label>
              <div className="grid gap-3 mt-2">
                {experienceOptions.map((option) => (
                  <Card 
                    key={option.value}
                    className={`cursor-pointer border-2 transition-colors ${
                      criteria.experience === option.value 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCriteria({...criteria, experience: option.value})}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                disabled={!criteria.usage || !criteria.experience}
                className="flex-1"
              >
                Next: Priorities
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Priorities */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>What's Most Important to You?</CardTitle>
            <CardDescription>
              Choose your top priority to help us find the best match
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3">
              {priorityOptions.map((option) => (
                <Card 
                  key={option.value}
                  className={`cursor-pointer border-2 transition-colors ${
                    criteria.priority === option.value 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCriteria({...criteria, priority: option.value})}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={findRecommendations} 
                disabled={!criteria.priority}
                className="flex-1"
              >
                Get My Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Recommendations */}
      {step === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Your Personalized Recommendations</CardTitle>
              <CardDescription className="text-center">
                Based on your budget of ${criteria.budget.toLocaleString()}, {criteria.maxDiameter}" max diameter, 
                {usageOptions.find(u => u.value === criteria.usage)?.label.toLowerCase()} usage, 
                and {criteria.priority.replace('-', ' ')} priority
              </CardDescription>
            </CardHeader>
          </Card>

          {recommendations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Perfect Matches Found</h3>
                <p className="text-gray-600 mb-4">
                  Based on your criteria, we couldn't find tube benders that meet all your requirements. 
                  Try adjusting your budget or diameter requirements.
                </p>
                <Button onClick={resetFinder}>Start Over</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {recommendations.map((bender, index) => (
                <Card key={bender.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 pb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={index === 0 ? "default" : "secondary"} className="text-sm">
                        {index === 0 ? "🏆 Best Match" : index === 1 ? "🥈 Runner Up" : "🥉 Alternative"}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Match Score</div>
                        <div className="text-lg font-bold text-blue-600">{bender.score}%</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <ProductCard product={bender} />
                      
                      {bender.reasons && bender.reasons.length > 0 && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Why this is a great choice:</h4>
                          <ul className="space-y-1">
                            {bender.reasons.map((reason, idx) => (
                              <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button onClick={resetFinder} variant="outline">
              Find Another Tube Bender
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
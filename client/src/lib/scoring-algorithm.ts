import { TubeBender } from "@shared/schema";

// Transparent Tube Bender Scoring Algorithm (Total: 100 points)
// Based on customer feedback analysis and market research

export interface ScoringCriteria {
  name: string;
  maxPoints: number;
  description: string;
  weight: number;
}

export const SCORING_CRITERIA: ScoringCriteria[] = [
  {
    name: "Value for Money",
    maxPoints: 20,
    description: "Price-to-performance ratio based on base/minimum price of the range",
    weight: 0.20
  },
  {
    name: "Ease of Use & Setup",
    maxPoints: 12,
    description: "Assembly time, portability, operation simplicity",
    weight: 0.12
  },
  {
    name: "Max Diameter & Radius Capacity",
    maxPoints: 12,
    description: "Maximum tube diameter and minimum bend radius capability",
    weight: 0.12
  },
  {
    name: "USA Manufacturing",
    maxPoints: 10,
    description: "American-made components and assembly",
    weight: 0.10
  },
  {
    name: "Bend Angle Capability",
    maxPoints: 10,
    description: "Maximum bend angle achievable (180°+ preferred)",
    weight: 0.10
  },
  {
    name: "Wall Thickness Capability",
    maxPoints: 9,
    description: "Maximum wall thickness for 1.75\" OD DOM tubing",
    weight: 0.09
  },
  {
    name: "Die Selection & Shapes",
    maxPoints: 8,
    description: "Available die shapes: round, square, rectangle, EMT, flat bar, hexagon, combination dies",
    weight: 0.08
  },
  {
    name: "Years in Business",
    maxPoints: 7,
    description: "Company longevity and market experience",
    weight: 0.07
  },
  {
    name: "Modular Clamping System",
    maxPoints: 6,
    description: "Advanced modular clamping system for versatile workpiece orientation",
    weight: 0.06
  },
  {
    name: "Mandrel Availability",
    maxPoints: 4,
    description: "Mandrel bending capability - 4 points if available, 0 if not",
    weight: 0.04
  },
  {
    name: "S-Bend Capability",
    maxPoints: 2,
    description: "Ability to create S-bends and complex geometries",
    weight: 0.02
  }
];

export interface ScoredTubeBender extends TubeBender {
  totalScore: number;
  scoreBreakdown: {
    criteria: string;
    points: number;
    maxPoints: number;
    reasoning: string;
  }[];
}

export function calculateTubeBenderScore(bender: TubeBender): ScoredTubeBender {
  // Handle missing fields gracefully for backward compatibility
  const safeGet = (field: any, defaultValue: any) => field !== undefined && field !== null ? field : defaultValue;
  const scoreBreakdown = [];
  let totalScore = 0;

  // 1. Value for Money (20 points)
  let valueScore = 0;
  const priceRange = bender.priceRange.toLowerCase();
  if (priceRange.includes('$780') || priceRange.includes('$885')) valueScore = 20; // JMR budget options
  else if (priceRange.includes('$839') || priceRange.includes('$970')) valueScore = 19; // Woodward, SWAG
  else if (priceRange.includes('$1,000') || priceRange.includes('$1,250')) valueScore = 17; // JMR RaceLine
  else if (priceRange.includes('$1,609') || priceRange.includes('$1,895')) valueScore = 15; // Pro-Tools 105HD, RogueFab
  else if (priceRange.includes('$2,050') || priceRange.includes('$2,895')) valueScore = 12; // Hossfeld, Baileigh
  else if (priceRange.includes('$3,850') || priceRange.includes('$5,000')) valueScore = 8; // Mittler, Pro-Tools BRUTE
  
  scoreBreakdown.push({
    criteria: "Value for Money",
    points: valueScore,
    maxPoints: 20,
    reasoning: `Price point ${bender.priceRange} relative to features and capacity`
  });
  totalScore += valueScore;

  // 2. Ease of Use & Setup (12 points)
  let easeScore = 0;
  if (bender.brand === "RogueFab") easeScore = 11; // Vertical design, portable
  else if (bender.brand === "SWAG Off Road") easeScore = 10; // 95% pre-assembled
  else if (bender.brand === "JD2") easeScore = 9; // Simple, well-documented
  else if (bender.powerType.includes("Manual")) easeScore = 8; // Manual operation
  else if (bender.powerType.includes("Hydraulic")) easeScore = 9; // Hydraulic assistance
  else easeScore = 7;
  
  scoreBreakdown.push({
    criteria: "Ease of Use & Setup",
    points: easeScore,
    maxPoints: 12,
    reasoning: `${bender.powerType} operation with ${bender.brand === "RogueFab" ? 'vertical space-saving design' : 'standard setup'}`
  });
  totalScore += easeScore;

  // 3. Max Diameter & Radius Capacity (12 points)
  let capacityScore = 0;
  const maxCapacity = bender.maxCapacity.toLowerCase();
  if (maxCapacity.includes('2.5') || maxCapacity.includes('2-1/2')) capacityScore = 12; // Baileigh 2.5"
  else if (maxCapacity.includes('2-3/8') || maxCapacity.includes('2.375')) capacityScore = 11; // RogueFab 2-3/8"
  else if (maxCapacity.includes('2.25') || maxCapacity.includes('2-1/4')) capacityScore = 10; // 2-1/4"
  else if (maxCapacity.includes('2.0') || maxCapacity.includes('2"')) capacityScore = 9; // Most common 2"
  else if (maxCapacity.includes('1.75') || maxCapacity.includes('1-3/4')) capacityScore = 7; // 1-3/4"
  else if (maxCapacity.includes('1.5') || maxCapacity.includes('1-1/2')) capacityScore = 5; // 1-1/2"
  else capacityScore = 4; // Smaller sizes
  
  scoreBreakdown.push({
    criteria: "Max Diameter & Radius Capacity",
    points: capacityScore,
    maxPoints: 12,
    reasoning: `${bender.maxCapacity} maximum tube diameter capacity`
  });
  totalScore += capacityScore;

  // 4. USA Manufacturing (10 points)
  let usaScore = bender.countryOfOrigin === "USA" ? 10 : 0;
  scoreBreakdown.push({
    criteria: "USA Manufacturing",
    points: usaScore,
    maxPoints: 10,
    reasoning: `Made in ${bender.countryOfOrigin}`
  });
  totalScore += usaScore;

  // 5. Bend Angle Capability (10 points)
  let angleScore = 0;
  if (bender.bendAngle >= 195) angleScore = 10; // RogueFab 195°
  else if (bender.bendAngle >= 180) angleScore = 8; // Standard 180°
  else if (bender.bendAngle >= 120) angleScore = 5; // Limited capability
  else angleScore = 3;
  
  scoreBreakdown.push({
    criteria: "Bend Angle Capability",
    points: angleScore,
    maxPoints: 10,
    reasoning: `${bender.bendAngle}° maximum bend angle`
  });
  totalScore += angleScore;

  // 6. Wall Thickness Capability (9 points)
  let wallScore = 0;
  const wallCapacity = (bender as any).wallThicknessCapacity;
  if (wallCapacity) {
    const thickness = parseFloat(wallCapacity);
    if (thickness >= 0.156) wallScore = 9;
    else if (thickness >= 0.120) wallScore = 7;
    else if (thickness >= 0.095) wallScore = 5;
    else wallScore = 3;
  } else {
    wallScore = 3; // Default for no published data
  }
  
  scoreBreakdown.push({
    criteria: "Wall Thickness Capability",
    points: wallScore,
    maxPoints: 9,
    reasoning: wallCapacity ? `${wallCapacity}" wall capacity for 1.75" OD DOM` : "No published wall thickness data"
  });
  totalScore += wallScore;

  // 7. Die Selection & Shapes (8 points)
  let dieScore = 0;
  // Check features array for die-related capabilities
  const features = bender.features || [];
  const materials = bender.materials || [];
  
  // Award points based on die variety and combination capabilities
  if (bender.brand === "Hossfeld") dieScore = 8; // Universal tooling system - most shapes
  else if (bender.brand === "RogueFab") dieScore = 7; // Round, square, rectangle confirmed
  else if (bender.brand === "Pro-Tools") dieScore = 6; // Professional die selection
  else if (bender.brand === "JD2") dieScore = 5; // Standard round dies, some shapes
  else if (bender.brand === "SWAG Off Road") dieScore = 4; // Round focus, limited shapes
  else dieScore = 3; // Basic round die capability
  
  scoreBreakdown.push({
    criteria: "Die Selection & Shapes",
    points: dieScore,
    maxPoints: 8,
    reasoning: bender.brand === "Hossfeld" ? "Extensive universal tooling system" : 
               dieScore >= 6 ? "Good variety of die shapes available" : "Basic die selection"
  });
  totalScore += dieScore;

  // 8. Years in Business (7 points)
  let businessScore = 0;
  // Based on known company founding dates
  if (bender.brand === "Hossfeld") businessScore = 7; // 100+ years (1915)
  else if (bender.brand === "JD2") businessScore = 6; // ~30+ years established
  else if (bender.brand === "Pro-Tools") businessScore = 5; // ~20+ years
  else if (bender.brand === "Baileigh") businessScore = 5; // ~20+ years
  else if (bender.brand === "RogueFab") businessScore = 4; // ~15+ years
  else if (bender.brand === "SWAG Off Road") businessScore = 3; // Newer company
  else businessScore = 3; // Default for unknown
  
  scoreBreakdown.push({
    criteria: "Years in Business",
    points: businessScore,
    maxPoints: 7,
    reasoning: businessScore >= 6 ? "Established industry veteran (20+ years)" : 
               businessScore >= 4 ? "Proven track record (10+ years)" : "Newer market entry"
  });
  totalScore += businessScore;

  // 9. Modular Clamping System (6 points)
  let clampingScore = 0;
  if (bender.brand === "RogueFab" && bender.model.includes("M6")) {
    clampingScore = 6; // M6xx series has modular clamping
  } else {
    clampingScore = 0; // No other machines have this feature
  }
  
  scoreBreakdown.push({
    criteria: "Modular Clamping System",
    points: clampingScore,
    maxPoints: 6,
    reasoning: clampingScore === 6 ? "Advanced modular clamping system for versatile workpiece orientation" : "Standard clamping system"
  });
  totalScore += clampingScore;

  // 10. Mandrel Availability (4 points - binary scoring)
  let mandrelScore = 0;
  if (bender.mandrelBender === "Available") mandrelScore = 4;
  else mandrelScore = 0; // Removed partial points - either available or not
  
  scoreBreakdown.push({
    criteria: "Mandrel Availability",
    points: mandrelScore,
    maxPoints: 4,
    reasoning: mandrelScore === 4 ? "Mandrel bending capability available" : "No mandrel capability"
  });
  totalScore += mandrelScore;

  // 11. S-Bend Capability (2 points)
  let sBendScore = 0;
  const sBendCapable = (bender as any).sBendCapability;
  if (sBendCapable === true) sBendScore = 2;
  else sBendScore = 0;
  
  scoreBreakdown.push({
    criteria: "S-Bend Capability",
    points: sBendScore,
    maxPoints: 2,
    reasoning: sBendCapable ? "Documented S-bend capability" : "No S-bend capability"
  });
  totalScore += sBendScore;

  return {
    ...bender,
    totalScore,
    scoreBreakdown
  };
}

export function getScoringMethodology(): string {
  return `
## Tube Bender Scoring Methodology

Our transparent scoring system evaluates tube benders across 9 key criteria based on customer feedback analysis and market research. Each bender receives 0-100 points total.

### Scoring Criteria:

${SCORING_CRITERIA.map(criteria => 
  `**${criteria.name}** (${criteria.maxPoints} points): ${criteria.description}`
).join('\n\n')}

### Scoring Philosophy:
- Based on actual customer reviews and testimonials
- Emphasizes value, build quality, and user experience
- Includes areas where different brands excel
- Transparent algorithm available for review
- No single brand dominates all categories

This system helps you understand why each bender scored as it did and which features matter most for your specific needs.
  `.trim();
}

export function sortTubeBendersByScore(benders: TubeBender[]): ScoredTubeBender[] {
  return benders
    .map(bender => calculateTubeBenderScore(bender))
    .sort((a, b) => b.totalScore - a.totalScore);
}

export function sortProductsByScore(products: TubeBender[]): TubeBender[] {
  return sortTubeBendersByScore(products).map(scored => {
    // Return the original TubeBender but preserve the sorting order
    const { totalScore, scoreBreakdown, ...originalBender } = scored;
    return originalBender;
  });
}
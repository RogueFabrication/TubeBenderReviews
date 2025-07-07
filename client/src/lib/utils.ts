import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string): string {
  return price.replace(/[^0-9]/g, '') ? `$${price.replace(/[^0-9]/g, '')}+` : price;
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'professional':
      return '🏆';
    case 'heavy-duty':
      return '💪';
    case 'budget':
      return '💰';
    default:
      return '⚙️';
  }
}

export function getOriginFlag(country: string): string {
  switch (country) {
    case 'USA':
      return '🇺🇸';
    case 'Taiwan':
      return '🇹🇼';
    case 'China':
      return '🇨🇳';
    default:
      return '🏭';
  }
}

export function calculateValueScore(
  rating: string,
  price: string,
  buildQuality: number,
  supportQuality: number
): number {
  const numericRating = parseFloat(rating);
  const numericPrice = parseInt(price.replace(/[^0-9]/g, '')) || 1000;
  
  // Normalize price (lower is better for value)
  const priceScore = Math.max(0, 10 - (numericPrice / 200));
  
  // Weight the factors
  const weightedScore = (
    numericRating * 0.3 +
    priceScore * 0.2 +
    buildQuality * 0.25 +
    supportQuality * 0.25
  );
  
  return Math.round(weightedScore * 10) / 10;
}

export function formatFeatureList(features: string[]): string {
  if (features.length <= 2) {
    return features.join(' and ');
  }
  
  return features.slice(0, -1).join(', ') + ', and ' + features[features.length - 1];
}

export function getRecommendationBadge(
  isRecommended: boolean,
  category: string,
  rank?: number
): { text: string; variant: string; icon: string } {
  if (isRecommended) {
    return { text: "EDITOR'S CHOICE", variant: "accent", icon: "trophy" };
  }
  
  if (rank === 2) {
    return { text: "RUNNER-UP", variant: "secondary", icon: "medal" };
  }
  
  if (category === 'budget') {
    return { text: "BEST VALUE", variant: "success", icon: "dollar-sign" };
  }
  
  if (category === 'heavy-duty') {
    return { text: "HEAVY-DUTY", variant: "primary", icon: "zap" };
  }
  
  return { text: "QUALITY PICK", variant: "outline", icon: "check" };
}

export function convertDecimalToFraction(decimal: number): string {
  // Common fraction conversions for tubing measurements
  const fractionMap: { [key: number]: string } = {
    2.375: '2-3/8',
    2.25: '2-1/4', 
    2.125: '2-1/8',
    2.0: '2',
    1.75: '1-3/4',
    1.625: '1-5/8',
    1.5: '1-1/2',
    1.375: '1-3/8',
    1.25: '1-1/4',
    1.125: '1-1/8',
    1.0: '1',
    0.875: '7/8',
    0.75: '3/4',
    0.625: '5/8',
    0.5: '1/2',
    0.375: '3/8',
    0.25: '1/4',
    0.125: '1/8'
  };
  
  return fractionMap[decimal] || decimal.toString();
}

export function formatTubingMeasurement(measurement: string): string {
  // Convert decimal measurements to fractions for tube diameter
  // Keep wall thickness as decimals
  if (measurement.includes('.') && !measurement.includes('wall') && !measurement.includes('thick')) {
    const match = measurement.match(/(\d+\.?\d*)/);
    if (match) {
      const decimal = parseFloat(match[1]);
      const fraction = convertDecimalToFraction(decimal);
      return measurement.replace(match[1], fraction);
    }
  }
  return measurement;
}

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: string;
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, showNumber = true, size = "md" }: StarRatingProps) {
  const numRating = parseFloat(rating);
  const fullStars = Math.floor(numRating);
  const hasHalfStar = numRating % 1 !== 0;
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400 mr-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < fullStars
                ? "fill-current"
                : i === fullStars && hasHalfStar
                ? "fill-current opacity-50"
                : "fill-none"
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`font-bold text-gray-900 dark:text-gray-100 ${textSizeClasses[size]}`}>
          {rating}
        </span>
      )}
    </div>
  );
}

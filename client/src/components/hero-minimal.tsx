import { useEffect, useState } from "react";

export default function HeroMinimal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-30" : "opacity-0"}`}>
        {/* Clean geometric tube representation */}
        <svg
          className="w-full h-full max-w-5xl"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cleanTube" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          
          {/* Simple elegant tube path */}
          <path 
            d="M 80 200 L 280 200 Q 320 200 320 160 L 320 80" 
            stroke="url(#cleanTube)" 
            strokeWidth="8" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Subtle floating elements */}
          <circle cx="150" cy="120" r="3" fill="rgba(96, 165, 250, 0.6)" className="animate-pulse"/>
          <circle cx="420" cy="280" r="3" fill="rgba(96, 165, 250, 0.6)" className="animate-pulse" style={{animationDelay: '1s'}}/>
          <circle cx="480" cy="150" r="3" fill="rgba(96, 165, 250, 0.6)" className="animate-pulse" style={{animationDelay: '2s'}}/>
        </svg>
      </div>
    </div>
  );
}
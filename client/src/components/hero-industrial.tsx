import { useEffect, useState } from "react";

export default function HeroIndustrial() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className={`transition-all duration-1500 ${isVisible ? "opacity-35" : "opacity-0"}`}>
        {/* Industrial workshop scene */}
        <svg
          className="w-full h-full max-w-6xl"
          viewBox="0 0 800 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748B" stopOpacity="0.6"/>
              <stop offset="50%" stopColor="#475569" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#334155" stopOpacity="0.6"/>
            </linearGradient>
            <linearGradient id="steelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#64748B" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          
          {/* Factory floor */}
          <rect x="0" y="400" width="800" height="100" fill="url(#metalGrad)" opacity="0.3"/>
          
          {/* Industrial tube bender silhouette */}
          <g className="animate-pulse" style={{animationDuration: '3s'}}>
            {/* Base frame */}
            <rect x="200" y="350" width="400" height="50" rx="5" fill="url(#steelGrad)"/>
            
            {/* Vertical column */}
            <rect x="350" y="200" width="30" height="150" fill="url(#steelGrad)"/>
            
            {/* Horizontal arm */}
            <rect x="250" y="190" width="200" height="20" fill="url(#steelGrad)"/>
            
            {/* Bending die */}
            <circle cx="450" cy="200" r="18" fill="url(#steelGrad)" strokeWidth="2" stroke="rgba(148, 163, 184, 0.8)"/>
            
            {/* Control panel */}
            <rect x="180" y="280" width="40" height="70" fill="url(#steelGrad)" rx="3"/>
            <circle cx="195" cy="295" r="3" fill="rgba(34, 197, 94, 0.8)"/>
            <circle cx="205" cy="295" r="3" fill="rgba(239, 68, 68, 0.8)"/>
          </g>
          
          {/* Tube being bent */}
          <path 
            d="M 150 200 L 430 200 Q 450 200 450 180 L 450 120" 
            stroke="rgba(59, 130, 246, 0.7)" 
            strokeWidth="6" 
            fill="none"
            strokeLinecap="round"
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
          
          {/* Industrial atmosphere particles */}
          <circle cx="600" cy="150" r="2" fill="rgba(203, 213, 225, 0.4)" className="animate-bounce" style={{animationDelay: '0.5s'}}/>
          <circle cx="650" cy="280" r="1.5" fill="rgba(203, 213, 225, 0.4)" className="animate-bounce" style={{animationDelay: '1.2s'}}/>
          <circle cx="550" cy="320" r="1" fill="rgba(203, 213, 225, 0.4)" className="animate-bounce" style={{animationDelay: '2s'}}/>
        </svg>
      </div>
    </div>
  );
}
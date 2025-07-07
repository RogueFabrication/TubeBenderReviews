import { useEffect, useState } from "react";

export default function HeroModern() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className={`transition-all duration-2000 ${isVisible ? "opacity-40" : "opacity-0"}`}>
        {/* Modern tech-style visualization */}
        <svg
          className="w-full h-full max-w-7xl"
          viewBox="0 0 900 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Digital grid background */}
          <defs>
            <pattern id="modernGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="900" height="600" fill="url(#modernGrid)" />
          
          {/* Stylized tube bending visualization */}
          <g filter="url(#glow)">
            {/* Main tube path with gradient */}
            <path 
              d="M 100 300 L 400 300 Q 450 300 450 250 L 450 150" 
              stroke="url(#neonGrad)" 
              strokeWidth="10" 
              fill="none"
              strokeLinecap="round"
            >
              <animate attributeName="stroke-dasharray" values="0,800;400,800" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-400" dur="4s" repeatCount="indefinite"/>
            </path>
            
            {/* Secondary path */}
            <path 
              d="M 450 150 L 450 100 Q 450 50 500 50 L 700 50" 
              stroke="url(#neonGrad)" 
              strokeWidth="8" 
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            >
              <animate attributeName="stroke-dasharray" values="0,400;250,400" dur="4s" repeatCount="indefinite" begin="2s"/>
              <animate attributeName="stroke-dashoffset" values="0;-250" dur="4s" repeatCount="indefinite" begin="2s"/>
            </path>
          </g>
          
          {/* Modern UI elements */}
          <g className="animate-pulse" style={{animationDuration: '2s'}}>
            {/* Control nodes */}
            <circle cx="450" cy="300" r="8" fill="#06B6D4" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="4" filter="url(#glow)"/>
            <circle cx="450" cy="150" r="6" fill="#3B82F6" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="3" filter="url(#glow)"/>
            <circle cx="450" cy="50" r="4" fill="#8B5CF6" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" filter="url(#glow)"/>
          </g>
          
          {/* Floating data points */}
          <g className="animate-bounce" style={{animationDelay: '0.5s'}}>
            <text x="200" y="200" fill="rgba(6, 182, 212, 0.6)" fontSize="12" fontFamily="monospace">90°</text>
          </g>
          <g className="animate-bounce" style={{animationDelay: '1s'}}>
            <text x="550" y="180" fill="rgba(59, 130, 246, 0.6)" fontSize="12" fontFamily="monospace">2.5"</text>
          </g>
          <g className="animate-bounce" style={{animationDelay: '1.5s'}}>
            <text x="620" y="80" fill="rgba(139, 92, 246, 0.6)" fontSize="12" fontFamily="monospace">180°</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
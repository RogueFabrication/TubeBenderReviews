import { useEffect, useState } from "react";

export default function HeroAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <svg
        className={`w-full h-full max-w-6xl transition-all duration-2000 ${
          isVisible ? "opacity-30 scale-100" : "opacity-0 scale-95"
        }`}
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          </pattern>
          
          {/* Gradient definitions */}
          <linearGradient id="tubeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#1D4ED8" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.8"/>
          </linearGradient>
          
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        <rect width="800" height="600" fill="url(#grid)" />
        
        {/* Main tube bender machine outline */}
        <g className="animate-fade-in-slow">
          {/* Base platform */}
          <rect x="150" y="450" width="500" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2"/>
          
          {/* Vertical support */}
          <rect x="320" y="300" width="20" height="150" fill="rgba(59, 130, 246, 0.3)" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
          
          {/* Horizontal arm */}
          <rect x="200" y="290" width="240" height="20" fill="rgba(59, 130, 246, 0.3)" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
          
          {/* Bending die (circle) */}
          <circle cx="450" cy="300" r="25" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="3"/>
          <circle cx="450" cy="300" r="15" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2"/>
        </g>
        
        {/* Animated tube being bent */}
        <g className="animate-tube-bend">
          {/* Straight section */}
          <line x1="200" y1="300" x2="425" y2="300" stroke="url(#tubeGradient)" strokeWidth="8" strokeLinecap="round">
            <animate attributeName="stroke-dasharray" values="0,400;225,400" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="stroke-dashoffset" values="0;-225" dur="3s" repeatCount="indefinite"/>
          </line>
          
          {/* Bent section (arc) */}
          <path 
            d="M 425 300 Q 450 275 475 300" 
            fill="none" 
            stroke="url(#tubeGradient)" 
            strokeWidth="8" 
            strokeLinecap="round"
            className="animate-arc-appear"
          >
            <animate attributeName="stroke-dasharray" values="0,100;78,100" dur="3s" repeatCount="indefinite" begin="1s"/>
            <animate attributeName="stroke-dashoffset" values="0;-78" dur="3s" repeatCount="indefinite" begin="1s"/>
          </path>
          
          {/* Exit section */}
          <line x1="475" y1="300" x2="600" y2="300" stroke="url(#tubeGradient)" strokeWidth="8" strokeLinecap="round">
            <animate attributeName="stroke-dasharray" values="0,125;125,125" dur="3s" repeatCount="indefinite" begin="2s"/>
            <animate attributeName="stroke-dashoffset" values="0;-125" dur="3s" repeatCount="indefinite" begin="2s"/>
          </line>
        </g>
        
        {/* Sparkling effects */}
        <g className="animate-sparkle">
          <circle cx="430" cy="285" r="2" fill="#60A5FA" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" begin="1.2s"/>
          </circle>
          <circle cx="465" cy="290" r="1.5" fill="#93C5FD" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="0.6s" repeatCount="indefinite" begin="1.8s"/>
          </circle>
          <circle cx="445" cy="315" r="1" fill="#DBEAFE" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite" begin="2.2s"/>
          </circle>
        </g>
        
        {/* Floating technical specifications */}
        <g className="animate-float-specs" opacity="0.6">
          <text x="100" y="150" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="monospace">
            2-3/8" max capacity
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
          </text>
          <text x="550" y="180" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="monospace">
            180° bend angle
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" begin="1s"/>
          </text>
          <text x="80" y="400" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="monospace">
            Manual operation
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" begin="2s"/>
          </text>
          <text x="580" y="420" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="monospace">
            Professional grade
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" begin="3s"/>
          </text>
        </g>
        
        {/* Glow effects */}
        <circle cx="450" cy="300" r="40" fill="url(#glowGradient)" className="animate-pulse opacity-20"/>
      </svg>
    </div>
  );
}
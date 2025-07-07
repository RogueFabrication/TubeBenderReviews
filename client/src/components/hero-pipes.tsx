import { useEffect, useState } from "react";

export default function HeroPipes() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className={`transition-all duration-1500 ${isVisible ? "opacity-60" : "opacity-0"}`}>
        {/* Industrial bent pipe backdrop */}
        <svg
          className="w-full h-full max-w-7xl"
          viewBox="0 0 1000 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="stainlessSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9"/>
              <stop offset="25%" stopColor="#CBD5E1" stopOpacity="0.7"/>
              <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.8"/>
              <stop offset="75%" stopColor="#64748B" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#475569" stopOpacity="0.7"/>
            </linearGradient>
            
            <linearGradient id="stainlessHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.8"/>
              <stop offset="30%" stopColor="#E2E8F0" stopOpacity="0.6"/>
              <stop offset="70%" stopColor="#94A3B8" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#64748B" stopOpacity="0.6"/>
            </linearGradient>

            <filter id="metalShine" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
              <feOffset dx="1" dy="1" result="offset"/>
              <feFlood floodColor="#ffffff" floodOpacity="0.3"/>
              <feComposite in2="offset" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Large bent pipe - main focal point */}
          <g filter="url(#metalShine)">
            <path 
              d="M 100 400 L 350 400 Q 400 400 400 350 Q 400 300 450 300 L 700 300 Q 750 300 750 250 L 750 100" 
              stroke="url(#stainlessSteel)" 
              strokeWidth="24" 
              fill="none"
              strokeLinecap="round"
            />
            {/* Highlight on the main pipe */}
            <path 
              d="M 100 392 L 350 392 Q 392 392 392 350 Q 392 308 450 308 L 700 308 Q 742 308 742 250 L 742 100" 
              stroke="url(#stainlessHighlight)" 
              strokeWidth="8" 
              fill="none"
              strokeLinecap="round"
            />
          </g>
          
          {/* Secondary bent pipes for depth */}
          <g filter="url(#metalShine)">
            <path 
              d="M 200 500 L 400 500 Q 450 500 450 450 L 450 200" 
              stroke="url(#stainlessSteel)" 
              strokeWidth="18" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M 200 508 L 400 508 Q 442 508 442 450 L 442 200" 
              stroke="url(#stainlessHighlight)" 
              strokeWidth="6" 
              fill="none"
              strokeLinecap="round"
            />
          </g>
          
          {/* Third pipe system */}
          <g filter="url(#metalShine)">
            <path 
              d="M 50 300 L 200 300 Q 250 300 250 250 Q 250 200 300 200 L 500 200 Q 550 200 550 150 Q 550 100 600 100 L 800 100" 
              stroke="url(#stainlessSteel)" 
              strokeWidth="20" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M 50 292 L 200 292 Q 242 292 242 250 Q 242 208 300 208 L 500 208 Q 542 208 542 150 Q 542 108 600 108 L 800 108" 
              stroke="url(#stainlessHighlight)" 
              strokeWidth="7" 
              fill="none"
              strokeLinecap="round"
            />
          </g>
          
          {/* Smaller accent pipes */}
          <g filter="url(#metalShine)">
            <path 
              d="M 600 450 L 800 450 Q 850 450 850 400 L 850 250" 
              stroke="url(#stainlessSteel)" 
              strokeWidth="14" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M 600 446 L 800 446 Q 846 446 846 400 L 846 250" 
              stroke="url(#stainlessHighlight)" 
              strokeWidth="5" 
              fill="none"
              strokeLinecap="round"
            />
          </g>
          
          {/* Additional background pipes for industrial density */}
          <g opacity="0.6" filter="url(#metalShine)">
            <path 
              d="M 150 600 L 350 600 Q 400 600 400 550 L 400 350" 
              stroke="url(#stainlessSteel)" 
              strokeWidth="16" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M 500 550 L 700 550 Q 750 550 750 500 Q 750 450 800 450 L 950 450" 
              stroke="url(#stainlessSteel)" 
              strokeWidth="12" 
              fill="none"
              strokeLinecap="round"
            />
          </g>
          
          {/* Industrial mounting brackets and fittings */}
          <g fill="url(#stainlessSteel)" opacity="0.8">
            <rect x="390" y="290" width="20" height="20" rx="2"/>
            <rect x="740" y="240" width="20" height="20" rx="2"/>
            <rect x="440" y="440" width="20" height="20" rx="2"/>
            <rect x="590" y="90" width="20" height="20" rx="2"/>
          </g>
          
          {/* Welding joint indicators */}
          <g fill="#FCD34D" opacity="0.4">
            <circle cx="400" cy="350" r="8"/>
            <circle cx="450" cy="300" r="6"/>
            <circle cx="750" cy="250" r="7"/>
            <circle cx="250" cy="250" r="5"/>
          </g>
        </svg>
      </div>
    </div>
  );
}
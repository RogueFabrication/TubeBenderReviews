import industrialMachineImage from "@assets/industrial-injection-molding-machine-for-plastic-plates-SBI-351567779_1751480040338.jpg";

interface PlaceholderImageProps {
  className?: string;
}

export default function PlaceholderImage({ className = "w-full h-48" }: PlaceholderImageProps) {
  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Industrial machine background with increased opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url(${industrialMachineImage})`,
          filter: 'brightness(1.3) contrast(0.8)',
        }}
      />
      
      {/* Lighter overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Angled banner overlay */}
      <div 
        className="absolute top-0 left-0 right-0 bg-black bg-opacity-80 text-white text-xs px-6 py-2 text-center transform -rotate-2 origin-top-left shadow-lg"
        style={{
          width: '120%',
          marginLeft: '-10%',
          marginTop: '15%',
        }}
      >
        <span className="font-medium tracking-wide">
          NO IMAGE SUBMITTED BY MANUFACTURER YET
        </span>
      </div>
      
      {/* Subtle industrial pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.05) 22px,
              rgba(255,255,255,0.05) 24px
            )
          `,
        }}
      />
    </div>
  );
}
import React from 'react';

interface ProductIconProps {
  brand: string;
  model: string;
  powerType: string;
  className?: string;
}

export function ProductIcon({ brand, model, powerType, className = "w-12 h-12" }: ProductIconProps) {
  const isHydraulic = powerType.toLowerCase().includes('hydraulic');
  const isManual = powerType.toLowerCase().includes('manual');
  
  // Color scheme based on brand
  const getColors = (brand: string) => {
    switch (brand) {
      case 'RogueFab':
        return { primary: '#dc2626', secondary: '#991b1b', accent: '#fca5a5' };
      case 'JD2':
        return { primary: '#2563eb', secondary: '#1d4ed8', accent: '#93c5fd' };
      case 'Baileigh':
        return { primary: '#059669', secondary: '#047857', accent: '#6ee7b7' };
      case 'Woodward Fab':
        return { primary: '#7c3aed', secondary: '#6d28d9', accent: '#c4b5fd' };
      case 'JMR Manufacturing':
        return { primary: '#ea580c', secondary: '#c2410c', accent: '#fed7aa' };
      case 'Pro-Tools':
        return { primary: '#0891b2', secondary: '#0e7490', accent: '#67e8f9' };
      case 'Mittler Bros':
        return { primary: '#be123c', secondary: '#9f1239', accent: '#fda4af' };
      case 'Hossfeld':
        return { primary: '#4338ca', secondary: '#3730a3', accent: '#a5b4fc' };
      case 'SWAG Off Road':
        return { primary: '#16a34a', secondary: '#15803d', accent: '#86efac' };
      default:
        return { primary: '#6b7280', secondary: '#4b5563', accent: '#d1d5db' };
    }
  };

  const colors = getColors(brand);

  if (isHydraulic) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        {/* Hydraulic Bender Icon */}
        <rect x="4" y="20" width="40" height="16" rx="2" fill={colors.secondary} />
        <rect x="6" y="22" width="36" height="12" rx="1" fill={colors.primary} />
        
        {/* Hydraulic cylinder */}
        <rect x="38" y="12" width="6" height="24" rx="3" fill={colors.accent} />
        <rect x="39" y="14" width="4" height="8" fill={colors.primary} />
        
        {/* Base mounting */}
        <rect x="2" y="36" width="44" height="4" rx="2" fill={colors.secondary} />
        
        {/* Bend arm */}
        <path d="M8 22 Q12 8 24 8 Q36 8 40 22" stroke={colors.primary} strokeWidth="2" fill="none" />
        
        {/* Control elements */}
        <circle cx="12" cy="28" r="2" fill={colors.accent} />
        <circle cx="20" cy="28" r="2" fill={colors.accent} />
        
        {/* Brand indicator dot */}
        <circle cx="42" cy="6" r="3" fill={colors.primary} />
      </svg>
    );
  } else {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        {/* Manual Bender Icon */}
        <rect x="4" y="24" width="32" height="12" rx="2" fill={colors.secondary} />
        <rect x="6" y="26" width="28" height="8" rx="1" fill={colors.primary} />
        
        {/* Manual handle */}
        <rect x="32" y="18" width="4" height="18" rx="2" fill={colors.accent} />
        <circle cx="34" cy="16" r="4" fill={colors.primary} />
        
        {/* Base mounting */}
        <rect x="2" y="36" width="36" height="4" rx="2" fill={colors.secondary} />
        
        {/* Bend arm */}
        <path d="M8 26 Q12 12 20 12 Q28 12 32 26" stroke={colors.primary} strokeWidth="2" fill="none" />
        
        {/* Degree wheel indicator */}
        <circle cx="16" cy="30" r="3" stroke={colors.accent} strokeWidth="1" fill="none" />
        
        {/* Brand indicator dot */}
        <circle cx="42" cy="6" r="3" fill={colors.primary} />
      </svg>
    );
  }
}

export default ProductIcon;
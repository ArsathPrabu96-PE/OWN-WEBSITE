import React from 'react';

interface GeometricBackgroundProps {
  variant?: 'dots' | 'grid' | 'circles' | 'waves' | 'hexagon' | 'lines';
  className?: string;
  animated?: boolean;
}

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ 
  variant = 'dots', 
  className = '',
  animated = false 
}) => {
  const DotsPattern = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <defs>
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="currentColor" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );

  const GridPattern = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <defs>
        <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );

  const CirclesPattern = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute -top-40 -right-40 w-80 h-80 bg-red-500/8 rounded-full ${animated ? 'animate-pulse' : ''}`} />
      <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/8 rounded-full ${animated ? 'animate-pulse' : ''}`} style={{ animationDelay: '1s' }} />
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/5 rounded-full ${animated ? 'animate-ping' : ''}`} style={{ animationDelay: '2s' }} />
      <div className={`absolute top-20 right-20 w-32 h-32 bg-orange-400/6 rounded-full ${animated ? 'animate-bounce' : ''}`} style={{ animationDelay: '3s' }} />
    </div>
  );

  const DiagonalLinesPattern = () => (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <pattern id="diagonalLines" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0,8 L8,0" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
            <path d="M-2,2 L2,-2 M6,10 L10,6" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>
    </div>
  );

  const WavesPattern = () => (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.1"/>
            <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#45B7D1" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <path 
          d="M0,80 C120,60 240,40 360,60 C480,80 600,100 720,80 C840,60 960,40 1080,60 C1140,70 1170,75 1200,80 L1200,120 L0,120 Z" 
          fill="url(#wave-gradient)" 
          opacity="0.15"
          className={animated ? 'animate-pulse' : ''}
        />
      </svg>
    </div>
  );

  const HexagonPattern = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <defs>
        <pattern id="hexagon" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
          <polygon 
            points="10,1 18.66,6 18.66,16 10,21 1.34,16 1.34,6" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            opacity="0.05"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagon)" />
    </svg>
  );

  const renderPattern = () => {
    switch (variant) {
      case 'grid':
        return <GridPattern />;
      case 'circles':
        return <CirclesPattern />;
      case 'waves':
        return <WavesPattern />;
      case 'hexagon':
        return <HexagonPattern />;
      case 'lines':
        return <DiagonalLinesPattern />;
      default:
        return <DotsPattern />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {renderPattern()}
    </div>
  );
};

export default GeometricBackground;
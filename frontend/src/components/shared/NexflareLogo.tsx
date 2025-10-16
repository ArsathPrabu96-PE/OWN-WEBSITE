import React from 'react';

interface NexflareLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  animated?: boolean;
}

const NexflareLogo: React.FC<NexflareLogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full',
  animated = false 
}) => {
  const sizeClasses = {
    sm: 'w-24 h-8',
    md: 'w-32 h-10',
    lg: 'w-48 h-16',
    xl: 'w-64 h-20'
  };

  const IconComponent = () => (
    <svg viewBox="0 0 64 64" className={`${animated ? 'animate-pulse' : ''}`}>
      {/* Nexflare Logo Icon */}
      <defs>
        <linearGradient id="nexflare-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#45B7D1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main N shape */}
      <path 
        d="M12 16 L20 16 L20 32 L44 16 L52 16 L52 48 L44 48 L44 32 L20 48 L12 48 Z" 
        fill="url(#nexflare-gradient)"
        filter="url(#glow)"
      />
      
      {/* Accent dots */}
      <circle cx="56" cy="20" r="2" fill="#FF6B6B" opacity="0.8" />
      <circle cx="56" cy="28" r="1.5" fill="#4ECDC4" opacity="0.6" />
      <circle cx="56" cy="36" r="1" fill="#00FFFF" opacity="0.4" />
      
      {/* Flare effect */}
      <path 
        d="M8 32 L16 28 L16 36 Z" 
        fill="#00FFFF" 
        opacity="0.6"
        className={animated ? 'animate-ping' : ''}
      />
    </svg>
  );

  const TextComponent = () => (
    <div className="flex items-center">
      <span className={`font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent ${animated ? 'animate-pulse' : ''}`}>
        NEXFLARE
      </span>
      <span className="ml-1 text-cyan-400 font-light">TECH</span>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <IconComponent />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`${className}`}>
        <TextComponent />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={sizeClasses[size]}>
        <IconComponent />
      </div>
      <TextComponent />
    </div>
  );
};

export default NexflareLogo;
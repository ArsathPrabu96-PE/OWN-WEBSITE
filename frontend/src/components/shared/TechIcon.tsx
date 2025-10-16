import React from 'react';

interface TechIconProps {
  tech: string;
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const TechIcon: React.FC<TechIconProps> = ({ 
  tech, 
  className = '', 
  animated = false,
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const iconComponents: { [key: string]: JSX.Element } = {
    'React': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }}>
        <circle cx="12" cy="12" r="3" fill="#61DAFB"/>
        <path d="M12 1C16.5 3 20 6.5 22 12C20 17.5 16.5 21 12 23C7.5 21 4 17.5 2 12C4 6.5 7.5 3 12 1Z" fill="none" stroke="#61DAFB" strokeWidth="1"/>
        <path d="M12 1C7.5 3 4 6.5 2 12C4 17.5 7.5 21 12 23C16.5 21 20 17.5 22 12C20 6.5 16.5 3 12 1Z" fill="none" stroke="#61DAFB" strokeWidth="1"/>
      </svg>
    ),
    'Next.js': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-pulse' : ''}`}>
        <circle cx="12" cy="12" r="10" fill="#000"/>
        <path d="M8 8h8v8l-8-8z" fill="#fff"/>
        <path d="M16 8v8" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    'TypeScript': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-bounce' : ''}`}>
        <rect x="2" y="2" width="20" height="20" fill="#3178C6" rx="2"/>
        <path d="M8 8h4v2H8V8zM8 12h6v2H8v-2z" fill="#fff"/>
        <text x="12" y="18" fill="#fff" fontSize="8" textAnchor="middle">TS</text>
      </svg>
    ),
    'TailwindCSS': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-pulse' : ''}`}>
        <path d="M12 6C9.5 6 8 7.5 8 9.5C8.5 8.5 9.25 8.25 10.25 8.75C11 9.125 11.5 9.625 12 10.125C13 9.125 14 8.5 15.5 8.5C17.5 8.5 19 9.5 19.5 11.5C19 10.5 18.25 10.25 17.25 10.75C16.5 11.125 16 11.625 15.5 12.125C14.5 13.125 13.5 13.75 12 13.75C9.5 13.75 8 12.25 8 10.25C8.5 11.25 9.25 11.5 10.25 11C11 10.625 11.5 10.125 12 9.625C13 10.625 14 11.25 15.5 11.25C17.5 11.25 19 10.25 19.5 8.25C19 9.25 18.25 9.5 17.25 9C16.5 8.625 16 8.125 15.5 7.625C14.5 6.625 13.5 6 12 6Z" fill="#06B6D4"/>
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-pulse' : ''}`}>
        <path d="M12 1L22 6v12l-10 5L2 18V6l10-5z" fill="#339933"/>
        <path d="M12 1v22M22 6l-10 6L2 6" stroke="#fff" strokeWidth="0.5" fill="none"/>
      </svg>
    ),
    'MongoDB': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-bounce' : ''}`}>
        <path d="M12 2C7 2 3 6 3 11c0 3 1.5 5.5 3.5 7.5L12 22l5.5-3.5C19.5 16.5 21 14 21 11c0-5-4-9-9-9z" fill="#4DB33D"/>
        <ellipse cx="12" cy="11" rx="3" ry="6" fill="#3F9D34"/>
      </svg>
    ),
    'OpenAI': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#10A37F" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" fill="none" stroke="#10A37F" strokeWidth="1"/>
        <circle cx="12" cy="12" r="2" fill="#10A37F"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#10A37F" strokeWidth="1"/>
      </svg>
    ),
    'AWS': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-pulse' : ''}`}>
        <path d="M6 8l6-4 6 4v8l-6 4-6-4V8z" fill="#FF9900" stroke="#232F3E" strokeWidth="1"/>
        <text x="12" y="14" fill="#232F3E" fontSize="6" textAnchor="middle">AWS</text>
      </svg>
    ),
    'Docker': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-bounce' : ''}`}>
        <rect x="4" y="8" width="16" height="8" fill="#2496ED" rx="1"/>
        <rect x="6" y="10" width="3" height="2" fill="#fff"/>
        <rect x="10" y="10" width="3" height="2" fill="#fff"/>
        <rect x="14" y="10" width="3" height="2" fill="#fff"/>
        <rect x="8" y="13" width="8" height="1" fill="#fff"/>
      </svg>
    ),
    'Python': (
      <svg viewBox="0 0 24 24" className={`${sizeClasses[size]} ${animated ? 'animate-pulse' : ''}`}>
        <path d="M12 2C8 2 6 4 6 6v4h6v1H4c-1 0-2 1-2 2v4c0 1 1 2 2 2h2v-3c0-1 1-2 2-2h8c1 0 2-1 2-2V6c0-2-2-4-6-4z" fill="#3776AB"/>
        <path d="M12 22c4 0 6-2 6-4v-4h-6v-1h8c1 0 2-1 2-2V7c0-1-1-2-2-2h-2v3c0 1-1 2-2 2H8c-1 0-2 1-2 2v6c0 2 2 4 6 4z" fill="#FFD43B"/>
      </svg>
    )
  };

  const defaultIcon = (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center ${animated ? 'animate-pulse' : ''}`}>
      <span className="text-white text-xs font-bold">{tech.charAt(0)}</span>
    </div>
  );

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {iconComponents[tech] || defaultIcon}
    </div>
  );
};

export default TechIcon;
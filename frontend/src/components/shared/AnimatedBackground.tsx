"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Matrix from './Matrix';
import Particles from './Particles';

interface AnimatedBackgroundProps {
  variant?: 'matrix' | 'particles' | 'waves' | 'circuit';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'particles',
  intensity = 'medium',
  className = ''
}) => {
  const particleCount = intensity === 'low' ? 20 : intensity === 'medium' ? 40 : 60;

  const renderWaves = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${50 + i * 10}% ${50 + i * 5}%, rgba(0,255,255,0.1) 0%, transparent 50%)`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderCircuit = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M10,10 L90,10 L90,50 L50,50 L50,90 L10,90 Z"
              fill="none"
              stroke="rgba(0,255,255,0.2)"
              strokeWidth="1"
            />
            <circle cx="10" cy="10" r="2" fill="rgba(0,255,255,0.4)" />
            <circle cx="90" cy="50" r="2" fill="rgba(0,255,255,0.4)" />
            <circle cx="50" cy="90" r="2" fill="rgba(0,255,255,0.4)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
        
        {/* Animated circuit lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={i}
            x1={100 + i * 120}
            y1="100"
            x2={100 + i * 120}
            y2="900"
            stroke="rgba(0,255,255,0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>
    </div>
  );

  switch (variant) {
    case 'matrix':
      return <Matrix className={className} />;
    case 'particles':
      return <Particles className={className} particleCount={particleCount} />;
    case 'waves':
      return renderWaves();
    case 'circuit':
      return renderCircuit();
    default:
      return <Particles className={className} particleCount={particleCount} />;
  }
};

export default AnimatedBackground;
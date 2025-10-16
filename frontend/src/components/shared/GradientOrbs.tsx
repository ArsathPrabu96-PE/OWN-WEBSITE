import React from 'react';
import { motion } from 'framer-motion';

interface GradientOrbsProps {
  className?: string;
  count?: number;
  animated?: boolean;
}

const GradientOrbs: React.FC<GradientOrbsProps> = ({ 
  className = '',
  count = 3,
  animated = true
}) => {
  const orbs = Array.from({ length: count }, (_, i) => i);

  const orbColors = [
    'from-cyan-400/20 via-blue-500/10 to-purple-600/20',
    'from-purple-400/20 via-pink-500/10 to-cyan-600/20',
    'from-blue-400/20 via-cyan-500/10 to-purple-600/20',
    'from-green-400/20 via-cyan-500/10 to-blue-600/20',
    'from-pink-400/20 via-purple-500/10 to-blue-600/20'
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((index) => {
        const size = 200 + Math.random() * 300;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const animationDelay = index * 2;
        const animationDuration = 20 + Math.random() * 10;

        return (
          <motion.div
            key={index}
            className={`absolute rounded-full bg-gradient-radial ${orbColors[index % orbColors.length]} blur-xl`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${initialX}%`,
              top: `${initialY}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ 
              scale: 0.5,
              opacity: 0.3
            }}
            animate={animated ? {
              scale: [0.5, 1.2, 0.8, 1],
              opacity: [0.3, 0.6, 0.2, 0.4],
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
            } : {}}
            transition={{
              duration: animationDuration,
              delay: animationDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default GradientOrbs;
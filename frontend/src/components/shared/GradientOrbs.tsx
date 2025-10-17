import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GradientOrbsProps {
  className?: string;
  count?: number;
  animated?: boolean;
}

interface OrbData {
  size: number;
  initialX: number;
  initialY: number;
  animationDelay: number;
  animationDuration: number;
  color: string;
}

// Move static array outside component to avoid dependency warnings
const orbColors = [
  'from-cyan-400/20 via-blue-500/10 to-purple-600/20',
  'from-purple-400/20 via-pink-500/10 to-cyan-600/20',
  'from-blue-400/20 via-cyan-500/10 to-purple-600/20',
  'from-green-400/20 via-cyan-500/10 to-blue-600/20',
  'from-yellow-400/20 via-orange-500/10 to-red-600/20',
  'from-pink-400/20 via-purple-500/10 to-indigo-600/20'
];

const GradientOrbs: React.FC<GradientOrbsProps> = ({
  className = '',
  count = 3,
  animated = true
}) => {
  const [orbsData, setOrbsData] = useState<OrbData[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const generateOrbs = () => {
      const data = Array.from({ length: count }, (_, index) => ({
        size: 200 + Math.random() * 300,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        animationDelay: index * 2,
        animationDuration: 20 + Math.random() * 10,
        color: orbColors[index % orbColors.length],
      }));
      setOrbsData(data);
    };
    generateOrbs();
  }, [count, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbsData.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-xl`}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.initialX}%`,
            top: `${orb.initialY}%`,
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
            duration: orb.animationDuration,
            delay: orb.animationDelay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GradientOrbs;
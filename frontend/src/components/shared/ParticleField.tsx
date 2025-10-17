"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ParticleFieldProps {
  count?: number;
  className?: string;
  variant?: 'stars' | 'dots' | 'lines' | 'mixed';
  colors?: string[];
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  type: (particle: ParticleData) => JSX.Element;
}

const DEFAULT_COLORS = ['#00FFFF', '#0080FF', '#8000FF', '#FF00FF'];

const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 50,
  className = '',
  variant = 'mixed',
  colors = DEFAULT_COLORS
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderStar = (particle: ParticleData) => (
    <motion.div
      key={particle.id}
      className="absolute"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
      }}
    >
      <div
        className="relative"
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
        }}
      >
        {/* Star shape */}
        <div
          className="absolute inset-0"
          style={{
            background: particle.color,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />
      </div>
    </motion.div>
  );

  const renderDot = (particle: ParticleData) => (
    <motion.div
      key={particle.id}
      className="absolute rounded-full"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        backgroundColor: particle.color,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
      }}
    />
  );

  const renderLine = (particle: ParticleData) => (
    <motion.div
      key={particle.id}
      className="absolute"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size * 10}px`,
        height: '1px',
        backgroundColor: particle.color,
        transformOrigin: 'center',
      }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scaleX: [0, 1, 0],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
      }}
    />
  );

  const particles = useMemo(() => {
    if (!isClient) return [];
    
    const particleTypes = [renderStar, renderDot, renderLine];
    const getParticleType = (variant: string) => {
      switch (variant) {
        case 'stars':
          return renderStar;
        case 'dots':
          return renderDot;
        case 'lines':
          return renderLine;
        case 'mixed':
          return particleTypes[Math.floor(Math.random() * particleTypes.length)];
        default:
          return renderDot;
      }
    };

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      type: getParticleType(variant),
    }));
  }, [count, variant, colors, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => particle.type(particle))}
    </div>
  );
};

export default ParticleField;
"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface CyberGridProps {
  className?: string;
  animated?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const CyberGrid: React.FC<CyberGridProps> = ({
  className = '',
  animated = true,
  intensity = 'medium'
}) => {
  const gridSize = intensity === 'low' ? 60 : intensity === 'medium' ? 40 : 25;
  const opacity = intensity === 'low' ? 0.1 : intensity === 'medium' ? 0.15 : 0.2;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,${opacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Animated Grid Lines */}
      {animated && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`vertical-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{ left: `${20 + i * 15}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
          
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`horizontal-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ top: `${20 + i * 15}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}

      {/* Corner Accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400 opacity-40" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400 opacity-40" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400 opacity-40" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400 opacity-40" />
    </div>
  );
};

export default CyberGrid;
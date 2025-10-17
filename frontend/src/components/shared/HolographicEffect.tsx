"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Glitch from './Glitch';

interface HolographicEffectProps {
  className?: string;
  variant?: 'scanner' | 'waves' | 'glitch' | 'pulse';
  intensity?: 'low' | 'medium' | 'high';
}

const HolographicEffect: React.FC<HolographicEffectProps> = ({
  className = '',
  variant = 'scanner',
  intensity = 'medium'
}) => {
  const getIntensityValue = () => {
    switch (intensity) {
      case 'low': return 0.3;
      case 'medium': return 0.5;
      case 'high': return 0.8;
      default: return 0.5;
    }
  };

  const intensityValue = getIntensityValue();

  const renderScanner = () => (
    <>
      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        style={{ opacity: intensityValue }}
        animate={{
          top: ['-10%', '110%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,${intensityValue * 0.1}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,${intensityValue * 0.1}) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
    </>
  );

  const renderWaves = () => (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,255,255,${intensityValue * 0.1}) 50%, transparent 70%)`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, intensityValue, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );

  const renderPulse = () => (
    <>
      {/* Central pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400"
        animate={{
          scale: [0, 20, 0],
          opacity: [intensityValue, 0, intensityValue],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      
      {/* Ripple effects */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-400 rounded-full"
          animate={{
            width: ['0px', '400px'],
            height: ['0px', '400px'],
            opacity: [intensityValue, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
          }}
        />
      ))}
    </>
  );

  const renderEffect = () => {
    switch (variant) {
      case 'scanner':
        return renderScanner();
      case 'waves':
        return renderWaves();
      case 'glitch':
        return <Glitch intensityValue={intensityValue} />;
      case 'pulse':
        return renderPulse();
      default:
        return renderScanner();
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {renderEffect()}
    </div>
  );
};

export default HolographicEffect;
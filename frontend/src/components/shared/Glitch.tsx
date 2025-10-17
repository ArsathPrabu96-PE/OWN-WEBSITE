"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchProps {
  intensityValue: number;
}

interface GlitchData {
  duration: number;
  delay: number;
}

const Glitch: React.FC<GlitchProps> = ({ intensityValue }) => {
  const [glitchData, setGlitchData] = useState<GlitchData[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 8 }).map(() => ({
      duration: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }));
    setGlitchData(data);
  }, []);

  return (
    <>
      {/* Glitch lines */}
      {glitchData.map((glitch, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 bg-cyan-400"
          style={{
            height: '2px',
            top: `${10 + i * 10}%`,
            opacity: intensityValue * 0.3,
          }}
          animate={{
            x: ['-100%', '100%', '-100%'],
            opacity: [0, intensityValue * 0.8, 0],
          }}
          transition={{
            duration: glitch.duration,
            repeat: Infinity,
            delay: glitch.delay,
          }}
        />
      ))}
      
      {/* Digital noise */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0,255,255,${intensityValue * 0.05}) 2px,
              rgba(0,255,255,${intensityValue * 0.05}) 4px
            )
          `,
        }}
        animate={{
          opacity: [intensityValue * 0.3, intensityValue * 0.7, intensityValue * 0.3],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
        }}
      />
    </>
  );
};

export default Glitch;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParticlesProps {
  className?: string;
  particleCount?: number;
}

interface ParticleData {
  left: number;
  top: number;
  duration: number;
  delay: number;
  animateX: number;
  animateY: number;
}

const Particles: React.FC<ParticlesProps> = ({ className, particleCount = 40 }) => {
  const [particlesData, setParticlesData] = useState<ParticleData[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const data = Array.from({ length: particleCount }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
      animateX: Math.random() * 200 - 100,
      animateY: Math.random() * 200 - 100,
    }));
    setParticlesData(data);
  }, [particleCount, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {particlesData.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            x: [0, particle.animateX],
            y: [0, particle.animateY],
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;

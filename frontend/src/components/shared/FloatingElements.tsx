import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  className?: string;
  count?: number;
  variant?: 'geometric' | 'tech' | 'particles';
}

interface ElementData {
  delay: number;
  duration: number;
  x: number;
  y: number;
  rotation: number;
  content: JSX.Element;
  animateX: number;
  animateY: number;
}

// Move static arrays outside component to avoid dependency warnings
const geometricShapes = [
  <svg key="triangle" viewBox="0 0 24 24" className="w-6 h-6 text-red-400/30">
    <path d="M12 2 L22 20 L2 20 Z" fill="currentColor" />
  </svg>,
  <svg key="circle" viewBox="0 0 24 24" className="w-4 h-4 text-teal-400/25">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
  </svg>,
  <svg key="square" viewBox="0 0 24 24" className="w-5 h-5 text-blue-400/30">
    <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" />
  </svg>,
  <svg key="diamond" viewBox="0 0 24 24" className="w-5 h-5 text-red-400/25">
    <path d="M12 2 L20 12 L12 22 L4 12 Z" fill="currentColor" />
  </svg>,
  <svg key="hexagon" viewBox="0 0 24 24" className="w-6 h-6 text-teal-400/30">
    <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" fill="currentColor" />
  </svg>,
  <svg key="star" viewBox="0 0 24 24" className="w-5 h-5 text-blue-400/25">
    <path d="M12 2 L15 9 L22 9 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 L9 9 Z" fill="currentColor" />
  </svg>,
  <svg key="cross" viewBox="0 0 24 24" className="w-4 h-4 text-red-400/30">
    <path d="M12 2 L12 22 M2 12 L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  <svg key="dots" viewBox="0 0 24 24" className="w-3 h-3 text-teal-400/35">
    <circle cx="6" cy="6" r="1" fill="currentColor" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
    <circle cx="18" cy="6" r="1" fill="currentColor" />
    <circle cx="6" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="18" cy="12" r="1" fill="currentColor" />
    <circle cx="6" cy="18" r="1" fill="currentColor" />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
    <circle cx="18" cy="18" r="1" fill="currentColor" />
  </svg>
];

const techElements = [
  <div key="tech-circle" className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full opacity-40" />,
  <div key="tech-bar" className="w-4 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded opacity-35" />,
  <div key="tech-triangle" className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 opacity-40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />,
  <div key="tech-square" className="w-5 h-5 border border-teal-400/40 rounded-lg" />,
  <div key="tech-ring" className="w-3 h-3 border-2 border-red-400/50 rounded-full" />,
  <div key="tech-line" className="w-1 h-6 bg-gradient-to-b from-blue-400 to-transparent opacity-50" />,
  <div key="tech-diamond" className="w-4 h-4 bg-gradient-to-br from-orange-400 to-pink-500 opacity-30 transform rotate-45" />,
  <div key="tech-pill" className="w-2 h-8 bg-gradient-to-t from-teal-500 to-cyan-400 opacity-35 rounded-full" />
];

const particleElements = [
  <div key="particle-1" className="w-1 h-1 bg-cyan-400 rounded-full opacity-60" />,
  <div key="particle-2" className="w-2 h-2 bg-purple-400 rounded-full opacity-40" />,
  <div key="particle-3" className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50" />,
  <div key="particle-4" className="w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-70" />,
  <div key="particle-5" className="w-2.5 h-2.5 bg-purple-300 rounded-full opacity-30" />,
  <div key="particle-6" className="w-1 h-1 bg-blue-300 rounded-full opacity-60" />
];

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  className = '',
  count = 6,
  variant = 'geometric'
}) => {
  const [elementsData, setElementsData] = useState<ElementData[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const getElementArray = () => {
      switch (variant) {
        case 'tech': return techElements;
        case 'particles': return particleElements;
        default: return geometricShapes;
      }
    };

    const elementArray = getElementArray();
    const data = Array.from({ length: count }, (_, i) => ({
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      content: elementArray[i % elementArray.length],
      animateX: Math.random() * 100 - 50,
      animateY: Math.random() * 100 - 50,
    }));
    setElementsData(data);
  }, [count, variant, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elementsData.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: element.rotation
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [element.rotation, element.rotation + 360],
            x: [0, element.animateX],
            y: [0, element.animateY],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {element.content}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
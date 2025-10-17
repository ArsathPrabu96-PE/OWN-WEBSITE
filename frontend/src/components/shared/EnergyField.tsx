"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface EnergyFieldProps {
  className?: string;
  variant?: 'lightning' | 'plasma' | 'neural' | 'quantum';
  intensity?: 'low' | 'medium' | 'high';
}

const EnergyField: React.FC<EnergyFieldProps> = ({
  className = '',
  variant = 'neural',
  intensity = 'medium'
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const nodeCount = intensity === 'low' ? 8 : intensity === 'medium' ? 12 : 16;
  const connectionOpacity = intensity === 'low' ? 0.2 : intensity === 'medium' ? 0.4 : 0.6;

  // Generate stable random nodes using useMemo to prevent regeneration on every render
  const nodes = React.useMemo(() => {
    if (!isMounted) return []; // Don't generate nodes until mounted
    return Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: Math.max(2, 2 + Math.random() * 4), // Ensure minimum size of 2
    }));
  }, [nodeCount, isMounted]);

  const renderLightning = () => (
    <svg className="absolute inset-0 w-full h-full">
      {Array.from({ length: 6 }).map((_, i) => {
        const pathData = `M${Math.random() * 100},0 L${Math.random() * 100},${Math.random() * 50} L${Math.random() * 100},${50 + Math.random() * 50} L${Math.random() * 100},100`;
        return (
          <motion.path
            key={i}
            d={pathData}
            fill="none"
            stroke="url(#lightning-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              repeatDelay: 2,
            }}
          />
        );
      })}
      <defs>
        <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8000FF" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );

  const renderPlasma = () => (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + Math.sin(i) * 20}%`,
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, #00FFFF 0%, #FF00FF 100%)',
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0, 0.8, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* Plasma waves */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 70%, rgba(0,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 30%, rgba(255,0,255,0.1) 0%, transparent 50%)`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );

  const renderNeural = () => (
    <svg className="absolute inset-0 w-full h-full">
      {/* Connections */}
      {nodes.length > 0 && nodes.map((node, i) =>
        nodes.slice(i + 1).map((otherNode, j) => {
          const distance = Math.sqrt((node.x - otherNode.x) ** 2 + (node.y - otherNode.y) ** 2);
          if (distance < 30) {
            return (
              <motion.line
                key={`${i}-${j}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${otherNode.x}%`}
                y2={`${otherNode.y}%`}
                stroke="rgba(0,255,255,0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, connectionOpacity, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            );
          }
          return null;
        })
      )}
      
      {/* Nodes */}
      {nodes.length > 0 && nodes.map((node) => {
        // Additional safety check for valid node properties
        if (!node || typeof node.size !== 'number' || typeof node.x !== 'number' || typeof node.y !== 'number') {
          return null;
        }
        
        return (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size || 2} // Fallback to 2 if size is undefined
            fill="rgba(0,255,255,0.6)"
            animate={{
              r: [node.size || 2, (node.size || 2) * 1.5, node.size || 2],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random(),
            }}
          />
        );
      })}
    </svg>
  );

  const renderQuantum = () => (
    <>
      {/* Quantum particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [0, 1, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
          <motion.div
            className="absolute inset-0 border border-cyan-400 rounded-full"
            animate={{
              scale: [1, 3, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </motion.div>
      ))}
      
      {/* Quantum field distortion */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1), rgba(0,255,255,0.1))`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'lightning':
        return renderLightning();
      case 'plasma':
        return renderPlasma();
      case 'neural':
        return renderNeural();
      case 'quantum':
        return renderQuantum();
      default:
        return renderNeural();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {renderVariant()}
    </div>
  );
};

export default EnergyField;
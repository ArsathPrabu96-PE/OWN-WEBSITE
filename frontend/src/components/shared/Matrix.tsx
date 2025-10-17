import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MatrixProps {
  className?: string;
}

interface MatrixData {
  left: number;
  top: number;
  duration: number;
  delay: number;
  content: string[];
}

const Matrix: React.FC<MatrixProps> = ({ className }) => {
  const [matrixData, setMatrixData] = useState<MatrixData[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const data = Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      content: Array.from({ length: 10 }).map(() => (Math.random() > 0.5 ? '1' : '0')),
    }));
    setMatrixData(data);
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {matrixData.map((matrix, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400 opacity-20 text-xs font-mono"
          style={{
            left: `${matrix.left}%`,
            top: `${matrix.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: matrix.duration,
            repeat: Infinity,
            delay: matrix.delay,
          }}
        >
          {matrix.content.map((char, j) => (
            <div key={j} className="block">
              {char}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default Matrix;

import React from 'react';
import { motion } from 'framer-motion';

interface ProjectImageProps {
  title: string;
  category: string;
  className?: string;
  animated?: boolean;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ 
  title, 
  category, 
  className = '',
  animated = false
}) => {
  const getCategoryGradient = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'full stack':
        return 'from-green-400 via-blue-500 to-purple-600';
      case 'ai/automation':
        return 'from-purple-400 via-pink-500 to-red-500';
      case 'saas':
        return 'from-blue-400 via-cyan-500 to-teal-500';
      case 'mobile':
        return 'from-orange-400 via-red-500 to-pink-500';
      case 'cloud/devops':
        return 'from-indigo-400 via-purple-500 to-blue-600';
      case 'data analytics':
        return 'from-teal-400 via-cyan-500 to-blue-500';
      default:
        return 'from-gray-400 via-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'full stack':
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white/80">
            <path d="M3 3h18v18H3V3z M7 7v10h10V7H7z M9 9h6v6H9V9z" fill="currentColor" />
          </svg>
        );
      case 'ai/automation':
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white/80">
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
            <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'saas':
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white/80">
            <path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'mobile':
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white/80">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'cloud/devops':
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white/80">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'data analytics':
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white/80">
            <path d="M3 3v18h18 M7 12l4-4 4 4 5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white/80">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="9" cy="9" r="2" fill="currentColor"/>
            <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
    }
  };

  return (
    <motion.div 
      className={`
        relative h-64 bg-gradient-to-br ${getCategoryGradient(category)} 
        rounded-xl overflow-hidden group cursor-pointer
        ${className}
      `}
      whileHover={animated ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id={`pattern-${title.replace(/\s+/g, '')}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pattern-${title.replace(/\s+/g, '')})`} />
        </svg>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {/* Category Icon */}
        <motion.div
          className="mb-4"
          animate={animated ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {getCategoryIcon(category)}
        </motion.div>

        {/* Project Title */}
        <h3 className="text-white font-bold text-lg mb-2 group-hover:scale-110 transition-transform duration-300">
          {title}
        </h3>

        {/* Category Badge */}
        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium backdrop-blur-sm">
          {category}
        </span>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <motion.div 
          className="text-white text-4xl"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          ▶
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </motion.div>
  );
};

export default ProjectImage;
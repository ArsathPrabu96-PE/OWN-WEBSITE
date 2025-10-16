import React from 'react';
import { 
  Code, 
  Brain, 
  MessageSquare, 
  Cloud, 
  Smartphone, 
  Palette,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Database,
  Cpu
} from 'lucide-react';

interface ServiceIconProps {
  service: string;
  className?: string;
  animated?: boolean;
  variant?: 'filled' | 'outlined' | 'gradient';
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ 
  service, 
  className = '',
  animated = false,
  variant = 'gradient'
}) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'Full Stack Development': <Code className="w-full h-full" />,
    'AI-Powered Automation': <Brain className="w-full h-full" />,
    'Business Chatbots': <MessageSquare className="w-full h-full" />,
    'Cloud Solutions': <Cloud className="w-full h-full" />,
    'Mobile App Development': <Smartphone className="w-full h-full" />,
    'UI/UX Design': <Palette className="w-full h-full" />,
    'Data Analytics': <BarChart3 className="w-full h-full" />,
    'Cybersecurity': <Shield className="w-full h-full" />,
    'Performance Optimization': <Zap className="w-full h-full" />,
    'Web Development': <Globe className="w-full h-full" />,
    'Database Management': <Database className="w-full h-full" />,
    'IoT Solutions': <Cpu className="w-full h-full" />
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'filled':
        return 'bg-cyan-500 text-white';
      case 'outlined':
        return 'border-2 border-cyan-500 text-cyan-500 bg-transparent';
      default:
        return 'bg-gradient-to-br from-cyan-400 to-purple-600 text-white';
    }
  };

  const animationClasses = animated ? 'hover:scale-110 hover:rotate-12 transition-all duration-300' : '';

  return (
    <div 
      className={`
        w-16 h-16 rounded-xl flex items-center justify-center 
        ${getVariantClasses()} 
        ${animationClasses}
        shadow-lg hover:shadow-cyan-500/25
        ${className}
      `}
    >
      {iconMap[service] || <Code className="w-full h-full" />}
    </div>
  );
};

export default ServiceIcon;
"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Brain, 
  ShoppingCart, 
  Workflow,
  Calendar,
  MessageSquare,
  BarChart3,
  Zap,
  Play
} from 'lucide-react';
import Button from '../shared/Button';
import ProjectImage from '../shared/ProjectImage';
import GeometricBackground from '../shared/GeometricBackground';
import FloatingElements from '../shared/FloatingElements';
import TechIcon from '../shared/TechIcon';
import CyberGrid from '../shared/CyberGrid';
import AnimatedBackground from '../shared/AnimatedBackground';
import ParticleField from '../shared/ParticleField';
import { useProjects } from '../../hooks/useProjects';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { projects, loading, error } = useProjects({ autoFetch: true });

  // Map categories to backend categories
  const categoryMapping: { [key: string]: string } = {
    'all': 'all',
    'ai': 'AI/Automation',
    'ecommerce': 'Full Stack',
    'saas': 'SaaS',
    'healthcare': 'Full Stack',
    'education': 'Full Stack',
    'fintech': 'Full Stack',
    'mobile': 'Mobile',
    'cloud': 'Cloud/DevOps',
    'analytics': 'Data Analytics'
  };

  const categories = [
    { id: 'all', label: 'All Projects', icon: BarChart3 },
    { id: 'ai', label: 'AI Solutions', icon: Brain },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'saas', label: 'SaaS Platforms', icon: Workflow },
    { id: 'mobile', label: 'Mobile Apps', icon: Calendar },
    { id: 'cloud', label: 'Cloud/DevOps', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: Zap }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => {
        const backendCategory = categoryMapping[activeFilter];
        return project.category === backendCategory;
      });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="projects" className="section-padding bg-darker/30 relative" ref={ref}>
      {/* Background Graphics */}
      <GeometricBackground variant="grid" className="absolute inset-0 text-blue-400" />
      <FloatingElements variant="particles" count={12} className="absolute inset-0" />
      <CyberGrid intensity="medium" className="absolute inset-0" />
      <AnimatedBackground variant="circuit" intensity="low" className="absolute inset-0" />
      <ParticleField count={40} variant="lines" className="absolute inset-0" />
      
      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary gradient-text mb-6 font-display text-glow">
            Delivered Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            6 successfully delivered solutions that showcase our expertise in AI, web development, 
            and digital transformation across various industries.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-cyan-neon text-dark shadow-neon'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-cyan-neon'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm">{category.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-cyan-neon border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-300 mt-4">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-300 mb-4">Using static project data (Backend unavailable)</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => {
            // Determine gradient color based on category
            const getProjectColor = (category: string) => {
              switch (category) {
                case 'AI/Automation': return 'from-purple-500 to-pink-500';
                case 'Full Stack': return 'from-green-500 to-emerald-500';
                case 'SaaS': return 'from-blue-500 to-cyan-500';
                case 'Mobile': return 'from-orange-500 to-red-500';
                case 'Cloud/DevOps': return 'from-indigo-500 to-purple-500';
                case 'Data Analytics': return 'from-teal-500 to-cyan-500';
                default: return 'from-gray-500 to-gray-600';
              }
            };

            return (
            <motion.div
              key={project._id}
              variants={projectVariants}
              layout
              className="group card-glass overflow-hidden hover-glow"
            >
              {/* Project Image */}
              <ProjectImage 
                title={project.title}
                category={project.category}
                animated
                className="h-64"
              />

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient-cyber transition-all duration-300 mb-1 font-elegant text-glow">
                      {project.title}
                    </h3>
                    <p className="text-cyan-neon font-medium text-sm font-tech tracking-wider">
                      {project.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-cyan-neon/10 rounded-lg flex items-center justify-center text-cyan-neon hover:bg-cyan-neon hover:text-dark transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-cyan-neon/10 rounded-lg flex items-center justify-center text-cyan-neon hover:bg-cyan-neon hover:text-dark transition-colors duration-300"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 6).map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-2 px-3 py-1 bg-cyan-neon/10 rounded-full">
                      <TechIcon tech={tech} size="sm" />
                      <span className="text-cyan-neon text-xs font-medium">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div className="space-y-2 mb-6">
                    <h4 className="text-sm font-semibold text-white text-glow">Project Impact:</h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {project.metrics.performanceImprovement && (
                        <li className="flex items-center text-xs text-gray-400">
                          <Zap className="w-3 h-3 text-cyan-neon mr-2 flex-shrink-0" />
                          {project.metrics.performanceImprovement}
                        </li>
                      )}
                      {project.metrics.userGrowth && (
                        <li className="flex items-center text-xs text-gray-400">
                          <Zap className="w-3 h-3 text-cyan-neon mr-2 flex-shrink-0" />
                          {project.metrics.userGrowth}
                        </li>
                      )}
                      {project.metrics.efficiency && (
                        <li className="flex items-center text-xs text-gray-400">
                          <Zap className="w-3 h-3 text-cyan-neon mr-2 flex-shrink-0" />
                          {project.metrics.efficiency}
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank')}
                  disabled={!project.liveUrl}
                >
                  {project.liveUrl ? 'View Project Details' : 'Coming Soon'}
                </Button>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-glass p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-300 mb-6">
              Join our portfolio of 5 successful project deliveries. Let&apos;s bring your ideas to life 
              with our proven expertise in AI, full-stack development, and cutting-edge technologies.
            </p>
            <Button
              variant="primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

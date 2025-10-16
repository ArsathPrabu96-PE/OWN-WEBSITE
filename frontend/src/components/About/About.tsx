"use client";
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, User, Sparkles, Brain, Rocket } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const stats = [
    { number: "5", label: "Projects Delivered" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "100%", label: "Innovation Focus" },
  ];

  return (
    <section id="about" className="section-padding bg-darker/50" ref={ref}>
      <div className="container-max">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary gradient-text mb-6">
            About NEXFLARE TECH
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pioneering the future of digital transformation through cutting-edge AI solutions 
            and innovative software development.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Mission */}
          <motion.div variants={itemVariants} className="card-glass p-8 hover-glow group">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-neon to-cyan-dark rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-dark" />
            </div>
            <h3 className="heading-tertiary text-cyan-neon mb-4 text-center">Our Mission</h3>
            <p className="text-gray-300 text-center leading-relaxed">
              To empower businesses with intelligent, automated digital solutions that drive 
              growth, efficiency, and innovation in the modern digital landscape.
            </p>
          </motion.div>

          {/* Founder Highlight */}
          <motion.div variants={itemVariants} className="card-glass p-8 hover-glow group transform lg:scale-105 border-cyan-neon/30">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-neon to-cyan-dark rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <User className="w-8 h-8 text-dark" />
            </div>
            <h3 className="heading-tertiary text-cyan-neon mb-2 text-center">Founder</h3>
            <h4 className="text-2xl font-bold text-white text-center mb-2">Arsath Prabu</h4>
            <p className="text-cyan-neon font-medium text-center mb-4">
              Full Stack & AI Developer
            </p>
            <p className="text-gray-300 text-center text-sm leading-relaxed">
              Passionate about creating intelligent solutions that bridge the gap between 
              cutting-edge technology and practical business needs.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div variants={itemVariants} className="card-glass p-8 hover-glow group">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-neon to-cyan-dark rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-8 h-8 text-dark" />
            </div>
            <h3 className="heading-tertiary text-cyan-neon mb-4 text-center">Our Vision</h3>
            <p className="text-gray-300 text-center leading-relaxed">
              To bridge AI and innovation for a smarter future, making advanced technology 
              accessible and practical for businesses of all sizes.
            </p>
          </motion.div>
        </motion.div>

        {/* Company Values */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="text-center group">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-neon/10 rounded-full mb-4 mx-auto group-hover:bg-cyan-neon/20 transition-colors duration-300">
              <Sparkles className="w-6 h-6 text-cyan-neon" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Innovate</h4>
            <p className="text-gray-400 text-sm">
              Pushing boundaries with creative solutions
            </p>
          </div>
          <div className="text-center group">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-neon/10 rounded-full mb-4 mx-auto group-hover:bg-cyan-neon/20 transition-colors duration-300">
              <Brain className="w-6 h-6 text-cyan-neon" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Automate</h4>
            <p className="text-gray-400 text-sm">
              Streamlining processes with intelligent automation
            </p>
          </div>
          <div className="text-center group">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-neon/10 rounded-full mb-4 mx-auto group-hover:bg-cyan-neon/20 transition-colors duration-300">
              <Rocket className="w-6 h-6 text-cyan-neon" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Accelerate</h4>
            <p className="text-gray-400 text-sm">
              Driving rapid growth and digital transformation
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center p-6 card-glass hover-glow"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
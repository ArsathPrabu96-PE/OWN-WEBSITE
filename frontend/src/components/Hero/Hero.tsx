"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from '../shared/Button';
import NexflareLogo from '../shared/NexflareLogo';
import GeometricBackground from '../shared/GeometricBackground';
import FloatingElements from '../shared/FloatingElements';
import GradientOrbs from '../shared/GradientOrbs';
import { ChevronDown, Sparkles } from 'lucide-react';

const ParticleBackground = dynamic(() => import('./ParticleBackground'), {
  ssr: false,
});

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const springY = useSpring(y, { stiffness: 400, damping: 90 });

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      ref={ref}
      style={{ y: springY, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      
      {/* Background Graphics */}
      <GeometricBackground variant="circles" className="absolute inset-0 text-teal-400" />
      <GradientOrbs count={5} className="absolute inset-0" />
      <FloatingElements variant="geometric" count={10} className="absolute inset-0" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Logo Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <NexflareLogo size="xl" variant="full" animated className="scale-125" />
        </motion.div>

        {/* Company Name */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="heading-primary text-white font-poppins">
            NEXFLARE{" "}
            <span className="gradient-text animate-glow">
              TECH
            </span>
          </h1>
        </motion.div>

        {/* Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
        >
          AI-Powered Software &{" "}
          <span className="relative">
            <span className="gradient-text">Automation Solutions</span>
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-neon to-transparent"
            />
          </span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          We build intelligent, scalable solutions for your business.{" "}
          <span className="text-cyan-neon font-semibold">
            Innovate. Automate. Accelerate.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <Button 
            variant="primary" 
            className="transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Quote
          </Button>
          <Button 
            variant="secondary" 
            className="transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Projects
          </Button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 text-cyan-neon/30"
          >
            <div className="w-2 h-2 bg-cyan-neon rounded-full animate-pulse" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-10 text-cyan-neon/30"
          >
            <div className="w-3 h-3 border border-cyan-neon rounded-full animate-pulse" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 text-cyan-neon/20"
          >
            <div className="w-4 h-4 border-l-2 border-cyan-neon rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center text-cyan-neon hover:text-white transition-colors duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;

"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Building2, User, FolderCheck, Heart, Headphones, Lightbulb } from 'lucide-react';
import AnimatedBackground from '../shared/AnimatedBackground';
import EnergyField from '../shared/EnergyField';
import ParticleField from '../shared/ParticleField';

const TESTIMONIALS_DATA = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechStart Solutions",
      avatar: "/avatars/sarah.jpg",
      rating: 5,
      text: "NEXFLARE TECH transformed our business with their AI-powered automation platform. We've seen a 40% increase in efficiency and our customers love the new chatbot system. Arsath and his team delivered beyond our expectations.",
      project: "AI Business Automation Platform",
      industry: "Technology Consulting"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO",
      company: "RetailPro Inc",
      avatar: "/avatars/michael.jpg",
      rating: 5,
      text: "The e-commerce platform NEXFLARE TECH built for us is incredible. The performance, user experience, and AI-powered recommendations have increased our sales by 60%. Professional team with exceptional technical skills.",
      project: "E-commerce Platform Development",
      industry: "Retail & E-commerce"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      position: "Medical Director",
      company: "HealthCare Plus",
      avatar: "/avatars/emily.jpg",
      rating: 5,
      text: "The healthcare management system developed by NEXFLARE TECH has revolutionized our patient care process. The telemedicine integration and HIPAA-compliant features are exactly what we needed. Outstanding work!",
      project: "Healthcare Management System",
      industry: "Healthcare"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Founder",
      company: "EduTech Innovations",
      avatar: "/avatars/david.jpg",
      rating: 5,
      text: "Working with NEXFLARE TECH on our learning management platform was a game-changer. The AI-powered personalized learning paths have improved student engagement by 75%. Highly recommend their services!",
      project: "AI-Powered LMS Platform",
      industry: "Education Technology"
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Operations Manager",
      company: "LogiFlow Systems",
      avatar: "/avatars/lisa.jpg",
      rating: 5,
      text: "The task management SaaS platform created by NEXFLARE TECH has streamlined our entire workflow. The predictive analytics and automated task prioritization features are phenomenal. Worth every penny!",
      project: "Smart TaskFlow SaaS",
      industry: "Project Management"
    }
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  }, []);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="section-padding relative" ref={ref}>
      {/* Background Graphics */}
      <AnimatedBackground variant="waves" intensity="low" className="absolute inset-0" />
      <EnergyField variant="quantum" intensity="medium" className="absolute inset-0" />
      <ParticleField count={35} variant="mixed" className="absolute inset-0" />
      
      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary gradient-text mb-6 font-display text-glow">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our clients say about 
            working with NEXFLARE TECH and the results we&apos;ve delivered.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          <div className="card-glass p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 w-8 h-8 text-cyan-neon/20" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic">
                  &quot;{currentTestimonial.text}&quot;
                </blockquote>

                {/* Client Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-neon to-cyan-dark rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-dark" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/20 to-transparent rounded-full" />
                  </div>

                  {/* Client Details */}
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-white mb-1 text-glow">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-cyan-neon font-medium mb-1">
                      {currentTestimonial.position}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                      <Building2 className="w-4 h-4" />
                      <span>{currentTestimonial.company}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      {currentTestimonial.industry}
                    </p>
                  </div>
                </div>

                {/* Project Info */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    <span className="text-cyan-neon font-medium">Project:</span> {currentTestimonial.project}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <motion.button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-cyan-neon/10 hover:bg-cyan-neon/20 border border-cyan-neon/30 rounded-full flex items-center justify-center text-cyan-neon transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <motion.button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-cyan-neon/10 hover:bg-cyan-neon/20 border border-cyan-neon/30 rounded-full flex items-center justify-center text-cyan-neon transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Dots */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-3 mb-16"
        >
          {TESTIMONIALS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-cyan-neon shadow-neon-subtle' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </motion.div>

        {/* Client Logos/Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="card-glass p-6 hover:bg-white/5 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4 mx-auto">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">6</div>
            <div className="text-gray-400 text-sm">Happy Clients</div>
          </div>
          <div className="card-glass p-6 hover:bg-white/5 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-4 mx-auto">
              <FolderCheck className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">6</div>
            <div className="text-gray-400 text-sm">Projects Delivered</div>
          </div>
          <div className="card-glass p-6 hover:bg-white/5 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-4 mx-auto">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">98%</div>
            <div className="text-gray-400 text-sm">Client Satisfaction</div>
          </div>
          <div className="card-glass p-6 hover:bg-white/5 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 mx-auto">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ServiceIcon, GeometricBackground, FloatingElements } from '../shared';
import { 
  Code, 
  Brain, 
  MessageCircle, 
  Cloud, 
  Globe,
  Cog,
  Zap
} from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: Code,
      title: "Full Stack Web & App Development",
      description: "End-to-end web and mobile applications built with modern technologies like React, Next.js, NestJS, and Flutter.",
      features: ["React & Next.js", "NestJS Backend", "Mobile Apps", "Progressive Web Apps"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Automation",
      description: "Intelligent automation solutions that streamline your business processes and improve efficiency using cutting-edge AI technologies.",
      features: ["Process Automation", "ML Integration", "Data Analytics", "Predictive Models"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageCircle,
      title: "Business Chatbots & Assistants",
      description: "Smart conversational AI solutions for customer support, lead generation, and business process automation.",
      features: ["Customer Support", "Lead Generation", "24/7 Availability", "Multi-platform"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Cloud,
      title: "SaaS Product Development",
      description: "Scalable Software-as-a-Service platforms designed for growth, performance, and user satisfaction.",
      features: ["Scalable Architecture", "Multi-tenancy", "Subscription Management", "Analytics"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Cloud Integration & Hosting",
      description: "Seamless cloud infrastructure setup, migration, and management for optimal performance and security.",
      features: ["AWS/Azure Setup", "CI/CD Pipelines", "Load Balancing", "Auto-scaling"],
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Cog,
      title: "IoT & Smart Automation",
      description: "Future-ready IoT solutions and smart automation systems for modern businesses and homes.",
      features: ["IoT Development", "Smart Devices", "Real-time Monitoring", "Edge Computing"],
      color: "from-indigo-500 to-purple-500",
      badge: "Coming Soon"
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="services" className="section-padding relative" ref={ref}>
      {/* Background Graphics */}
      <GeometricBackground variant="lines" className="absolute inset-0 text-red-400" />
      <FloatingElements variant="tech" count={8} className="absolute inset-0" />
      
      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary gradient-text mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive technology solutions designed to transform your business 
            and accelerate your digital journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative card-glass p-8 hover-glow transition-all duration-500 overflow-hidden"
            >
              {/* Badge for Coming Soon */}
              {service.badge && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {service.badge}
                </div>
              )}

              {/* Service Icon */}
              <div className="mb-6">
                <ServiceIcon 
                  service={service.title} 
                  animated 
                  variant="gradient"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-neon transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                    <Zap className="w-3 h-3 text-cyan-neon mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-glass p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how our AI-powered solutions can accelerate your digital transformation 
              and drive measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Start Your Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                View Our Work
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

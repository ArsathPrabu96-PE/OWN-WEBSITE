"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  Code,
  Brain,
  Database,
  Smartphone,
  Globe,
  Cloud,
  ExternalLink
} from 'lucide-react';
import Button from '../shared/Button';

const Founder = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const skills = [
    { name: "React & Next.js", level: 95, category: "Frontend", icon: Code },
    { name: "NestJS & Node.js", level: 92, category: "Backend", icon: Database },
    { name: "Flutter & React Native", level: 88, category: "Mobile", icon: Smartphone },
    { name: "MongoDB & PostgreSQL", level: 90, category: "Database", icon: Database },
    { name: "OpenAI API & ML", level: 85, category: "AI/ML", icon: Brain },
    { name: "AWS & Cloud Services", level: 87, category: "DevOps", icon: Cloud },
    { name: "Python & TensorFlow", level: 83, category: "AI/ML", icon: Brain },
    { name: "TypeScript & JavaScript", level: 93, category: "Programming", icon: Code }
  ];

  const achievements = [
    {
      title: "6 Projects Delivered",
      description: "Successfully delivered projects across various industries",
      icon: Award,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "AI Innovation Expert",
      description: "Specialized in integrating AI solutions for business automation",
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Full Stack Mastery",
      description: "End-to-end development from concept to deployment",
      icon: Code,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Client Success Rate 98%",
      description: "Maintaining high client satisfaction and project success",
      icon: Award,
      color: "from-green-500 to-emerald-500"
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="founder" className="section-padding bg-darker/50" ref={ref}>
      <div className="container-max">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary gradient-text mb-6">
            Meet the Founder
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Arsath Prabu — Full Stack Developer & AI Specialist passionate about 
            creating innovative solutions that bridge technology and business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Profile & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <div className="card-glass p-8 text-center">
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-cyan-neon to-cyan-dark rounded-full flex items-center justify-center shadow-neon">
                  <span className="text-4xl font-bold text-dark">AP</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/20 to-transparent rounded-full animate-pulse" />
              </div>

              {/* Basic Info */}
              <h3 className="text-2xl font-bold text-white mb-2">Arsath Prabu R</h3>
              <p className="text-cyan-neon font-medium mb-4">Founder & Lead Developer</p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Trichy, India</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>2+ Years Experience</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 mb-6">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/ArsathPrabu96-PE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-cyan-neon/10 rounded-lg flex items-center justify-center text-cyan-neon hover:bg-cyan-neon hover:text-dark transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/arsath-prabu-141b2b323/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-cyan-neon/10 rounded-lg flex items-center justify-center text-cyan-neon hover:bg-cyan-neon hover:text-dark transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="arsathprabu96@gmail.com"
                  className="w-10 h-10 bg-cyan-neon/10 rounded-lg flex items-center justify-center text-cyan-neon hover:bg-cyan-neon hover:text-dark transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>

              {/* Resume Download */}
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  // In a real app, this would download the actual resume
                  window.open('/resume-arsath-prabu.pdf', '_blank');
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>

            {/* About Section */}
            <div className="card-glass p-6">
              <h4 className="text-xl font-bold text-white mb-4">About Me</h4>
              <p className="text-gray-300 leading-relaxed text-sm">
                I'm a passionate Full Stack Developer and AI Specialist with over 2 years of experience 
                in creating innovative digital solutions. My journey began with a fascination for 
                technology's potential to solve real-world problems, leading me to master both 
                traditional web development and cutting-edge AI technologies.
              </p>
              <br />
              <p className="text-gray-300 leading-relaxed text-sm">
                At NEXFLARE TECH, I focus on building intelligent, scalable solutions that not only 
                meet current business needs but also prepare organizations for the future of digital transformation.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Skills & Achievements */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Skills Section */}
            <div className="card-glass p-6">
              <h4 className="text-xl font-bold text-white mb-6">Technical Skills</h4>
              <div className="space-y-4">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-4 h-4 text-cyan-neon" />
                          <span className="text-white font-medium text-sm">{skill.name}</span>
                        </div>
                        <span className="text-cyan-neon text-sm font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          className="bg-gradient-to-r from-cyan-neon to-cyan-dark h-2 rounded-full shadow-sm shadow-cyan-neon/20"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="card-glass p-4 group hover-glow"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="text-white font-semibold text-sm mb-2">
                      {achievement.title}
                    </h5>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {achievement.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Section */}
            <div className="card-glass p-6 text-center">
              <h4 className="text-lg font-bold text-white mb-3">
                Let's Work Together
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Ready to turn your ideas into reality? Let's discuss your project 
                and explore how we can create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start a Project
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open('mailto:arsath@nexflaretech.com', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;

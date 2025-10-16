"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Facebook,
  Instagram,
  ArrowUp,
  Sparkles,
  Heart,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: "Full Stack Development", href: "#services" },
      { name: "AI-Powered Automation", href: "#services" },
      { name: "Business Chatbots", href: "#services" },
      { name: "SaaS Development", href: "#services" },
      { name: "Mobile Apps", href: "#services" },
      { name: "Cloud Integration", href: "#services" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Services", href: "#services" },
      { name: "Projects", href: "#projects" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Meet the Founder", href: "#founder" },
      { name: "Contact", href: "#contact" }
    ],
    resources: [
      { name: "Blog", href: "#", external: true },
      { name: "Case Studies", href: "#", external: true },
      { name: "Documentation", href: "#", external: true },
      { name: "API Reference", href: "#", external: true },
      { name: "Support Center", href: "#", external: true },
      { name: "Privacy Policy", href: "#", external: true }
    ],
    technologies: [
      { name: "React & Next.js", href: "#" },
      { name: "NestJS & Node.js", href: "#" },
      { name: "MongoDB & PostgreSQL", href: "#" },
      { name: "OpenAI API", href: "#" },
      { name: "AWS & Cloud", href: "#" },
      { name: "Flutter & Mobile", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/nexflaretech", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/nexflaretech", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/nexflaretech", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/nexflaretech", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/nexflaretech", label: "Instagram" }
  ];

  const contactInfo = [
    { icon: Mail, text: "contact@nexflaretech.com", href: "mailto:contact@nexflaretech.com" },
    { icon: Phone, text: "+91 9876543210", href: "tel:+919876543210" },
    { icon: MapPin, text: "Chennai, Tamil Nadu, India", href: "#" }
  ];

  return (
    <footer className="bg-darker border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container-max">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-neon to-cyan-dark rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      NEXFLARE <span className="text-cyan-neon">TECH</span>
                    </h3>
                    <p className="text-xs text-gray-400">AI-Powered Solutions</p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Empowering businesses with intelligent, automated digital solutions. 
                  We bridge AI and innovation for a smarter future.
                </p>

                {/* Company Motto */}
                <div className="mb-6">
                  <p className="text-cyan-neon font-medium text-lg">
                    "Innovate. Automate. Accelerate."
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        className="flex items-center gap-3 text-gray-400 hover:text-cyan-neon transition-colors duration-300 group"
                      >
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm">{info.text}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-neon transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-neon transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-neon transition-colors duration-300 text-sm flex items-center gap-1"
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.name}
                        {link.external && <ExternalLink className="w-3 h-3" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-cyan-neon hover:text-dark transition-colors duration-300 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </motion.a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm placeholder-gray-400 focus:border-cyan-neon focus:outline-none w-48"
                />
                <button className="px-4 py-2 bg-cyan-neon text-dark rounded-r-lg hover:bg-cyan-dark transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="py-6 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© {currentYear} NEXFLARE TECH. All rights reserved.</span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500" /> in India
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-cyan-neon transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-neon transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cyan-neon transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-cyan-neon text-dark rounded-full flex items-center justify-center shadow-neon hover:shadow-neon-strong transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;

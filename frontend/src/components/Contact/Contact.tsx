"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Zap,
  CheckCircle
} from 'lucide-react';
import Button from '../shared/Button';
import AnimatedBackground from '../shared/AnimatedBackground';
import ParticleField from '../shared/ParticleField';
import CyberGrid from '../shared/CyberGrid';
import { ApiService, type ContactFormData as ApiContactFormData } from '../../lib/api';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Transform form data to match API interface
      const apiData: ApiContactFormData = {
        name: data.name,
        email: data.email,
        subject: `${data.service} - ${data.timeline}`,
        message: `${data.message}\n\nService: ${data.service}\nBudget: ${data.budget}\nTimeline: ${data.timeline}${data.company ? `\nCompany: ${data.company}` : ''}${data.phone ? `\nPhone: ${data.phone}` : ''}`,
        company: data.company,
        phone: data.phone,
        projectType: data.service,
        budget: data.budget,
      };

      const response = await ApiService.submitContactForm(apiData);
      
      if (response.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        reset();
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      // If backend is not available, show a fallback message
      console.error('Contact form error:', error);
      toast.error('Backend is currently unavailable. Please contact us directly at arsathprabu96@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "arsathprabu96@gmail.com",
      description: "Get in touch for project inquiries",
      action: "mailto:arsathprabu96@gmail.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 9500179062",
      description: "Speak directly with our team",
      action: "tel:+919500179062"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Tiruchirapalli, Tamil Nadu, India",
      description: "Schedule a meeting at our office",
      action: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-7PM IST",
      description: "We're here to help during business hours",
      action: "#"
    }
  ];

  const services = [
    "Full Stack Development",
    "AI-Powered Automation",
    "Business Chatbots",
    "SaaS Development",
    "Mobile App Development",
    "Cloud Integration",
    "Other"
  ];

  const budgetRanges = [
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+"
  ];

  const timelines = [
    "1-2 weeks",
    "1-2 months",
    "3-6 months",
    "6+ months"
  ];

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      {/* Background Graphics */}
      <AnimatedBackground variant="particles" intensity="medium" className="absolute inset-0" />
      <ParticleField count={45} variant="dots" className="absolute inset-0" />
      <CyberGrid intensity="low" animated className="absolute inset-0" />
      
      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary gradient-text mb-6 font-display text-glow">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with AI-powered solutions? Let&apos;s discuss your project 
            and explore how NEXFLARE TECH can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 text-glow">
                Let&apos;s Start a Conversation
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Whether you have a specific project in mind or just want to explore possibilities, 
                we&apos;re here to help. Reach out to us through any of the channels below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <a
                      href={info.action}
                      className="card-glass p-4 block hover-glow transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-neon to-cyan-dark rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 text-dark" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                          <p className="text-cyan-neon font-medium text-sm mb-1">{info.details}</p>
                          <p className="text-gray-400 text-xs">{info.description}</p>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="card-glass p-6">
              <h4 className="text-white font-semibold mb-4 text-glow">Quick Actions</h4>
              <div className="space-y-3">
                <button 
                  onClick={() => window.open('mailto:arsathprabu96@gmail.com?subject=Schedule a Call Request', '_blank')}
                  className="w-full flex items-center gap-3 p-3 bg-cyan-neon/10 rounded-lg text-cyan-neon hover:bg-cyan-neon/20 transition-colors duration-300"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Schedule a Call</span>
                </button>
                <button 
                  onClick={() => window.open('https://wa.me/919500179062', '_blank')}
                  className="w-full flex items-center gap-3 p-3 bg-green-500/10 rounded-lg text-green-400 hover:bg-green-500/20 transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-glow">
                Tell Us About Your Project
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-neon focus:outline-none transition-colors duration-300"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-neon focus:outline-none transition-colors duration-300"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Company and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      placeholder="Your company"
                      className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-neon focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-neon focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Service and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Service Needed *
                    </label>
                    <select
                      {...register('service')}
                      className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-cyan-neon focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Budget Range *
                    </label>
                    <select
                      {...register('budget')}
                      className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-cyan-neon focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="text-red-400 text-sm mt-1">{errors.budget.message}</p>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Project Timeline *
                  </label>
                  <select
                    {...register('timeline')}
                    className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-cyan-neon focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((timeline, index) => (
                      <option key={index} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                  {errors.timeline && (
                    <p className="text-red-400 text-sm mt-1">{errors.timeline.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell us about your project requirements, goals, and any specific features you have in mind..."
                    className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-neon focus:outline-none transition-colors duration-300 resize-vertical"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center gap-2 text-cyan-neon text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>We typically respond within 24 hours</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-neon text-sm mt-2">
                  <Zap className="w-4 h-4" />
                  <span>Free consultation and project estimation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

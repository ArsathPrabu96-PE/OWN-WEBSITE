import { useState, useEffect } from 'react';
import { ApiService, type ApiResponse } from '../lib/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  isActive: boolean;
  completedAt?: string;
  clientName?: string;
  metrics?: {
    performanceImprovement?: string;
    userGrowth?: string;
    efficiency?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface UseProjectsOptions {
  category?: string;
  featured?: boolean;
  autoFetch?: boolean;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (filters?: { category?: string; featured?: boolean }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getProjects(filters);
      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch projects');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Fallback to static data if API is not available
      setProjects(getStaticProjects());
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getFeaturedProjects();
      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch featured projects');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Fallback to static featured projects
      setProjects(getStaticProjects().filter(p => p.featured));
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectsByCategory = async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getProjectsByCategory(category);
      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch projects by category');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Fallback to static data filtered by category
      setProjects(getStaticProjects().filter(p => p.category === category));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.autoFetch !== false) {
      if (options.featured) {
        fetchFeaturedProjects();
      } else {
        fetchProjects({ category: options.category, featured: options.featured });
      }
    }
  }, [options.category, options.featured, options.autoFetch]);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    fetchFeaturedProjects,
    fetchProjectsByCategory,
    refetch: () => fetchProjects({ category: options.category, featured: options.featured }),
  };
}

// Static fallback data
function getStaticProjects(): Project[] {
  return [
    {
      _id: '1',
      title: "Spice-House Restaurant Menu Card ",
      description: "Local static single-page Restaurant Menu app built with vanilla JavaScript and Bootstrap.",
      longDescription: "Local static single-page Restaurant Menu app built with vanilla JavaScript and Bootstrap.",
      technologies: ["Next.js 14", "TypeScript", "TailwindCSS", "Prisma", "OpenAI", "Stripe"],
      category: "Full Stack",
      imageUrl: "/images/projects/ecommerce.jpg",
      githubUrl: "https://github.com/ArsathPrabu96-PE",
      liveUrl: "https://arsathprabu96-pe.github.io/Spice-House-_Restaurant_Menu/",
      featured: true,
      isActive: true,
      completedAt: "2024-03-15",
      clientName: "Spice House Restaurant",
      metrics: {
        performanceImprovement: "40% faster page loads",
        userGrowth: "125% increase in conversions",
        efficiency: "60% reduction in cart abandonment"
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-03-15T00:00:00Z"
    },
    {
      _id: '2',
      title: "NEXFLARE-Streaming",
      description: "A Netflix-like video-on-demand streaming platform built with modern web technologies, featuring user authentication, video streaming, and comprehensive content management.",
      longDescription: "A Netflix-like video-on-demand streaming platform built with modern web technologies, featuring user authentication, video streaming, and comprehensive content management.",
      technologies: ["Python", "FastAPI", "OpenAI", "React", "Socket.io", "MongoDB"],
      category: "Streaming APP",
      imageUrl: "/images/projects/chatbot.jpg",
      githubUrl: "https://github.com/ArsathPrabu96-PE",
      liveUrl: "https://nexflare-frontend.onrender.com",
      featured: true,
      isActive: true,
      completedAt: "2024-02-28",
      clientName: "NEXFLARE TECH",
      metrics: {
        performanceImprovement: "85% query resolution rate",
        userGrowth: "200% increase in customer satisfaction",
        efficiency: "70% reduction in support tickets"
      },
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-02-28T00:00:00Z"
    },
    {
      _id: '3',
      title: "Personal Portfolio ",
      description: "This update focuses on enhancing the user experience with more dynamic, interactive, and visually appealing elements. Key improvements include the implementation of 3D effects, engaging animations, and consistency fixes across the site.",
      longDescription: "This update focuses on enhancing the user experience with more dynamic, interactive, and visually appealing elements. Key improvements include the implementation of 3D effects, engaging animations, and consistency fixes across the site.",
      technologies: ["React", "Node.js", "PostgreSQL", "Express", "Material-UI", "JWT"],
      category: "Full Stack",
      imageUrl: "/images/projects/healthcare.jpg",
      githubUrl: "https://github.com/ArsathPrabu96-PE",
      liveUrl: "https://arsathprabu96-pe.github.io/To-Do-full-stack-app-/",
      featured: true,
      isActive: true,
      completedAt: "2024-01-20",
      clientName: "Task Management Solutions",
      metrics: {
        performanceImprovement: "50% faster patient processing",
        userGrowth: "150% increase in patient satisfaction",
        efficiency: "45% reduction in paperwork"
      },
      createdAt: "2023-11-01T00:00:00Z",
      updatedAt: "2024-01-20T00:00:00Z"
    },
    {
      _id: '4',
      title: "Live Weather App",
      description: "This is a minimal client-side weather app that uses the OpenWeatherMap API to show the current weather for a city or the user's current location.",
      longDescription: "This is a minimal client-side weather app that uses the OpenWeatherMap API to show the current weather for a city or the user's current location.",
      technologies: ["React Native", "TypeScript", "Firebase", "Node.js", "TensorFlow", "Expo"],
      category: "Full Stack",
      imageUrl: "/images/projects/fitness-app.jpg",
      githubUrl: "https://github.com/ArsathPrabu96-PE",
      liveUrl: "https://arsathprabu96-pe.github.io/Weather_App/",
      featured: true,
      isActive: true,
      completedAt: "2024-02-10",
      clientName: "Weather Solutions Inc.",
      metrics: {
        performanceImprovement: "95% user retention rate",
        userGrowth: "300% increase in daily active users",
        efficiency: "80% improvement in workout completion"
      },
      createdAt: "2023-12-01T00:00:00Z",
      updatedAt: "2024-02-10T00:00:00Z"
    },
    {
      _id: '5',
      title: "Personal Portfolio Website",
      description: "Modern responsive portfolio showcasing projects and professional experience.",
      longDescription: "A sleek and professional portfolio website built with modern web technologies, featuring responsive design, interactive elements, and optimized performance.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GitHub Pages"],
      category: "Full Stack",
      imageUrl: "/images/projects/portfolio.jpg",
      githubUrl: "https://github.com/ArsathPrabu96-PE",
      liveUrl: "https://arsathprabu96-pe.github.io/per_personav1/",
      featured: true,
      isActive: true,
      completedAt: "2024-01-05",
      clientName: "Personal Project",
      metrics: {
        performanceImprovement: "100% responsive design",
        userGrowth: "Professional online presence",
        efficiency: "Optimized for all devices"
      },
      createdAt: "2023-12-01T00:00:00Z",
      updatedAt: "2024-01-05T00:00:00Z"
    },
    {
      _id: '6',
      title: "My Trackers Analytics Dashboard",
      description: "Real-time analytics and tracking dashboard for monitoring user behavior, performance metrics, and business intelligence.",
      longDescription: "A comprehensive analytics dashboard that provides real-time tracking and monitoring capabilities with interactive charts, custom reports, and automated insights for data-driven decision making.",
      technologies: ["JavaScript", "Chart.js", "HTML5", "CSS3", "Local Storage", "Responsive Design"],
      category: "Data Analytics",
      imageUrl: "/images/projects/analytics.jpg",
      githubUrl: "https://github.com/ArsathPrabu96-PE",
      liveUrl: "https://arsathprabu96-pe.github.io/My_trackrs/",
      featured: true,
      isActive: true,
      completedAt: "2024-03-20",
      clientName: "Analytics Pro Solutions",
      metrics: {
        performanceImprovement: "65% faster data visualization",
        userGrowth: "180% increase in user engagement",
        efficiency: "55% improvement in decision speed"
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-03-20T00:00:00Z"
    }
  ];
}
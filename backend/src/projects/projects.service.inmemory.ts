import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  isActive: boolean;
  completedAt?: Date;
  clientName?: string;
  metrics?: {
    performanceImprovement?: string;
    userGrowth?: string;
    efficiency?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    // Sample projects for development
    {
      id: '1',
      title: 'AI-Powered E-Commerce Platform',
      description:
        'A modern e-commerce solution with AI-driven product recommendations',
      longDescription:
        'A comprehensive e-commerce platform built with Next.js and NestJS, featuring AI-powered product recommendations, advanced analytics, and real-time inventory management.',
      category: 'Web Development',
      technologies: ['Next.js', 'NestJS', 'MongoDB', 'TensorFlow', 'Redis'],
      imageUrl: '/projects/ecommerce-ai.jpg',
      githubUrl: 'https://github.com/nexflaretech/ai-ecommerce',
      liveUrl: 'https://demo-ecommerce.nexflaretech.com',
      featured: true,
      isActive: true,
      completedAt: new Date('2024-09-15'),
      createdAt: new Date('2024-08-01'),
      updatedAt: new Date('2024-09-15'),
      clientName: 'TechCorp Solutions',
      metrics: {
        performanceImprovement: '40% faster load times',
        userGrowth: '150% increase in conversions',
        efficiency: '60% reduction in support tickets',
      },
    },
    {
      id: '2',
      title: 'Business Process Automation Suite',
      description:
        'Complete automation solution for business workflows and processes',
      longDescription:
        'An enterprise-grade automation suite that streamlines business processes, automates repetitive tasks, and provides comprehensive analytics and reporting.',
      category: 'Automation',
      technologies: ['Python', 'React', 'FastAPI', 'PostgreSQL', 'Celery'],
      imageUrl: '/projects/automation-suite.jpg',
      liveUrl: 'https://demo-automation.nexflaretech.com',
      featured: true,
      isActive: true,
      completedAt: new Date('2024-08-30'),
      createdAt: new Date('2024-07-15'),
      updatedAt: new Date('2024-08-30'),
      clientName: 'Manufacturing Inc',
      metrics: {
        performanceImprovement: '70% process efficiency',
        userGrowth: '200% task completion rate',
        efficiency: '50% time savings',
      },
    },
    {
      id: '3',
      title: 'Intelligent Customer Support Chatbot',
      description:
        'AI-powered chatbot for 24/7 customer support with natural language processing',
      longDescription:
        'An advanced chatbot solution using natural language processing to provide intelligent customer support, handle inquiries, and escalate complex issues to human agents.',
      category: 'AI/ML',
      technologies: ['Python', 'OpenAI GPT', 'React', 'Node.js', 'WebSocket'],
      imageUrl: '/projects/chatbot-ai.jpg',
      liveUrl: 'https://demo-chatbot.nexflaretech.com',
      featured: false,
      isActive: true,
      completedAt: new Date('2024-10-01'),
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-10-01'),
      clientName: 'ServiceHub Ltd',
      metrics: {
        performanceImprovement: '85% query resolution',
        userGrowth: '90% customer satisfaction',
        efficiency: '24/7 availability',
      },
    },
  ];

  constructor() {
    console.log('ProjectsService initialized with in-memory storage');
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject: Project = {
      id: Date.now().toString(),
      ...createProjectDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: createProjectDto.isActive ?? true,
      featured: createProjectDto.featured ?? false,
      completedAt: createProjectDto.completedAt
        ? new Date(createProjectDto.completedAt)
        : undefined,
    };
    this.projects.push(newProject);
    return newProject;
  }

  async findAll(filters?: {
    category?: string;
    featured?: boolean;
  }): Promise<Project[]> {
    let filtered = this.projects.filter((p) => p.isActive);

    if (filters?.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters?.featured !== undefined) {
      filtered = filtered.filter((p) => p.featured === filters.featured);
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projects.find((p) => p.id === id && p.isActive) || null;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    const projectIndex = this.projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const updatedData = {
      ...updateProjectDto,
      updatedAt: new Date(),
      completedAt: updateProjectDto.completedAt
        ? new Date(updateProjectDto.completedAt)
        : this.projects[projectIndex].completedAt,
    };

    this.projects[projectIndex] = {
      ...this.projects[projectIndex],
      ...updatedData,
    };

    return this.projects[projectIndex];
  }

  async remove(id: string): Promise<void> {
    const projectIndex = this.projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    this.projects.splice(projectIndex, 1);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projects
      .filter((p) => p.featured && p.isActive)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return this.projects
      .filter((p) => p.category === category && p.isActive)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  async getProjectStats(): Promise<{
    total: number;
    featured: number;
    byCategory: { [key: string]: number };
  }> {
    const activeProjects = this.projects.filter((p) => p.isActive);
    const total = activeProjects.length;
    const featured = activeProjects.filter((p) => p.featured).length;

    const byCategory = activeProjects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {});

    return { total, featured, byCategory };
  }
}

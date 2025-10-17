import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  private fallbackProjects: any[] = [
    {
      _id: '1',
      title: 'AI-Powered E-Commerce Platform',
      description: 'A modern e-commerce solution with AI-driven product recommendations',
      longDescription: 'A comprehensive e-commerce platform built with Next.js and NestJS, featuring AI-powered product recommendations, advanced analytics, and real-time inventory management.',
      category: 'Web Development',
      technologies: ['Next.js', 'NestJS', 'MongoDB', 'TensorFlow', 'Redis'],
      imageUrl: '/projects/ecommerce-ai.jpg',
      githubUrl: 'https://github.com/nexflaretech/ai-ecommerce',
      liveUrl: 'https://demo-ecommerce.nexflaretech.com',
      featured: true,
      isActive: true,
      completedAt: new Date('2024-09-15'),
      clientName: 'TechCorp Solutions',
      metrics: {
        performanceImprovement: '40% faster load times',
        userGrowth: '150% increase in conversions',
        efficiency: '60% reduction in support tickets',
      },
    },
    {
      _id: '2',
      title: 'Smart Automation Dashboard',
      description: 'Business process automation with intelligent workflows',
      longDescription: 'An intelligent automation platform that streamlines business processes with smart workflows and real-time monitoring.',
      category: 'Automation',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      imageUrl: '/projects/automation-dashboard.jpg',
      githubUrl: 'https://github.com/nexflaretech/smart-automation',
      liveUrl: 'https://automation.nexflaretech.com',
      featured: true,
      isActive: true,
      completedAt: new Date('2024-08-20'),
      clientName: 'InnovateCorp',
    },
    {
      _id: '3',
      title: 'AI Chatbot Framework',
      description: 'Intelligent customer support chatbot with NLP capabilities',
      longDescription: 'A sophisticated chatbot framework with natural language processing for enhanced customer interactions.',
      category: 'AI/ML',
      technologies: ['Python', 'TensorFlow', 'Flask', 'MongoDB'],
      imageUrl: '/projects/ai-chatbot.jpg',
      githubUrl: 'https://github.com/nexflaretech/ai-chatbot',
      liveUrl: 'https://chatbot.nexflaretech.com',
      featured: false,
      isActive: true,
      completedAt: new Date('2024-07-10'),
      clientName: 'ServiceTech Ltd',
    }
  ];

  private useDatabase = false;

  constructor(
    @InjectModel('Project') private projectModel: Model<ProjectDocument>,
  ) {
    console.log('ProjectsService initialized');
    this.initializeService();
  }

  private async initializeService() {
    try {
      // Try to connect to MongoDB
      await this.projectModel.countDocuments();
      this.useDatabase = true;
      console.log('ProjectsService using MongoDB');
      await this.seedProjects();
    } catch (error) {
      console.log('ProjectsService using fallback data (MongoDB not available)');
      this.useDatabase = false;
    }
  }

  // Seed the database with sample projects if empty
  private async seedProjects() {
    try {
      const count = await this.projectModel.countDocuments();
      if (count === 0) {
        console.log('Seeding database with sample projects...');
        await this.projectModel.insertMany([
          {
            title: 'AI-Powered E-Commerce Platform',
            description:
              'A modern e-commerce solution with AI-driven product recommendations',
            longDescription:
              'A comprehensive e-commerce platform built with Next.js and NestJS, featuring AI-powered product recommendations, advanced analytics, and real-time inventory management.',
            category: 'Web Development',
            technologies: [
              'Next.js',
              'NestJS',
              'MongoDB',
              'TensorFlow',
              'Redis',
            ],
            imageUrl: '/projects/ecommerce-ai.jpg',
            githubUrl: 'https://github.com/nexflaretech/ai-ecommerce',
            liveUrl: 'https://demo-ecommerce.nexflaretech.com',
            featured: true,
            isActive: true,
            completedAt: new Date('2024-09-15'),
            clientName: 'TechCorp Solutions',
            metrics: {
              performanceImprovement: '40% faster load times',
              userGrowth: '150% increase in conversions',
              efficiency: '60% reduction in support tickets',
            },
          },
          {
            title: 'Business Process Automation Suite',
            description:
              'Complete automation solution for business workflows and processes',
            longDescription:
              'An enterprise-grade automation suite that streamlines business processes, automates repetitive tasks, and provides comprehensive analytics and reporting.',
            category: 'Automation',
            technologies: [
              'Python',
              'React',
              'FastAPI',
              'PostgreSQL',
              'Celery',
            ],
            imageUrl: '/projects/automation-suite.jpg',
            liveUrl: 'https://demo-automation.nexflaretech.com',
            featured: true,
            isActive: true,
            completedAt: new Date('2024-08-30'),
            clientName: 'Manufacturing Inc',
            metrics: {
              performanceImprovement: '70% process efficiency',
              userGrowth: '200% task completion rate',
              efficiency: '50% time savings',
            },
          },
          {
            title: 'Intelligent Customer Support Chatbot',
            description:
              'AI-powered chatbot for 24/7 customer support with natural language processing',
            longDescription:
              'An advanced chatbot solution using natural language processing to provide intelligent customer support, handle inquiries, and escalate complex issues to human agents.',
            category: 'AI/ML',
            technologies: [
              'Python',
              'OpenAI GPT',
              'React',
              'Node.js',
              'WebSocket',
            ],
            imageUrl: '/projects/chatbot-ai.jpg',
            liveUrl: 'https://demo-chatbot.nexflaretech.com',
            featured: false,
            isActive: true,
            completedAt: new Date('2024-10-01'),
            clientName: 'ServiceHub Ltd',
            metrics: {
              performanceImprovement: '85% query resolution',
              userGrowth: '90% customer satisfaction',
              efficiency: '24/7 availability',
            },
          },
        ]);
        console.log('Sample projects seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding projects:', error);
    }
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel({
      ...createProjectDto,
      completedAt: createProjectDto.completedAt
        ? new Date(createProjectDto.completedAt)
        : undefined,
    });
    return createdProject.save();
  }

  async findAll(filters?: {
    category?: string;
    featured?: boolean;
  }): Promise<Project[]> {
    if (!this.useDatabase) {
      // Use fallback data
      let projects = [...this.fallbackProjects];
      
      if (filters?.category) {
        projects = projects.filter(p => p.category === filters.category);
      }
      
      if (filters?.featured !== undefined) {
        projects = projects.filter(p => p.featured === filters.featured);
      }
      
      return projects;
    }

    const query: any = { isActive: true };

    if (filters?.category) {
      query.category = filters.category;
    }

    if (filters?.featured !== undefined) {
      query.featured = filters.featured;
    }

    return this.projectModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Project | null> {
    if (!this.useDatabase) {
      return this.fallbackProjects.find(p => p._id === id) || null;
    }
    return this.projectModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    const project = await this.projectModel
      .findByIdAndUpdate(
        id,
        {
          ...updateProjectDto,
          completedAt: updateProjectDto.completedAt
            ? new Date(updateProjectDto.completedAt)
            : undefined,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async getFeaturedProjects(): Promise<Project[]> {
    if (!this.useDatabase) {
      return this.fallbackProjects.filter(p => p.featured).slice(0, 6);
    }
    return this.projectModel
      .find({ featured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .exec();
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    if (!this.useDatabase) {
      return this.fallbackProjects.filter(p => p.category === category);
    }
    return this.projectModel
      .find({ category, isActive: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getProjectStats(): Promise<{
    total: number;
    featured: number;
    byCategory: { [key: string]: number };
  }> {
    const total = await this.projectModel.countDocuments({ isActive: true });
    const featured = await this.projectModel.countDocuments({
      featured: true,
      isActive: true,
    });

    const categoryStats = await this.projectModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const byCategory = categoryStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    return { total, featured, byCategory };
  }
}

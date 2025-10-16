import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(filters?: { category?: string; featured?: boolean }): Promise<Project[]> {
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
    return this.projectModel.findById(id).exec();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project | null> {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      { new: true }
    ).exec();
    
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
    return this.projectModel
      .find({ featured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .exec();
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
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
    const featured = await this.projectModel.countDocuments({ featured: true, isActive: true });
    
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
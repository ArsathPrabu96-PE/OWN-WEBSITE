import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    try {
      const project = await this.projectsService.create(createProjectDto);
      return {
        success: true,
        message: 'Project created successfully',
        data: project,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create project');
    }
  }

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('featured') featured?: string,
  ) {
    try {
      const filters: any = {};
      
      if (category) {
        filters.category = category;
      }
      
      if (featured !== undefined) {
        filters.featured = featured === 'true';
      }

      const projects = await this.projectsService.findAll(filters);
      return {
        success: true,
        message: 'Projects retrieved successfully',
        data: projects,
        count: projects.length,
      };
    } catch (error) {
      throw new BadRequestException('Failed to retrieve projects');
    }
  }

  @Get('featured')
  async getFeatured() {
    try {
      const projects = await this.projectsService.getFeaturedProjects();
      return {
        success: true,
        message: 'Featured projects retrieved successfully',
        data: projects,
        count: projects.length,
      };
    } catch (error) {
      throw new BadRequestException('Failed to retrieve featured projects');
    }
  }

  @Get('stats')
  async getStats() {
    try {
      const stats = await this.projectsService.getProjectStats();
      return {
        success: true,
        message: 'Project statistics retrieved successfully',
        data: stats,
      };
    } catch (error) {
      throw new BadRequestException('Failed to retrieve project statistics');
    }
  }

  @Get('category/:category')
  async getByCategory(@Param('category') category: string) {
    try {
      const projects = await this.projectsService.getProjectsByCategory(category);
      return {
        success: true,
        message: `Projects in ${category} category retrieved successfully`,
        data: projects,
        count: projects.length,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to retrieve projects for category: ${category}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const project = await this.projectsService.findOne(id);
      if (!project) {
        throw new BadRequestException('Project not found');
      }
      return {
        success: true,
        message: 'Project retrieved successfully',
        data: project,
      };
    } catch (error) {
      throw new BadRequestException('Failed to retrieve project');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectsService.update(id, updateProjectDto);
      return {
        success: true,
        message: 'Project updated successfully',
        data: project,
      };
    } catch (error) {
      throw new BadRequestException('Failed to update project');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.projectsService.remove(id);
      return {
        success: true,
        message: 'Project deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete project');
    }
  }
}
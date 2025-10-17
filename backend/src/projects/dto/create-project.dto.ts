import {
  IsString,
  IsArray,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsDateString,
  IsObject,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  longDescription: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsString()
  category: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsObject()
  metrics?: {
    performanceImprovement?: string;
    userGrowth?: string;
    efficiency?: string;
  };
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  longDescription: string;

  @Prop({ required: true, type: [String] })
  technologies: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  githubUrl?: string;

  @Prop()
  liveUrl?: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  completedAt?: Date;

  @Prop()
  clientName?: string;

  @Prop({ type: Object })
  metrics?: {
    performanceImprovement?: string;
    userGrowth?: string;
    efficiency?: string;
  };
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

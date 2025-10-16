import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    description: 'Full name of the contact person',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'Email address of the contact person',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Company name (optional)',
    example: 'Acme Corporation',
    required: false,
  })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({
    description: 'Phone number (optional)',
    example: '+1 (555) 123-4567',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Type of service requested',
    example: 'Full Stack Development',
  })
  @IsNotEmpty()
  @IsString()
  service: string;

  @ApiProperty({
    description: 'Budget range for the project',
    example: '$10,000 - $25,000',
  })
  @IsNotEmpty()
  @IsString()
  budget: string;

  @ApiProperty({
    description: 'Expected timeline for the project',
    example: '3-6 months',
  })
  @IsNotEmpty()
  @IsString()
  timeline: string;

  @ApiProperty({
    description: 'Detailed message about the project',
    example: 'We need a modern e-commerce platform with AI features...',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  message: string;
}
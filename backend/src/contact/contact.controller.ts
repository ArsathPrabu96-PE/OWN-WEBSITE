import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new contact form' })
  @ApiResponse({
    status: 201,
    description: 'Contact form submitted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async create(@Body(ValidationPipe) createContactDto: CreateContactDto) {
    try {
      const contact = await this.contactService.create(createContactDto);
      return {
        success: true,
        message: 'Contact form submitted successfully',
        data: contact,
      };
    } catch (error) {
      console.error('Contact creation error:', error);
      throw new HttpException(
        'Failed to submit contact form',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all contact submissions (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all contact submissions',
  })
  async findAll() {
    try {
      const contacts = await this.contactService.findAll();
      return {
        success: true,
        data: contacts,
      };
    } catch (error) {
      console.error('Contact retrieval error:', error);
      throw new HttpException(
        'Failed to retrieve contacts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get contact statistics (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Contact statistics',
  })
  async getStats() {
    try {
      const stats = await this.contactService.getStats();
      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      console.error('Contact stats error:', error);
      throw new HttpException(
        'Failed to retrieve statistics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific contact submission by ID' })
  @ApiParam({ name: 'id', description: 'Contact ID' })
  @ApiResponse({
    status: 200,
    description: 'Contact submission details',
  })
  @ApiResponse({
    status: 404,
    description: 'Contact not found',
  })
  async findOne(@Param('id') id: string) {
    try {
      const contact = await this.contactService.findOne(id);
      if (!contact) {
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        data: contact,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve contact',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update contact status (Admin only)' })
  @ApiParam({ name: 'id', description: 'Contact ID' })
  @ApiResponse({
    status: 200,
    description: 'Contact status updated successfully',
  })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    try {
      const contact = await this.contactService.updateStatus(id, status);
      if (!contact) {
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'Status updated successfully',
        data: contact,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact submission (Admin only)' })
  @ApiParam({ name: 'id', description: 'Contact ID' })
  @ApiResponse({
    status: 200,
    description: 'Contact deleted successfully',
  })
  async remove(@Param('id') id: string) {
    try {
      const contact = await this.contactService.remove(id);
      if (!contact) {
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'Contact deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete contact',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

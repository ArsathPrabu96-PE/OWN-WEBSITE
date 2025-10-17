import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { EmailService } from './email.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private contactModel: Model<ContactDocument>,
    private emailService: EmailService,
  ) {
    console.log('ContactService initialized with MongoDB');
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const createdContact = new this.contactModel(createContactDto);
      const savedContact = await createdContact.save();

      // Send notification emails
      try {
        await Promise.all([
          this.emailService.sendContactNotification(createContactDto),
          this.emailService.sendAutoReply(createContactDto),
        ]);
      } catch (error) {
        console.error('Failed to send email notifications:', error);
        // Don't throw error here as the contact was saved successfully
      }

      return savedContact;
    } catch (error) {
      console.error('Failed to save contact:', error);
      throw error;
    }
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Contact | null> {
    return this.contactModel.findById(id).exec();
  }

  async updateStatus(id: string, status: string): Promise<Contact | null> {
    return this.contactModel
      .findByIdAndUpdate(id, { status, updatedAt: new Date() }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Contact | null> {
    return this.contactModel.findByIdAndDelete(id).exec();
  }

  async getStats(): Promise<any> {
    const total = await this.contactModel.countDocuments().exec();
    const thisMonth = await this.contactModel
      .countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      })
      .exec();

    const statusCounts = await this.contactModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      total,
      thisMonth,
      statusCounts,
    };
  }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_SECURE'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendContactNotification(contactData: any): Promise<void> {
    const { name, email, company, phone, service, budget, timeline, message } =
      contactData;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #0D1117 0%, #161B22 100%); padding: 30px; border-radius: 10px; color: white;">
          <h1 style="color: #00FFFF; margin-bottom: 20px; text-align: center;">
            🚀 New Contact Form Submission - NEXFLARE TECH
          </h1>
          
          <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00FFFF; margin-bottom: 15px;">Contact Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #00FFFF;">${email}</a></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}" style="color: #00FFFF;">${phone}</a></p>` : ''}
          </div>

          <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00FFFF; margin-bottom: 15px;">Project Details</h2>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px;">
            <h2 style="color: #00FFFF; margin-bottom: 15px;">Message</h2>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 255, 255, 0.2);">
            <p style="color: #888; font-size: 14px;">
              Received on ${new Date().toLocaleString()}
            </p>
            <p style="color: #00FFFF; font-weight: bold; margin-top: 10px;">
              NEXFLARE TECH - Innovate. Automate. Accelerate.
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: this.configService.get<string>('FROM_EMAIL'),
      to: 'arsathprabu96@gmail.com',
      subject: `🚀 New Contact Form Submission from ${name}`,
      html: htmlContent,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendAutoReply(contactData: any): Promise<void> {
    const { name, email } = contactData;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #0D1117 0%, #161B22 100%); padding: 30px; border-radius: 10px; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00FFFF; margin-bottom: 10px;">NEXFLARE TECH</h1>
            <p style="color: #888; font-size: 14px;">AI-Powered Software & Automation Solutions</p>
          </div>

          <h2 style="color: #00FFFF; margin-bottom: 20px;">Thank You for Contacting Us!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to NEXFLARE TECH! We've received your message and our team will review it carefully.</p>
          
          <div style="background: rgba(0, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00FFFF;">
            <h3 style="color: #00FFFF; margin-bottom: 15px;">What Happens Next?</h3>
            <ul style="line-height: 1.8;">
              <li>Our team will review your project requirements within 24 hours</li>
              <li>We'll prepare a detailed proposal and timeline for your project</li>
              <li>You'll receive a follow-up email with next steps</li>
              <li>We may schedule a call to discuss your project in detail</li>
            </ul>
          </div>

          <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #00FFFF; margin-bottom: 15px;">In the Meantime</h3>
            <p>Feel free to explore our services and previous work:</p>
            <ul style="line-height: 1.8;">
              <li><a href="https://nexflaretech.com#services" style="color: #00FFFF;">Our Services</a></li>
              <li><a href="https://nexflaretech.com#projects" style="color: #00FFFF;">Portfolio & Case Studies</a></li>
              <li><a href="https://nexflaretech.com#about" style="color: #00FFFF;">About Our Team</a></li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 255, 255, 0.2);">
            <p style="color: #888; margin-bottom: 10px;">Need immediate assistance?</p>
            <p>
              <a href="mailto:arsathprabu96@gmail.com" style="color: #00FFFF; text-decoration: none;">
                📧 arsathprabu96@gmail.com
              </a> | 
              <a href="tel:+919500179062" style="color: #00FFFF; text-decoration: none;">
                📞 +91 9500179062
              </a>
            </p>
            <p style="color: #00FFFF; font-weight: bold; margin-top: 15px;">
              Innovate. Automate. Accelerate.
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: this.configService.get<string>('FROM_EMAIL'),
      to: email,
      subject:
        "🚀 Thank you for contacting NEXFLARE TECH - We'll be in touch soon!",
      html: htmlContent,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

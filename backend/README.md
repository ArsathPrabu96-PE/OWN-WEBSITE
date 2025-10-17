# ⚡ NEXFLARE TECH - Backend API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)

**Robust Backend API for AI-Powered Business Solutions**

</div>

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [📊 API Endpoints](#-api-endpoints)
- [🗄️ Database Schema](#️-database-schema)
- [📧 Email Service](#-email-service)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)

## 🎯 Project Overview

The NEXFLARE TECH backend is a robust NestJS API application that powers our business website. Built with modern Node.js technologies, it provides secure and scalable endpoints for project management, contact form handling, and business data services.

### Key Highlights
- **NestJS Framework**: Enterprise-grade Node.js framework
- **TypeScript**: Full type safety and modern JavaScript features
- **MongoDB Integration**: NoSQL database with Mongoose ODM
- **Email Services**: Automated email notifications and responses
- **API Documentation**: Auto-generated Swagger documentation
- **Validation**: Comprehensive request/response validation

## ✨ Features

### 🔧 Core Functionality
- **Project Management**: CRUD operations for portfolio projects
- **Contact Forms**: Handle client inquiries with email notifications
- **Data Validation**: Automatic request/response validation
- **Error Handling**: Comprehensive error management
- **CORS Support**: Cross-origin resource sharing configuration

### 📊 API Features
- **RESTful Design**: Standard HTTP methods and status codes
- **Swagger Documentation**: Interactive API documentation
- **Health Checks**: Service health monitoring endpoints
- **Rate Limiting**: API request rate limiting (future)
- **Authentication**: JWT-based authentication (future)

### 📧 Email Integration
- **Gmail SMTP**: Secure email sending via Gmail
- **HTML Templates**: Beautiful responsive email templates
- **Contact Notifications**: Instant client inquiry notifications
- **Auto-responses**: Automated confirmation emails

## 🛠️ Tech Stack

### Core Technologies
- **[NestJS 11.0](https://nestjs.com/)** - Progressive Node.js framework
- **[Node.js 18+](https://nodejs.org/)** - JavaScript runtime
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database

### Database & ODM
- **[Mongoose 8.0](https://mongoosejs.com/)** - MongoDB object modeling
- **[Class Validator](https://github.com/typestack/class-validator)** - Validation decorators
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Object transformation

### Email & Communication
- **[Nodemailer](https://nodemailer.com/)** - Email sending service
- **Gmail SMTP** - Secure email delivery
- **HTML Templates** - Rich email formatting

### Development Tools
- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation
- **[Jest](https://jestjs.io/)** - Testing framework
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn 1.22+
- MongoDB 7+ (local or cloud)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ArsathPrabu96-PE/NexFlare-Streaming.git
cd NexFlare-Streaming/backend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Configure your environment variables:
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/nexflare

# Server
PORT=3001
NODE_ENV=development

# Email Service
FROM_EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Security
CORS_ORIGIN=http://localhost:3000
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud database
```

5. **Start development server**
```bash
npm run start:dev
# or
yarn start:dev
```

6. **Access the API**
- **API Base**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api
- **Health Check**: http://localhost:3001

### Available Scripts

```bash
# Development
npm run start:dev      # Start in watch mode
npm run start:debug    # Start in debug mode

# Production
npm run build          # Build the application
npm run start:prod     # Start production server

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.controller.ts       # Main app controller
│   ├── app.module.ts          # Root application module
│   ├── app.service.ts         # Main app service
│   ├── main.ts                # Application entry point
│   │
│   ├── contact/               # Contact module
│   │   ├── contact.controller.ts
│   │   ├── contact.module.ts
│   │   ├── contact.service.ts
│   │   ├── email.service.ts
│   │   ├── dto/
│   │   │   └── create-contact.dto.ts
│   │   └── schemas/
│   │       └── contact.schema.ts
│   │
│   └── projects/              # Projects module
│       ├── projects.controller.ts
│       ├── projects.module.ts
│       ├── projects.service.ts
│       ├── dto/
│       │   ├── create-project.dto.ts
│       │   └── update-project.dto.ts
│       └── schemas/
│           └── project.schema.ts
│
├── test/                      # Test files
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env                       # Environment variables
├── nest-cli.json             # NestJS CLI configuration
├── package.json              # Dependencies
└── tsconfig.json            # TypeScript configuration
```

## 📊 API Endpoints

### Health Check
```
GET /                         # API health check
```

### Projects
```
GET /projects                 # Get all projects
GET /projects/:id             # Get project by ID
POST /projects               # Create new project (admin)
PUT /projects/:id            # Update project (admin)
DELETE /projects/:id         # Delete project (admin)
```

### Contact
```
POST /contact                # Submit contact form
GET /contact                 # Get all contacts (admin)
GET /contact/:id             # Get contact by ID (admin)
```

### API Documentation
```
GET /api                     # Swagger documentation
GET /api-json               # OpenAPI JSON schema
```

## 🗄️ Database Schema

### Project Schema
```typescript
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  fullDescription?: string;

  @Prop({ required: true })
  category: string;

  @Prop([String])
  technologies: string[];

  @Prop([String])
  features?: string[];

  @Prop()
  demoUrl?: string;

  @Prop()
  githubUrl?: string;

  @Prop({ required: true })
  image: string;

  @Prop([String])
  gallery?: string[];

  @Prop({ default: false })
  featured: boolean;

  @Prop()
  completedAt?: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}
```

### Contact Schema
```typescript
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  service?: string;

  @Prop()
  budget?: string;

  @Prop()
  timeline?: string;

  @Prop()
  company?: string;

  @Prop()
  phone?: string;

  @Prop({ enum: ['new', 'contacted', 'completed'], default: 'new' })
  status: string;

  @Prop({ default: Date.now })
  submittedAt: Date;

  @Prop()
  respondedAt?: Date;

  @Prop()
  notes?: string;
}
```

## 📧 Email Service

### Gmail SMTP Configuration
```typescript
// Email service configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASSWORD, // App password
  },
});
```

### Email Templates
The service includes responsive HTML email templates with:
- **Company Branding**: NEXFLARE logo and colors
- **Contact Information**: Embedded contact details
- **Responsive Design**: Mobile-friendly layouts
- **Professional Styling**: Cyberpunk-themed design

### Email Features
- **Instant Notifications**: Real-time contact form alerts
- **Auto-responses**: Confirmation emails to clients
- **HTML Formatting**: Rich text with images and styling
- **Error Handling**: Robust email delivery management

## 🧪 Testing

### Unit Tests
```bash
npm run test                 # Run all unit tests
npm run test:watch          # Watch mode
npm run test:cov            # Coverage report
```

### E2E Tests
```bash
npm run test:e2e            # Run end-to-end tests
```

### Test Structure
```
test/
├── app.e2e-spec.ts        # Application E2E tests
├── contact.e2e-spec.ts    # Contact module E2E tests
├── projects.e2e-spec.ts   # Projects module E2E tests
└── jest-e2e.json          # E2E Jest configuration
```

### Testing Best Practices
- **Comprehensive Coverage**: Aim for 90%+ test coverage
- **Mocked Dependencies**: Mock external services
- **Integration Tests**: Test complete user flows
- **Database Testing**: Use test database instances

## 🚢 Deployment

### Railway Deployment (Recommended)

1. **Connect Repository**
   - Import project to Railway
   - Set root directory to `backend`
   - Configure build settings

2. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nexflare
   FROM_EMAIL=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```

3. **Build Configuration**
   ```
   Build Command: npm run build
   Start Command: npm run start:prod
   ```

### Alternative Deployment Options
- **Heroku**: Container or buildpack deployment
- **AWS EC2**: Virtual machine deployment
- **DigitalOcean**: Droplet deployment
- **Google Cloud**: App Engine deployment

### Production Optimizations
- **Process Management**: PM2 for process management
- **Monitoring**: Health checks and error tracking
- **Logging**: Structured logging with Winston
- **Security**: Helmet.js security headers

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "run", "start:prod"]
```

---

<div align="center">

**Backend API**

⚡ **Built with**: NestJS + TypeScript + MongoDB  
🔧 **Powered by**: Node.js + Mongoose  
🚀 **Hosted on**: Railway  

📧 **Contact**: arsathprabu96@gmail.com  
🌐 **Live API**: https://nexflare-api.railway.app  
📖 **Docs**: https://nexflare-api.railway.app/api

</div>

---

*This project was created with the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.*

*Last Updated: October 16, 2025*  
*© 2025 NEXFLARE TECH. All rights reserved.*
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

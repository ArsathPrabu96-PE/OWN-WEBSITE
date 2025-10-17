# 🚀 NEXFLARE TECH - Deployment Guide

<div align="center">

![Deployment Guide](https://img.shields.io/badge/NEXFLARE-Deployment%20Guide-00FFFF?style=for-the-badge)

**Complete Production Deployment Instructions**

</div>

## 📋 Table of Contents

- [🎯 Deployment Overview](#-deployment-overview)
- [🔧 Prerequisites](#-prerequisites)
- [🌐 Frontend Deployment (Vercel)](#-frontend-deployment-vercel)
- [⚡ Backend Deployment (Railway)](#-backend-deployment-railway)
- [🗄️ Database Setup (MongoDB Atlas)](#️-database-setup-mongodb-atlas)
- [📧 Email Service Configuration](#-email-service-configuration)
- [🔐 Environment Variables](#-environment-variables)
- [🌍 Domain Configuration](#-domain-configuration)
- [📊 Monitoring & Analytics](#-monitoring--analytics)
- [🔄 CI/CD Pipeline](#-cicd-pipeline)
- [🛠️ Troubleshooting](#️-troubleshooting)

## 🎯 Deployment Overview

This guide covers the complete deployment process for the NEXFLARE TECH application, including frontend, backend, database, and all necessary services for production use.

### Architecture Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Vercel)      │────│   (Railway)     │────│ (MongoDB Atlas) │
│   Next.js App   │    │   NestJS API    │    │   Cloud DB      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   CDN & Cache   │    │ Email Service   │    │   File Storage  │
    │   (Vercel)      │    │   (Gmail)       │    │   (Railway)     │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Deployment Platforms
- **Frontend**: Vercel (Recommended) or Netlify
- **Backend**: Railway (Recommended) or Heroku
- **Database**: MongoDB Atlas (Cloud)
- **Email**: Gmail SMTP or SendGrid
- **File Storage**: Railway Volumes or AWS S3

## 🔧 Prerequisites

### Required Accounts
- [ ] GitHub account with repository access
- [ ] Vercel account (free tier available)
- [ ] Railway account (free tier available)
- [ ] MongoDB Atlas account (free tier available)
- [ ] Gmail account for email service

### Local Development Setup
- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] Git version control
- [ ] Code editor (VS Code recommended)

### Domain Requirements (Optional)
- [ ] Custom domain name
- [ ] DNS management access
- [ ] SSL certificate (automatic with Vercel/Railway)

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Repository

1. **Ensure Clean Repository**
```bash
# Navigate to project root
cd your-project

# Check repository status
git status

# Commit any pending changes
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Verify Build Process**
```bash
cd frontend
npm install
npm run build
npm start
```

### Step 2: Deploy to Vercel

1. **Connect GitHub to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/in with GitHub
   - Import your repository
   - Select the `frontend` folder as root directory

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

### Step 3: Verify Deployment

1. **Check Build Logs**
   - Monitor deployment progress in Vercel dashboard
   - Review build logs for any errors
   - Ensure all dependencies are installed correctly

2. **Test Deployed Site**
   - Visit the provided Vercel URL
   - Test all functionality
   - Check responsive design on mobile devices
   - Verify all API connections work

### Vercel Configuration File

Create `vercel.json` in frontend root:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

## ⚡ Backend Deployment (Railway)

### Step 1: Prepare Backend

1. **Update Dependencies**
```bash
cd backend
npm install
npm audit fix
npm run build
```

2. **Create Railway Configuration**

Create `railway.toml`:
```toml
[build]
builder = "NIXPACKS"

[deploy]
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Step 2: Deploy to Railway

1. **Connect Repository**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create new project
   - Connect GitHub repository
   - Select backend folder

2. **Configure Build Settings**
   ```
   Root Directory: backend
   Build Command: npm run build
   Start Command: npm run start:prod
   ```

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexflare
   FROM_EMAIL=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

### Step 3: Configure Railway Services

1. **Add MongoDB Database**
   - Add MongoDB service in Railway dashboard
   - Or use MongoDB Atlas connection string
   - Configure connection pooling

2. **Set up Health Checks**
   - Configure health check endpoint: `/`
   - Set appropriate timeout values
   - Enable restart on failure

### Railway Dockerfile (Optional)

Create `Dockerfile` in backend root:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
```

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

1. **Sign up for MongoDB Atlas**
   - Visit [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create free account
   - Choose free tier (M0 Sandbox)

2. **Configure Cluster**
   ```
   Cloud Provider: AWS
   Region: US East (N. Virginia)
   Cluster Tier: M0 Sandbox (Free)
   Cluster Name: nexflare-cluster
   ```

3. **Set up Database User**
   ```
   Username: nexflare-admin
   Password: [Generate secure password]
   Role: Atlas Admin
   ```

4. **Configure Network Access**
   ```
   IP Whitelist: 0.0.0.0/0 (Allow access from anywhere)
   Or add specific Railway IP addresses
   ```

### Step 2: Connect Database

1. **Get Connection String**
   ```
   mongodb+srv://nexflare-admin:<password>@nexflare-cluster.xxxxx.mongodb.net/nexflare?retryWrites=true&w=majority
   ```

2. **Test Connection**
   ```bash
   # Test locally first
   MONGODB_URI="your-connection-string" npm run start:dev
   ```

3. **Configure in Production**
   - Add connection string to Railway environment variables
   - Ensure database name is correct
   - Test API endpoints after deployment

### Database Collections

The application uses these collections:
- `projects`: Project portfolio data
- `contacts`: Contact form submissions
- `users`: User accounts (future)

## 📧 Email Service Configuration

### Step 1: Gmail SMTP Setup

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Enable 2FA on your Gmail account

2. **Generate App Password**
   - Visit Google Account > Security
   - Generate app-specific password
   - Use this password in environment variables

3. **Configure SMTP Settings**
   ```
   SMTP Host: smtp.gmail.com
   SMTP Port: 587
   Security: STARTTLS
   Username: your-email@gmail.com
   Password: your-app-password
   ```

### Step 2: Alternative Email Services

#### SendGrid (Recommended for Production)
```
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
```

#### AWS SES
```
EMAIL_SERVICE=ses
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
FROM_EMAIL=noreply@yourdomain.com
```

### Email Template Configuration

Update backend email service:
```typescript
// src/contact/email.service.ts
const mailOptions = {
  from: process.env.FROM_EMAIL,
  to: 'arsathprabu96@gmail.com',
  subject: `New Contact Form Submission from ${name}`,
  html: htmlTemplate,
};
```

## 🔐 Environment Variables

### Frontend Environment Variables

Create `.env.local` in frontend:
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME="NEXFLARE TECH"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTAG_ID=GT-XXXXXXXXX

# Features
NEXT_PUBLIC_ENABLE_ANIMATIONS=true
NEXT_PUBLIC_ENABLE_PARTICLES=true
```

### Backend Environment Variables

Create `.env` in backend:
```bash
# Server Configuration
NODE_ENV=production
PORT=3001

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexflare

# Email Service
EMAIL_SERVICE=gmail
FROM_EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Security
CORS_ORIGIN=https://your-frontend-domain.vercel.app
JWT_SECRET=your-jwt-secret-key

# Optional Services
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info
```

### Environment Variable Security

1. **Never commit .env files to git**
2. **Use different values for development/production**
3. **Rotate secrets regularly**
4. **Use strong, unique passwords**
5. **Enable environment variable encryption when available**

## 🌍 Domain Configuration

### Step 1: Custom Domain Setup

1. **Purchase Domain**
   - Choose a domain registrar (Namecheap, GoDaddy, etc.)
   - Purchase your desired domain
   - Configure DNS management

2. **Configure Vercel Domain**
   ```
   # Add custom domain in Vercel dashboard
   Domain: nexflaretech.com
   Type: Primary domain
   
   # DNS Configuration
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

3. **Configure Railway Domain**
   ```
   # Add custom domain in Railway dashboard
   Domain: api.nexflaretech.com
   
   # DNS Configuration
   Type: CNAME
   Name: api
   Value: your-project.up.railway.app
   ```

### Step 2: SSL Certificate

Both Vercel and Railway provide automatic SSL certificates:
- Vercel: Automatic Let's Encrypt certificates
- Railway: Automatic SSL for custom domains

### Step 3: DNS Configuration

Example DNS records:
```
Type    Name    Value                           TTL
A       @       76.76.19.61                     3600
CNAME   www     cname.vercel-dns.com           3600
CNAME   api     your-project.up.railway.app    3600
TXT     @       "v=spf1 include:_spf.google.com ~all"
```

## 📊 Monitoring & Analytics

### Step 1: Application Monitoring

1. **Vercel Analytics**
   - Enable in Vercel dashboard
   - Monitor page views, performance
   - Track Core Web Vitals

2. **Railway Metrics**
   - Monitor CPU, memory usage
   - Track response times
   - Set up alerts for errors

### Step 2: Error Tracking

#### Sentry Integration

1. **Install Sentry**
```bash
# Frontend
npm install @sentry/nextjs

# Backend
npm install @sentry/node
```

2. **Configure Sentry**
```typescript
// Frontend: sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Backend: main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Step 3: Performance Monitoring

1. **Google Analytics**
```typescript
// Frontend: lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
```

2. **Uptime Monitoring**
   - Use UptimeRobot or Pingdom
   - Monitor both frontend and backend
   - Set up email/SMS alerts

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      # Test Frontend
      - name: Test Frontend
        run: |
          cd frontend
          npm ci
          npm run build
          npm run test
      
      # Test Backend
      - name: Test Backend
        run: |
          cd backend
          npm ci
          npm run build
          npm run test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.3.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: ${{ secrets.RAILWAY_SERVICE }}
```

### Deployment Secrets

Add these secrets to GitHub repository:
```
VERCEL_TOKEN=your-vercel-token
ORG_ID=your-vercel-org-id
PROJECT_ID=your-vercel-project-id
RAILWAY_TOKEN=your-railway-token
RAILWAY_SERVICE=your-service-id
```

## 🛠️ Troubleshooting

### Common Deployment Issues

#### Frontend Issues

1. **Build Failures**
   ```bash
   # Check build locally
   cd frontend
   npm run build
   
   # Common fixes
   npm install --legacy-peer-deps
   npm update
   ```

2. **Environment Variable Issues**
   ```bash
   # Verify variables are set
   echo $NEXT_PUBLIC_API_URL
   
   # Check in Vercel dashboard
   # Ensure variables are not wrapped in quotes
   ```

3. **Import/Export Errors**
   ```typescript
   // Use dynamic imports for client-side only components
   const Component = dynamic(() => import('./Component'), { ssr: false });
   ```

#### Backend Issues

1. **Database Connection Errors**
   ```bash
   # Test connection string
   mongo "mongodb+srv://username:password@cluster.mongodb.net/test"
   
   # Check IP whitelist in MongoDB Atlas
   # Verify username/password
   ```

2. **Email Service Issues**
   ```bash
   # Test SMTP settings
   telnet smtp.gmail.com 587
   
   # Verify app password is correct
   # Check Gmail security settings
   ```

3. **Memory/Performance Issues**
   ```typescript
   // Optimize memory usage
   app.use(compression());
   app.use(helmet());
   
   // Add request timeouts
   app.use(timeout('30s'));
   ```

### Debugging Tools

1. **Vercel Logs**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # View logs
   vercel logs
   ```

2. **Railway Logs**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # View logs
   railway logs
   ```

3. **MongoDB Monitoring**
   - Use MongoDB Atlas monitoring dashboard
   - Check connection pool metrics
   - Monitor query performance

### Performance Optimization

1. **Frontend Optimizations**
   ```typescript
   // Enable compression
   module.exports = {
     compress: true,
     images: {
       domains: ['your-domain.com'],
       formats: ['image/webp', 'image/avif'],
     },
   };
   ```

2. **Backend Optimizations**
   ```typescript
   // Enable compression
   app.use(compression());
   
   // Add caching headers
   app.use((req, res, next) => {
     res.set('Cache-Control', 'public, max-age=300');
     next();
   });
   ```

3. **Database Optimizations**
   - Add appropriate indexes
   - Use connection pooling
   - Implement query optimization

---

<div align="center">

**Deployment Complete!**

🎉 **Your NEXFLARE application is now live!**

📧 **Support**: arsathprabu96@gmail.com  
📱 **WhatsApp**: +91 9500179062  
🚀 **Live Site**: https://your-domain.vercel.app  
⚡ **API**: https://your-backend.railway.app

**Need deployment help? Contact us!**

</div>

---

*Last Updated: October 16, 2025*  
*Version: 1.0*  
*© 2025 NEXFLARE TECH. All rights reserved.*
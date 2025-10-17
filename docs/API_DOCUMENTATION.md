# 🔧 NEXFLARE TECH - API Documentation

<div align="center">

![API Documentation](https://img.shields.io/badge/NEXFLARE-API%20Documentation-00FFFF?style=for-the-badge)

**Complete Backend API Reference**

</div>

## 📋 Table of Contents

- [🎯 API Overview](#-api-overview)
- [🔐 Authentication](#-authentication)
- [📍 Base URLs](#-base-urls)
- [📊 API Endpoints](#-api-endpoints)
- [📝 Data Models](#-data-models)
- [🔄 Request/Response Examples](#-requestresponse-examples)
- [⚠️ Error Handling](#️-error-handling)
- [📈 Rate Limiting](#-rate-limiting)
- [🧪 Testing the API](#-testing-the-api)

## 🎯 API Overview

The NEXFLARE TECH API is a RESTful service built with NestJS that provides endpoints for managing projects, handling contact form submissions, and retrieving company information. The API follows modern REST principles and returns JSON responses.

### Key Features
- **RESTful Design**: Standard HTTP methods and status codes
- **TypeScript**: Full type safety and IntelliSense support
- **Validation**: Automatic request/response validation
- **Documentation**: Auto-generated Swagger documentation
- **Error Handling**: Consistent error responses
- **CORS Support**: Cross-origin resource sharing enabled

### Technology Stack
- **Framework**: NestJS 11.0
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI 3.0
- **Email**: Nodemailer for email services

## 🔐 Authentication

Currently, the API is open for public access for contact form submissions and project viewing. Future versions will include:

- **API Keys**: For rate limiting and analytics
- **JWT Tokens**: For administrative access
- **OAuth Integration**: For third-party integrations

## 📍 Base URLs

### Development
```
http://localhost:3001
```

### Production
```
https://nexflare-api.railway.app
```

### API Documentation
```
http://localhost:3001/api (Development)
https://nexflare-api.railway.app/api (Production)
```

## 📊 API Endpoints

### Health Check

#### GET /
Check if the API is running and healthy.

**Response:**
```json
{
  "message": "NEXFLARE API is running!",
  "status": "healthy",
  "timestamp": "2025-10-16T10:30:00.000Z"
}
```

### Projects Endpoints

#### GET /projects
Retrieve all published projects.

**Query Parameters:**
- `category` (optional): Filter by project category
- `limit` (optional): Limit number of results (default: 10)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "project_id",
      "title": "E-Commerce Platform",
      "description": "Full-featured online shopping platform",
      "category": "Web Development",
      "technologies": ["React", "Node.js", "MongoDB"],
      "demoUrl": "https://demo.example.com",
      "githubUrl": "https://github.com/example/project",
      "image": "project-image.jpg",
      "featured": true,
      "completedAt": "2025-10-01T00:00:00.000Z",
      "createdAt": "2025-09-01T00:00:00.000Z",
      "updatedAt": "2025-10-01T00:00:00.000Z"
    }
  ],
  "total": 6,
  "page": 1,
  "totalPages": 1
}
```

#### GET /projects/:id
Retrieve a specific project by ID.

**Parameters:**
- `id`: Project MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "project_id",
    "title": "E-Commerce Platform",
    "description": "Full-featured online shopping platform with advanced features",
    "fullDescription": "Detailed project description...",
    "category": "Web Development",
    "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
    "features": ["Shopping Cart", "Payment Integration", "Admin Panel"],
    "challenges": ["Real-time inventory", "Payment security"],
    "solutions": ["WebSocket implementation", "Stripe integration"],
    "demoUrl": "https://demo.example.com",
    "githubUrl": "https://github.com/example/project",
    "image": "project-image.jpg",
    "gallery": ["image1.jpg", "image2.jpg"],
    "featured": true,
    "metrics": {
      "duration": "3 months",
      "teamSize": 2,
      "clientSatisfaction": 98
    },
    "completedAt": "2025-10-01T00:00:00.000Z",
    "createdAt": "2025-09-01T00:00:00.000Z",
    "updatedAt": "2025-10-01T00:00:00.000Z"
  }
}
```

#### POST /projects (Admin Only - Future)
Create a new project entry.

**Request Body:**
```json
{
  "title": "New Project",
  "description": "Project description",
  "category": "Web Development",
  "technologies": ["React", "Node.js"],
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/example/project",
  "featured": false
}
```

### Contact Endpoints

#### POST /contact
Submit a contact form inquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your services",
  "service": "Full Stack Development",
  "budget": "$10,000 - $25,000",
  "timeline": "3-6 months",
  "company": "Tech Corp",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "contact_id",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'm interested in your services",
    "service": "Full Stack Development",
    "budget": "$10,000 - $25,000",
    "timeline": "3-6 months",
    "company": "Tech Corp",
    "phone": "+1234567890",
    "status": "new",
    "submittedAt": "2025-10-16T10:30:00.000Z"
  }
}
```

#### GET /contact (Admin Only - Future)
Retrieve all contact form submissions.

**Query Parameters:**
- `status` (optional): Filter by status (new, contacted, completed)
- `limit` (optional): Limit number of results
- `offset` (optional): Pagination offset

## 📝 Data Models

### Project Model
```typescript
interface Project {
  _id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: 'Web Development' | 'Mobile Apps' | 'AI/ML' | 'Automation';
  technologies: string[];
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  gallery?: string[];
  featured: boolean;
  metrics?: {
    duration: string;
    teamSize: number;
    clientSatisfaction: number;
  };
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Contact Model
```typescript
interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  service?: string;
  budget?: string;
  timeline?: string;
  company?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'completed';
  submittedAt: Date;
  respondedAt?: Date;
  notes?: string;
}
```

### API Response Model
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
```

## 🔄 Request/Response Examples

### Get All Projects
```bash
curl -X GET "http://localhost:3001/projects" \
  -H "Content-Type: application/json"
```

### Get Projects by Category
```bash
curl -X GET "http://localhost:3001/projects?category=Web Development&limit=5" \
  -H "Content-Type: application/json"
```

### Submit Contact Form
```bash
curl -X POST "http://localhost:3001/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@company.com",
    "message": "Looking for a mobile app development team",
    "service": "Mobile App Development",
    "budget": "$25,000 - $50,000",
    "timeline": "3-6 months",
    "company": "Innovation Corp",
    "phone": "+1987654321"
  }'
```

### JavaScript/TypeScript Example
```typescript
// Fetch all projects
const fetchProjects = async () => {
  try {
    const response = await fetch('http://localhost:3001/projects');
    const data = await response.json();
    
    if (data.success) {
      console.log('Projects:', data.data);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Submit contact form
const submitContact = async (formData) => {
  try {
    const response = await fetch('http://localhost:3001/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Form submitted successfully!');
    } else {
      console.error('Submission failed:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

## ⚠️ Error Handling

### HTTP Status Codes
- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server error

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "details": {
    "field": "email",
    "message": "Email is required",
    "value": ""
  },
  "timestamp": "2025-10-16T10:30:00.000Z",
  "path": "/contact",
  "method": "POST"
}
```

### Common Validation Errors

#### Contact Form Validation
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Name must be at least 2 characters long",
      "value": "J"
    },
    {
      "field": "email",
      "message": "Invalid email format",
      "value": "invalid-email"
    },
    {
      "field": "message",
      "message": "Message must be at least 10 characters long",
      "value": "Short"
    }
  ]
}
```

## 📈 Rate Limiting

### Current Limits
- **Contact Form**: 5 submissions per hour per IP
- **Projects API**: 100 requests per hour per IP
- **General API**: 1000 requests per hour per IP

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1634567890
```

### Rate Limit Exceeded Response
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "retryAfter": 3600,
  "timestamp": "2025-10-16T10:30:00.000Z"
}
```

## 🧪 Testing the API

### Using Postman

1. **Import Collection**: Download our Postman collection
2. **Set Environment**: Configure base URL variable
3. **Test Endpoints**: Run individual requests or entire collection

### Using curl

#### Test Health Check
```bash
curl -X GET "http://localhost:3001/" \
  -H "Accept: application/json"
```

#### Test Projects Endpoint
```bash
curl -X GET "http://localhost:3001/projects" \
  -H "Accept: application/json"
```

#### Test Contact Form
```bash
curl -X POST "http://localhost:3001/contact" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message for API testing purposes."
  }'
```

### Using JavaScript/Fetch

```javascript
// Test function for all endpoints
const testAPI = async () => {
  const baseUrl = 'http://localhost:3001';
  
  // Test health check
  console.log('Testing health check...');
  const healthResponse = await fetch(`${baseUrl}/`);
  console.log('Health:', await healthResponse.json());
  
  // Test projects
  console.log('Testing projects endpoint...');
  const projectsResponse = await fetch(`${baseUrl}/projects`);
  console.log('Projects:', await projectsResponse.json());
  
  // Test contact form
  console.log('Testing contact form...');
  const contactResponse = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message from API documentation'
    })
  });
  console.log('Contact:', await contactResponse.json());
};

testAPI();
```

### Environment Setup for Testing

#### Development Environment
```bash
# Install dependencies
npm install

# Set environment variables
export MONGODB_URI=mongodb://localhost:27017/nexflare_test
export PORT=3001
export FROM_EMAIL=test@example.com
export EMAIL_PASSWORD=test_password

# Start test server
npm run start:dev
```

#### Test Database
For testing, use a separate database:
```bash
# MongoDB test database
MONGODB_URI=mongodb://localhost:27017/nexflare_test
```

### Automated Testing

#### Unit Tests
```bash
cd backend
npm run test
```

#### E2E Tests
```bash
cd backend
npm run test:e2e
```

#### API Integration Tests
```bash
cd backend
npm run test:api
```

---

<div align="center">

**API Documentation**

📧 **Support**: arsathprabu96@gmail.com  
📱 **WhatsApp**: +91 9500179062  
🌐 **Live API**: https://nexflare-api.railway.app  
📖 **Interactive Docs**: https://nexflare-api.railway.app/api

**Questions? We're here to help!**

</div>

---

*Last Updated: October 16, 2025*  
*API Version: 1.0*  
*© 2025 NEXFLARE TECH. All rights reserved.*
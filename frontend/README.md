# 🌐 NEXFLARE TECH - Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)

**Modern Frontend for AI-Powered Business Solutions**

</div>

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🎨 Components](#-components)
- [🔧 Configuration](#-configuration)
- [📱 Responsive Design](#-responsive-design)
- [🎪 Animations](#-animations)
- [🚢 Deployment](#-deployment)

## 🎯 Project Overview

The NEXFLARE TECH frontend is a cutting-edge Next.js application showcasing our AI-powered software and automation solutions. Built with modern technologies and best practices, it features a cyberpunk-inspired design with advanced animations and interactive elements.

### Key Highlights
- **Next.js 14**: Latest App Router with server components
- **TypeScript**: Full type safety and developer experience
- **TailwindCSS**: Utility-first styling with custom design system
- **Framer Motion**: Smooth 60fps animations and transitions
- **Responsive Design**: Mobile-first approach with perfect scaling
- **Performance Optimized**: Lighthouse score 95+ across all metrics

## ✨ Features

### 🎨 Visual Design
- **Cyberpunk Theme**: Dark background with neon cyan accents
- **Glowing Effects**: Custom text glow and background animations
- **Particle Systems**: Dynamic particle backgrounds and effects
- **3D Graphics**: Advanced geometric and holographic elements
- **Smooth Animations**: Framer Motion powered transitions

### 🧩 Interactive Components
- **Hero Section**: Animated logo and particle background
- **Project Showcase**: Filterable portfolio with live demos
- **Service Cards**: Detailed service offerings with hover effects
- **Contact Forms**: Multi-step forms with validation
- **Testimonials**: Interactive carousel with client feedback

### 📱 User Experience
- **Mobile First**: Optimized for all screen sizes
- **Fast Loading**: Optimized images and lazy loading
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO Optimized**: Meta tags and structured data
- **Progressive Enhancement**: Works without JavaScript

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 14.2](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with concurrent features
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework

### UI & Animations
- **[Framer Motion 12.23](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons
- **[React TSParticles](https://particles.js.org/)** - Particle system
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Forms & Validation
- **[React Hook Form 7.65](https://react-hook-form.com/)** - Form management
- **[Zod 4.1](https://zod.dev/)** - Schema validation
- **[React Hot Toast](https://react-hot-toast.com/)** - Toast notifications

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn 1.22+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ArsathPrabu96-PE/NexFlare-Streaming.git
cd NexFlare-Streaming/frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your environment variables:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   │
│   ├── components/          # React components
│   │   ├── About/           # About section
│   │   ├── Contact/         # Contact forms
│   │   ├── Footer/          # Site footer
│   │   ├── Founder/         # Founder profile
│   │   ├── Hero/            # Hero section
│   │   ├── Projects/        # Project showcase
│   │   ├── Services/        # Services section
│   │   ├── Testimonials/    # Client testimonials
│   │   └── shared/          # Reusable components
│   │       ├── AnimatedBackground.tsx
│   │       ├── Button.tsx
│   │       ├── CyberGrid.tsx
│   │       ├── EnergyField.tsx
│   │       ├── FloatingElements.tsx
│   │       ├── GeometricBackground.tsx
│   │       ├── GradientOrbs.tsx
│   │       ├── HolographicEffect.tsx
│   │       ├── NexflareLogo.tsx
│   │       ├── ParticleField.tsx
│   │       ├── ProjectImage.tsx
│   │       ├── ServiceIcon.tsx
│   │       └── TechIcon.tsx
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useProjects.ts   # Project data hook
│   │
│   └── lib/                 # Utility functions
│       └── api.ts           # API client
│
├── public/                  # Static assets
│   ├── favicon.ico
│   └── images/
│
├── .env.local              # Environment variables
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies
├── tailwind.config.ts      # TailwindCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Components

### Core Components

#### Hero Section
- **Location**: `src/components/Hero/Hero.tsx`
- **Features**: Animated logo, particle background, CTA buttons
- **Dependencies**: Framer Motion, particle system

#### Projects Showcase
- **Location**: `src/components/Projects/Projects.tsx`
- **Features**: Filterable grid, live demos, hover effects
- **Data Source**: `src/hooks/useProjects.ts`

#### Contact Forms
- **Location**: `src/components/Contact/Contact.tsx`
- **Features**: Multi-step form, validation, API integration
- **Validation**: React Hook Form + Zod schemas

### Shared Components

#### Graphics System (12 Components)
1. **AnimatedBackground** - Matrix, particles, waves, circuit patterns
2. **CyberGrid** - Animated grid overlays
3. **EnergyField** - Lightning, plasma, neural, quantum effects
4. **FloatingElements** - Geometric floating animations
5. **GeometricBackground** - Grid, circles, lines patterns
6. **GradientOrbs** - Floating gradient spheres
7. **HolographicEffect** - Scanner, waves, glitch, pulse effects
8. **NexflareLogo** - Company logo with animations
9. **ParticleField** - Configurable particle systems
10. **ProjectImage** - Optimized project images
11. **ServiceIcon** - Service-specific iconography
12. **TechIcon** - Technology stack icons

#### UI Components
- **Button** - Styled button with variants
- **Typography** - Consistent text styling
- **Cards** - Reusable card layouts
- **Forms** - Form field components

## 🔧 Configuration

### Next.js Configuration (`next.config.mjs`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
```

### TailwindCSS Configuration (`tailwind.config.ts`)
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'cyan-neon': '#00FFFF',
        'dark': '#0A0A0A',
        'darker': '#050505',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Responsive Utilities
```tsx
// Example responsive component
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6 
  lg:gap-8
">
  {/* Content */}
</div>
```

### Mobile Optimizations
- Touch-friendly button sizes (min 44px)
- Optimized images with WebP format
- Reduced motion for accessibility
- Optimized font sizes and line heights

## 🎪 Animations

### Framer Motion Setup
```tsx
import { motion } from 'framer-motion';

// Fade in animation
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Stagger children animation
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Animation Patterns
1. **Page Transitions**: Smooth page changes
2. **Scroll Animations**: Elements animate on scroll
3. **Hover Effects**: Interactive component states
4. **Loading States**: Skeleton and loading animations
5. **Micro-interactions**: Button clicks, form focus

### Performance Considerations
- Hardware acceleration with `transform3d()`
- Reduced motion respect for accessibility
- Optimized re-renders with `AnimatePresence`
- GPU-optimized properties (transform, opacity)

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Import project to Vercel
   - Set root directory to `frontend`
   - Auto-deploy on push to main

2. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-api.railway.app
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

3. **Build Configuration**
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

### Alternative Deployment Options
- **Netlify**: Similar setup to Vercel
- **AWS Amplify**: Enterprise-grade hosting
- **Railway**: Full-stack deployment platform

### Performance Optimization
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Bundle analysis with `@next/bundle-analyzer`
- CDN optimization for static assets

---

<div align="center">

**Frontend Development**

🛠️ **Built with**: Next.js + React + TypeScript  
🎨 **Styled with**: TailwindCSS + Framer Motion  
⚡ **Hosted on**: Vercel  

📧 **Contact**: arsathprabu96@gmail.com  
🌐 **Live Demo**: https://nexflare-tech.vercel.app

</div>

---

*This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).*

*Last Updated: October 16, 2025*  
*© 2025 NEXFLARE TECH. All rights reserved.*

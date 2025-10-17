# 🔒 Environment Setup Instructions

## Quick Setup Guide

### 1. Backend Environment Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and replace the placeholder values:

```env
# Your actual MongoDB connection string
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority

# Email configuration (if using contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 2. Frontend Environment Configuration (Optional)

```bash
cd frontend
cp .env.example .env.local
```

Edit `frontend/.env.local` if you need custom configurations:

```env
# If your backend runs on a different port or domain
NEXT_PUBLIC_API_URL=http://localhost:3000

# Analytics IDs (optional)
NEXT_PUBLIC_GA_TRACKING_ID=your_analytics_id
```

### 3. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Add a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Replace the placeholder in your `.env` file

### 4. Security Notes

- ✅ **Never commit `.env` files** - they are ignored by Git
- ✅ **Use `.env.example` files** for sharing configuration structure
- ✅ **Store secrets securely** in production (environment variables)
- ✅ **Use different databases** for development/production

### 5. Deployment Environment Variables

For production deployments, set these environment variables in your hosting platform:

**Required:**
- `MONGODB_URI` - Your production MongoDB connection string
- `NODE_ENV=production`

**Optional:**
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` - For contact form functionality

---

## 🚨 Important Security Reminders

- Never share your `.env` files
- Use strong passwords for database users
- Restrict database access to your application's IP addresses
- Regularly rotate credentials in production
- Use different databases for development and production

---

*For more detailed setup instructions, see the [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)*
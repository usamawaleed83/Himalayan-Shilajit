# Render Deployment Guide

## Prerequisites
1. MongoDB Atlas cluster set up with connection string
2. Git repository pushed to GitHub/GitLab
3. Render account created

## Deployment Steps

### 1. Deploy Backend (Web Service)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure:
   - **Name**: `himalayan-shilajit-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=https://your-frontend-service.onrender.com
   ```

6. Deploy and note the service URL (e.g., `https://your-backend-service.onrender.com`)

### 2. Deploy Frontend (Static Site)
1. In Render Dashboard, click "New +" → "Static Site"
2. Connect your Git repository
3. Configure:
   - **Name**: `himalayan-shilajit-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-service.onrender.com/api
   ```

5. Deploy

### 3. Update CORS
After frontend deployment, update the backend environment variable:
```
FRONTEND_URL=https://your-frontend-service.onrender.com
```

## Health Checks
- Backend: `https://your-backend-service.onrender.com/health`
- Frontend: `https://your-frontend-service.onrender.com`

## Notes
- Free tier services may sleep after 15 minutes of inactivity
- First request after sleep may take 30+ seconds to respond
- Consider upgrading to paid plans for production use
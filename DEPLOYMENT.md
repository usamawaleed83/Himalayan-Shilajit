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
   - **Name**: `herbal-source-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=herbal-source-super-secret-jwt-key
   FRONTEND_URL=https://herbal-source-frontend.onrender.com
   ```

6. Deploy and note the service URL (e.g., `https://herbal-source-backend.onrender.com`)

### 2. Deploy Frontend (Static Site)
1. In Render Dashboard, click "New +" → "Static Site"
2. Connect your Git repository
3. Configure:
   - **Name**: `herbal-source-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://herbal-source-backend.onrender.com/api
   ```

5. Deploy

### 3. Update CORS
After frontend deployment, update the backend environment variable:
```
FRONTEND_URL=https://herbal-source-frontend.onrender.com
```

## Health Checks
- Backend: `https://herbal-source-backend.onrender.com/health`
- Frontend: `https://herbal-source-frontend.onrender.com`

## Notes
- Free tier services may sleep after 15 minutes of inactivity
- First request after sleep may take 30+ seconds to respond
- Consider upgrading to paid plans for production use
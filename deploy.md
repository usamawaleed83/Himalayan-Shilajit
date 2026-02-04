# 🚀 Quick Deployment Steps

## Step 1: Deploy Backend on Render

### 1.1 Go to Render
1. Visit [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"

### 1.2 Connect Repository
1. Select your GitHub repository
2. Configure:
   - **Name**: `herbalsource-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 1.3 Add Environment Variables
Copy these to Render dashboard:
```
GEMINI_API_KEY=AIzaSyB17H1eVG0OWaCGx9a5V_EKNoeNJiS0ktY
JWT_SECRET=a1c1ef68-c415-4cae-89f9-9ab758108ae9
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=usamawaleed83@gmail.com
EMAIL_PASSWORD=zrcn xzhu gxka yboy
SUPPORT_EMAIL=usamawaleed83@gmail.com
ADMIN_PASSWORD=admin123
NODE_ENV=production
```

### 1.4 Deploy
- Click "Create Web Service"
- Wait 5-10 minutes
- Copy the backend URL (e.g., `https://herbalsource-backend.onrender.com`)

## Step 2: Deploy Frontend on Vercel

### 2.1 Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Import Project"

### 2.2 Import Repository
1. Select your GitHub repository
2. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `.` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2.3 Add Environment Variable
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```
(Replace with your actual Render backend URL)

### 2.4 Deploy
- Click "Deploy"
- Wait 3-5 minutes
- Your site will be live!

## Step 3: Update Backend CORS

After getting Vercel URL, update backend CORS:

1. Go to your Render dashboard
2. Add environment variable:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

## 🎉 Done!

Your app will be live at:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

## 🔧 Testing

Test these URLs:
- `https://your-project.vercel.app` - Main site
- `https://your-project.vercel.app/products` - Products page
- `https://your-backend.onrender.com/health` - Backend health check

## 🐛 Common Issues

### Issue 1: CORS Error
**Solution**: Make sure FRONTEND_URL in Render matches your Vercel URL

### Issue 2: API Not Working
**Solution**: Check NEXT_PUBLIC_API_URL in Vercel environment variables

### Issue 3: Build Failed
**Solution**: Make sure all dependencies are in package.json

## 📞 Need Help?

If any step fails, check:
1. Build logs in Render/Vercel dashboard
2. Environment variables are correct
3. GitHub repository is public or connected properly
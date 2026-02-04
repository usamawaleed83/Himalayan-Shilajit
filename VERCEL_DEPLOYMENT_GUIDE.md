# 🚀 Vercel Deployment Guide - HerbalSource

## Overview
Aapka project 2 parts mein hai:
1. **Next.js Frontend** - Vercel par deploy hoga
2. **Express.js Backend** - Render/Railway par deploy hoga (Vercel functions mein convert kar sakte hain)

## 📋 Pre-Deployment Checklist

### 1. GitHub Repository Ready
- ✅ Code GitHub par upload hai
- ✅ `.env` files ignore hain (.gitignore mein)
- ✅ All dependencies installed

### 2. Environment Variables Setup
- ✅ Frontend environment variables ready
- ✅ Backend environment variables ready

## 🎯 Deployment Options

### Option A: Vercel + Render (Recommended)
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Express.js)

### Option B: Full Vercel (Advanced)
- **Frontend**: Vercel (Next.js)
- **Backend**: Vercel Functions (Convert Express to API routes)

---

## 🚀 Option A: Vercel + Render Deployment

### Step 1: Deploy Backend on Render

#### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Connect your GitHub repository

#### 1.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repo
3. Configure:
   - **Name**: `herbalsource-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### 1.3 Add Environment Variables
```env
GEMINI_API_KEY=AIzaSyB17H1eVG0OWaCGx9a5V_EKNoeNJiS0ktY
PORT=5000
JWT_SECRET=a1c1ef68-c415-4cae-89f9-9ab758108ae9
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=usamawaleed83@gmail.com
EMAIL_PASSWORD=zrcn xzhu gxka yboy
SUPPORT_EMAIL=usamawaleed83@gmail.com
FRONTEND_URL=https://your-vercel-app.vercel.app
ADMIN_PASSWORD=admin123
NODE_ENV=production
```

#### 1.4 Deploy Backend
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Note the backend URL: `https://herbalsource-backend.onrender.com`

### Step 2: Deploy Frontend on Vercel

#### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Import your project

#### 2.2 Configure Vercel Project
1. Click "Import Project"
2. Select your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### 2.3 Add Environment Variables
```env
NEXT_PUBLIC_API_URL=https://herbalsource-backend.onrender.com/api
```

#### 2.4 Deploy Frontend
- Click "Deploy"
- Wait for deployment (3-5 minutes)
- Your site will be live at: `https://your-project.vercel.app`

### Step 3: Update CORS Settings
Backend mein CORS update karna hoga:

```javascript
// server/server.js
const corsOptions = {
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

---

## 🚀 Option B: Full Vercel Deployment

### Step 1: Convert Backend to API Routes

#### 1.1 Create API Routes Structure
```
app/
  api/
    products/
      route.js
    orders/
      route.js
    payments/
      route.js
    ai/
      route.js
```

#### 1.2 Convert Express Routes to Next.js API Routes
Example: `app/api/products/route.js`
```javascript
import { NextResponse } from 'next/server';

// In-memory products (same as your current setup)
const products = [
  // Your product data
];

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: products 
  });
}

export async function POST(request) {
  const body = await request.json();
  // Handle POST logic
  return NextResponse.json({ 
    success: true, 
    data: body 
  });
}
```

#### 1.3 Move Server Logic to API Routes
- Copy all route handlers from `server/routes/` to `app/api/`
- Convert Express middleware to Next.js middleware
- Update imports and exports

### Step 2: Deploy to Vercel
1. Push converted code to GitHub
2. Deploy on Vercel (same as Option A frontend)
3. All APIs will be available at: `https://your-app.vercel.app/api/`

---

## 🔧 Quick Setup Commands

### For Option A (Recommended):

#### Backend (Render):
```bash
# No changes needed in code
# Just deploy server/ folder on Render
```

#### Frontend (Vercel):
```bash
# Update .env.local
echo "NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api" > .env.local

# Deploy to Vercel
npx vercel --prod
```

### For Option B (Advanced):
```bash
# Create API routes
mkdir -p app/api/{products,orders,payments,ai}

# Convert routes (manual process)
# Deploy to Vercel
npx vercel --prod
```

---

## 📝 Environment Variables Summary

### Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=https://your-backend-url/api
```

### Backend (Render/Vercel):
```env
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
SUPPORT_EMAIL=your_support_email
FRONTEND_URL=https://your-vercel-app.vercel.app
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

---

## 🎯 Recommended Approach

**Main recommend karta hun Option A:**
1. ✅ **Easy to implement** - No code changes needed
2. ✅ **Reliable** - Render backend + Vercel frontend
3. ✅ **Fast deployment** - 15-20 minutes total
4. ✅ **Scalable** - Both platforms handle traffic well

**Steps:**
1. Deploy backend on Render (10 minutes)
2. Deploy frontend on Vercel (5 minutes)
3. Update environment variables (2 minutes)
4. Test everything (3 minutes)

Kya aap Option A se start karna chahte hain? Main step-by-step guide kar sakta hun!
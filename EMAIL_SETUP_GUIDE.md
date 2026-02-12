# Email Notifications Setup Guide

## Overview
Your HerbalSource store now sends automatic email notifications when customers place orders. You'll receive order details at **herbalsource.store@gmail.com**, and customers will receive order confirmations.

## Setup Steps

### 1. Create a Resend Account (FREE)

1. Go to: https://resend.com/signup
2. Sign up with your email
3. Verify your email address

### 2. Get Your API Key

1. After logging in, go to: https://resend.com/api-keys
2. Click "Create API Key"
3. Give it a name like "HerbalSource Production"
4. Copy the API key (starts with `re_`)

### 3. Add API Key to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your **herbalsource-store** project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Paste your Resend API key (starts with `re_`)
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**

### 4. Verify Domain (Optional but Recommended)

By default, emails will be sent from `onboarding@resend.dev`. To use your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `herbalsource.store`)
4. Follow the DNS setup instructions
5. Once verified, update the email route to use your domain

**Note:** For now, you can use the default `onboarding@resend.dev` sender. Emails will still work!

### 5. Redeploy Your Site

After adding the environment variable:
1. Go to **Deployments** tab in Vercel
2. Click the three dots on the latest deployment
3. Click **Redeploy**

## What Happens When Someone Orders?

### You Receive:
- **Email to:** herbalsource.store@gmail.com
- **Subject:** 🛍️ New Order: [Order Number]
- **Contains:**
  - Order number and date
  - Customer name, email, phone, address
  - All order items with quantities and prices
  - Total amount to collect on delivery
  - Payment method (Cash on Delivery)

### Customer Receives:
- **Email to:** Their email address
- **Subject:** Order Confirmation - [Order Number]
- **Contains:**
  - Order confirmation message
  - Order number and date
  - Order summary with items and total
  - Delivery address
  - WhatsApp contact button
  - What to expect next (delivery timeline)

## Testing

### Test Locally:
1. Create a `.env.local` file in your project root
2. Add: `RESEND_API_KEY=re_your_api_key_here`
3. Run: `npm run dev`
4. Place a test order
5. Check your email!

### Test on Production:
1. After deploying with the API key
2. Visit: https://herbalsource-store.vercel.app
3. Place a test order
4. Check herbalsource.store@gmail.com for the order notification

## Troubleshooting

### Emails Not Sending?
1. Check Vercel environment variables are set correctly
2. Verify API key is valid in Resend dashboard
3. Check Vercel deployment logs for errors
4. Make sure you redeployed after adding the API key

### Emails Going to Spam?
1. Verify your domain in Resend (see step 4 above)
2. Add SPF and DKIM records to your domain DNS
3. Ask customers to check spam folder and mark as "Not Spam"

### Need Help?
- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com

## Free Tier Limits

Resend free tier includes:
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ Perfect for starting out!

If you exceed this, you can upgrade to a paid plan or the emails will queue until the next day.

## Email Templates

The email templates are located in:
- `app/api/send-order-email/route.js`

You can customize:
- Email design and colors
- Logo and branding
- Email content and messaging
- Footer links

## Summary

Once you add the `RESEND_API_KEY` to Vercel and redeploy:
1. ✅ You'll receive an email for every new order
2. ✅ Customers will receive order confirmations
3. ✅ All order details will be included
4. ✅ Completely automatic!

**Next Step:** Go to https://resend.com/signup and get your API key!

# 📧 Email Setup - Quick Start

## ✅ Email is Already Integrated!

When a user places an order, an email is **automatically sent** to their email address!

## 🚀 3-Step Setup

### Step 1: Get Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with your Gmail account
3. Select "Mail" → "Other" → Name it "Shilajit Store"
4. Click "Generate"
5. **Copy the 16-character password** (remove spaces)

### Step 2: Add to `.env` File

Create or edit `server/.env`:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password_here
SUPPORT_EMAIL=support@himalayanshilajit.com
FRONTEND_URL=http://localhost:5173
```

**Replace**:
- `your_email@gmail.com` → Your Gmail address
- `your_16_char_app_password_here` → The app password from Step 1

### Step 3: Restart Server

```bash
cd server
npm run dev
```

You should see:
```
Email service is ready to send messages ✅
```

## ✅ Test It!

### Option 1: Test via API
```bash
curl -X POST http://localhost:5000/api/test/test-order-email \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "your_email@gmail.com"}'
```

### Option 2: Place Real Order
1. Go to website
2. Add products to cart
3. Checkout
4. Enter your email
5. Complete order
6. **Check your email inbox!** 📧

## 📨 What Customers Receive

When they place an order, they get:
- ✅ Professional HTML email
- ✅ Order number
- ✅ All order items
- ✅ Total amount
- ✅ Delivery address
- ✅ Payment method
- ✅ Track order link

## 🎯 That's It!

Your email system is now active. Every order will automatically send a confirmation email! 🎉

## 🐛 Troubleshooting

**Email not sending?**
- Check `.env` file has correct credentials
- Make sure you're using **App Password**, not regular password
- Restart server after changing `.env`
- Check server console for errors

**Email in spam?**
- This is normal for first emails
- Add your email to contacts
- For production: Set up SPF/DKIM records



# 📧 SMTP Email Setup Guide

## ✅ Email System Already Integrated!

The email system is **already configured** and will automatically send emails when users place orders!

## 🚀 Quick Setup

### Gmail SMTP Setup (Recommended)

1. **Enable 2-Step Verification**:
   - Go to your Google Account: https://myaccount.google.com
   - Security → 2-Step Verification
   - Enable it

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter name: "Himalayan Shilajit"
   - Click "Generate"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

3. **Update `.env` file** in `server/` directory:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password
   SUPPORT_EMAIL=support@himalayanshilajit.com
   FRONTEND_URL=http://localhost:5173
   ```

   **Important**: 
   - Use the **16-character app password**, NOT your regular Gmail password
   - Remove spaces from the app password (e.g., `abcdefghijklmnop`)

### Example `.env` Configuration:
```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=yourbusiness@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
SUPPORT_EMAIL=support@himalayanshilajit.com
FRONTEND_URL=http://localhost:5173
```

## 📨 When Emails Are Sent

### 1. Order Confirmation Email
- **When**: Immediately after order is created
- **To**: Customer email address
- **Contains**: 
  - Order number
  - Order items
  - Total amount
  - Delivery address
  - Payment method
  - Track order link

### 2. Payment Success Email
- **When**: Payment is confirmed (Easypaisa callback or bank transfer verification)
- **To**: Customer email address
- **Contains**: Payment confirmation and order details

### 3. Order Shipped Email
- **When**: Order status updated to "shipped"
- **To**: Customer email address
- **Contains**: Tracking number and shipping details

## ✅ Testing Email

### Test Email Endpoint

Create a test file `server/test-email.js`:

```javascript
import dotenv from 'dotenv';
import { sendOrderConfirmation } from './services/emailService.js';
import Order from './models/Order.js';

dotenv.config();

// Test email
const testOrder = {
  orderNumber: 'HS-TEST-123',
  customer: {
    name: 'Test User',
    email: 'test@example.com', // Your email for testing
    address: {
      street: '123 Test St',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500'
    }
  },
  items: [
    { name: 'Premium Shilajit', price: 49.99, quantity: 1 }
  ],
  subtotal: 49.99,
  shipping: 0,
  total: 49.99,
  paymentMethod: 'easypaisa',
  createdAt: new Date()
};

sendOrderConfirmation(testOrder, testOrder.customer)
  .then(result => {
    console.log('Email sent:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('Email error:', error);
    process.exit(1);
  });
```

Run test:
```bash
cd server
node test-email.js
```

## 🔧 Other SMTP Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASSWORD=your_password
```

### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
EMAIL_USER=your_email@yahoo.com
EMAIL_PASSWORD=your_app_password
```

### Custom SMTP Server
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your_password
```

## 📋 Email Template Features

- ✅ Professional HTML design
- ✅ Brand colors (black, gold, green)
- ✅ Responsive layout
- ✅ Order details table
- ✅ Product images
- ✅ Track order button
- ✅ Company branding

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check SMTP credentials**:
   - Verify email and password in `.env`
   - For Gmail: Use app password, not regular password

2. **Check server logs**:
   ```bash
   # Look for these messages:
   "Email service is ready to send messages" ✅
   "Order confirmation email sent to: customer@email.com" ✅
   ```

3. **Test SMTP connection**:
   ```bash
   # Server will verify on startup
   # Check console for: "Email service is ready"
   ```

4. **Common Issues**:
   - **"Invalid login"**: Wrong password or need app password
   - **"Connection timeout"**: Check firewall/network
   - **"Email in spam"**: Add SPF/DKIM records to domain

### Gmail Specific Issues

- **"Less secure app"**: Use App Password instead
- **"Access denied"**: Enable 2-Step Verification first
- **"Rate limit"**: Gmail limits: 500 emails/day (free), 2000/day (paid)

## ✅ Verification Checklist

- [ ] SMTP credentials added to `.env`
- [ ] Server restarted after adding credentials
- [ ] See "Email service is ready" in console
- [ ] Test email sent successfully
- [ ] Order placed → Email received
- [ ] Email looks professional
- [ ] All order details correct

## 🎯 Email Flow

```
User Places Order
    ↓
Order Saved to MongoDB
    ↓
Email Service Triggered
    ↓
SMTP Connection Established
    ↓
Email Sent to Customer
    ↓
Order Confirmation Received ✅
```

## 📝 Notes

- Emails are sent **asynchronously** (won't block order creation)
- If email fails, order still processes successfully
- Check server logs for email delivery status
- Emails include professional HTML templates
- All customer data from order is included

## ✅ Your Email System is Ready!

Just add your SMTP credentials to `.env` and restart the server. Emails will automatically send when orders are placed! 🎉



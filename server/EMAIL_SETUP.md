# Email Setup Guide

## 📧 Email Configuration

The backend now includes automatic email sending for:
- ✅ Order confirmations
- ✅ Payment success notifications
- ✅ Order shipped notifications

## 🔧 Setup Instructions

### Gmail Setup (Recommended)

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Update `.env` file**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
SUPPORT_EMAIL=support@himalayanshilajit.com
FRONTEND_URL=http://localhost:5173
```

### Other Email Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASSWORD=your_password
```

**Custom SMTP:**
```env
SMTP_HOST=your_smtp_server.com
SMTP_PORT=587
EMAIL_USER=your_email@domain.com
EMAIL_PASSWORD=your_password
```

## 📨 Email Templates

The system includes professional HTML email templates for:
1. **Order Confirmation** - Sent when order is created
2. **Payment Success** - Sent when payment is confirmed
3. **Order Shipped** - Sent when order ships (requires tracking number)

## ✅ Testing

Test email sending:
```bash
# The emails are automatically sent when:
# 1. Order is created → Order confirmation email
# 2. Payment is confirmed → Payment success email
# 3. Order status updated to "shipped" → Shipping email
```

## 🐛 Troubleshooting

**Email not sending?**
- Check SMTP credentials in `.env`
- Verify app password (for Gmail)
- Check server logs for errors
- Ensure port 587 is not blocked

**Emails going to spam?**
- Add SPF/DKIM records to your domain
- Use a professional email address
- Avoid spam trigger words

## 📝 Notes

- Emails are sent asynchronously (won't block order creation)
- If email fails, order still processes successfully
- Check server logs for email delivery status



import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // For development, set to true in production
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email service error:', error);
  } else {
    console.log('Email service is ready to send messages');
  }
});

// Email templates
const emailTemplates = {
  orderConfirmation: (order, customer) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #000000 0%, #2D5016 100%); color: white; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .item { padding: 10px 0; border-bottom: 1px solid #eee; }
        .total { font-size: 20px; font-weight: bold; color: #D4AF37; margin-top: 20px; }
        .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: #000; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏔️ Himalayan Shilajit</h1>
          <p>Order Confirmation</p>
        </div>
        <div class="content">
          <h2>Thank you for your order, ${customer.name}!</h2>
          <p>We're excited to process your order. Here are the details:</p>
          
          <div class="order-details">
            <h3>Order Number: ${order.orderNumber}</h3>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod.replace('_', ' ').toUpperCase()}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus.toUpperCase()}</p>
            
            <h4>Order Items:</h4>
            ${order.items.map(item => `
              <div class="item">
                <strong>${item.name}</strong><br>
                Quantity: ${item.quantity} × PKR ${item.price.toFixed(2)} = PKR ${(item.price * item.quantity).toFixed(2)}
              </div>
            `).join('')}
            
            <div class="total">
              <p>Subtotal: PKR ${order.subtotal.toFixed(2)}</p>
              <p>Shipping: ${order.shipping === 0 ? 'FREE' : 'PKR ' + order.shipping.toFixed(2)}</p>
              <p>Total: PKR ${order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div class="order-details">
            <h4>Delivery Address:</h4>
            <p>${customer.address.street}<br>
            ${customer.address.city}, ${customer.address.province}<br>
            ${customer.address.postalCode}, ${customer.address.country}</p>
          </div>
          
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/${order.orderNumber}" class="button">Track Your Order</a>
          
          <p style="margin-top: 30px;">We'll send you another email once your order ships!</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Himalayan Shilajit. All rights reserved.</p>
          <p>Questions? Contact us at ${process.env.SUPPORT_EMAIL || 'support@himalayanshilajit.com'}</p>
        </div>
      </div>
    </body>
    </html>
  `,

  paymentSuccess: (order, customer) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2D5016 0%, #4A7C2A 100%); color: white; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .success-box { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: #000; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Payment Successful!</h1>
        </div>
        <div class="content">
          <div class="success-box">
            <h2>Hello ${customer.name},</h2>
            <p>Your payment for Order <strong>${order.orderNumber}</strong> has been confirmed!</p>
            <p>Amount Paid: <strong>PKR ${order.total.toFixed(2)}</strong></p>
          </div>
          
          <p>Your order is now being processed and will be shipped soon.</p>
          <p>You'll receive tracking information once your order ships.</p>
          
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/${order.orderNumber}" class="button">View Order Details</a>
        </div>
      </div>
    </body>
    </html>
  `,

  cashOnDelivery: (order, customer) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2D5016 0%, #4A7C2A 100%); color: white; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .cod-box { background: #d4edda; border: 2px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .total { font-size: 24px; font-weight: bold; color: #D4AF37; margin-top: 20px; }
        .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: #000; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💵 Cash on Delivery</h1>
          <p>Order Confirmed</p>
        </div>
        <div class="content">
          <h2>Hello ${customer.name},</h2>
          <p>Your order has been placed successfully with Cash on Delivery!</p>
          
          <div class="cod-box">
            <h3 style="margin-top: 0;">Order Number: ${order.orderNumber}</h3>
            <p><strong>Total Amount:</strong> PKR ${order.total.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> Cash on Delivery</p>
          </div>
          
          <div class="order-details">
            <h3>Order Items:</h3>
            ${order.items.map(item => `
              <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <strong>${item.name}</strong><br>
                Quantity: ${item.quantity} × PKR ${item.price.toFixed(2)} = PKR ${(item.price * item.quantity).toFixed(2)}
              </div>
            `).join('')}
            
            <div class="total">
              <p>Subtotal: PKR ${order.subtotal.toFixed(2)}</p>
              <p>Shipping: ${order.shipping === 0 ? 'FREE' : 'PKR ' + order.shipping.toFixed(2)}</p>
              <p>Total: PKR ${order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div class="order-details">
            <h3>Delivery Address:</h3>
            <p>${customer.address.street}<br>
            ${customer.address.city}, ${customer.address.province}<br>
            ${customer.address.postalCode}, ${customer.address.country}</p>
          </div>
          
          <div class="cod-box">
            <h3 style="margin-top: 0;">📦 Payment Instructions:</h3>
            <ul style="text-align: left;">
              <li>Please have the exact amount ready: <strong>PKR ${order.total.toFixed(2)}</strong></li>
              <li>Our delivery person will collect payment upon delivery</li>
              <li>You'll receive a call before delivery</li>
              <li>Expected delivery: 3-5 business days</li>
            </ul>
          </div>
          
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/${order.orderNumber}" class="button">Track Your Order</a>
          
          <p style="margin-top: 30px;">Thank you for your order! We'll process it soon.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Himalayan Shilajit. All rights reserved.</p>
          <p>Questions? Contact us at ${process.env.SUPPORT_EMAIL || 'support@himalayanshilajit.com'}</p>
        </div>
      </div>
    </body>
    </html>
  `,

  orderShipped: (order, customer, trackingNumber) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); color: #000; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .tracking-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚚 Your Order Has Shipped!</h1>
        </div>
        <div class="content">
          <h2>Great news, ${customer.name}!</h2>
          <p>Your order <strong>${order.orderNumber}</strong> has been shipped.</p>
          
          <div class="tracking-box">
            <h3>Tracking Number:</h3>
            <p style="font-size: 24px; font-weight: bold; color: #D4AF37;">${trackingNumber}</p>
          </div>
          
          <p>You can track your package using the tracking number above.</p>
          <p>Expected delivery: 3-5 business days</p>
        </div>
      </div>
    </body>
    </html>
  `
};

// Send email function
export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Himalayan Shilajit" <${process.env.EMAIL_USER || 'noreply@himalayanshilajit.com'}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send order confirmation email
export const sendOrderConfirmation = async (order, customer) => {
  const html = emailTemplates.orderConfirmation(order, customer);
  return await sendEmail(
    customer.email,
    `Order Confirmation - ${order.orderNumber}`,
    html
  );
};

// Send payment success email
export const sendPaymentSuccess = async (order, customer) => {
  const html = emailTemplates.paymentSuccess(order, customer);
  return await sendEmail(
    customer.email,
    `Payment Confirmed - Order ${order.orderNumber}`,
    html
  );
};

// Send order shipped email
export const sendOrderShipped = async (order, customer, trackingNumber) => {
  const html = emailTemplates.orderShipped(order, customer, trackingNumber);
  return await sendEmail(
    customer.email,
    `Your Order Has Shipped - ${order.orderNumber}`,
    html
  );
};

// Send Cash on Delivery confirmation email
export const sendCashOnDeliveryConfirmation = async (order, customer) => {
  const html = emailTemplates.cashOnDelivery(order, customer);
  return await sendEmail(
    customer.email,
    `Order Confirmed - Cash on Delivery - ${order.orderNumber}`,
    html
  );
};

export default {
  sendEmail,
  sendOrderConfirmation,
  sendPaymentSuccess,
  sendOrderShipped,
  sendCashOnDeliveryConfirmation
};


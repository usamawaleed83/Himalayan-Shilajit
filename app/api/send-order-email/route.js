import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { order, customer } = await request.json();

    // Email to store owner
    const ownerEmail = await resend.emails.send({
      from: 'HerbalSource Orders <orders@herbalsource.store>',
      to: 'herbalsource.store@gmail.com',
      subject: `🛍️ New Order: ${order.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2C5F2D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .item { padding: 10px 0; border-bottom: 1px solid #eee; }
            .total { font-size: 20px; font-weight: bold; color: #D4AF37; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛍️ New Order Received!</h1>
            </div>
            <div class="content">
              <h2>Order Details</h2>
              <div class="order-details">
                <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                <p><strong>Payment Method:</strong> Cash on Delivery</p>
                <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <h3>Customer Information</h3>
              <div class="order-details">
                <p><strong>Name:</strong> ${customer.name}</p>
                <p><strong>Email:</strong> ${customer.email}</p>
                <p><strong>Phone:</strong> ${customer.phone}</p>
                <p><strong>Address:</strong><br>
                  ${customer.address.street}<br>
                  ${customer.address.city}, ${customer.address.province}<br>
                  ${customer.address.postalCode}, ${customer.address.country}
                </p>
              </div>

              <h3>Order Items</h3>
              <div class="order-details">
                ${order.items.map(item => `
                  <div class="item">
                    <strong>${item.name}</strong><br>
                    Quantity: ${item.quantity} × PKR ${item.price.toFixed(2)} = PKR ${(item.quantity * item.price).toFixed(2)}
                  </div>
                `).join('')}
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd;">
                  <p><strong>Subtotal:</strong> PKR ${order.subtotal.toFixed(2)}</p>
                  <p><strong>Shipping:</strong> ${order.shipping === 0 ? 'Free' : `PKR ${order.shipping.toFixed(2)}`}</p>
                  <p class="total">Total: PKR ${order.total.toFixed(2)}</p>
                </div>
              </div>

              <p style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <strong>⚠️ Action Required:</strong> Please contact the customer to confirm delivery details.
              </p>
            </div>
            <div class="footer">
              <p>HerbalSource - Premium Himalayan Shilajit</p>
              <p>Sialkot, Pakistan | +92 349 2832456</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Email to customer
    const customerEmail = await resend.emails.send({
      from: 'HerbalSource <orders@herbalsource.store>',
      to: customer.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2C5F2D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .item { padding: 10px 0; border-bottom: 1px solid #eee; }
            .total { font-size: 20px; font-weight: bold; color: #D4AF37; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background: #25D366; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Order Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${customer.name},</p>
              <p>Thank you for your order! We've received your order and will contact you shortly to confirm delivery details.</p>

              <div class="order-details">
                <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Payment Method:</strong> Cash on Delivery</p>
              </div>

              <h3>Order Summary</h3>
              <div class="order-details">
                ${order.items.map(item => `
                  <div class="item">
                    <strong>${item.name}</strong><br>
                    Quantity: ${item.quantity} × PKR ${item.price.toFixed(2)} = PKR ${(item.quantity * item.price).toFixed(2)}
                  </div>
                `).join('')}
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd;">
                  <p><strong>Subtotal:</strong> PKR ${order.subtotal.toFixed(2)}</p>
                  <p><strong>Shipping:</strong> ${order.shipping === 0 ? 'Free' : `PKR ${order.shipping.toFixed(2)}`}</p>
                  <p class="total">Total: PKR ${order.total.toFixed(2)}</p>
                </div>
              </div>

              <h3>Delivery Address</h3>
              <div class="order-details">
                <p>
                  ${customer.address.street}<br>
                  ${customer.address.city}, ${customer.address.province}<br>
                  ${customer.address.postalCode}, ${customer.address.country}
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://wa.me/923492832456?text=${encodeURIComponent(`Hi, I have a question about order ${order.orderNumber}`)}" class="button">
                  💬 Contact Us on WhatsApp
                </a>
              </div>

              <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0;"><strong>📦 What's Next?</strong></p>
                <ul style="margin: 10px 0;">
                  <li>We'll call you to confirm your order</li>
                  <li>Your order will be dispatched within 1-2 business days</li>
                  <li>Expected delivery: 3-5 business days</li>
                  <li>Payment will be collected upon delivery</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              <p><strong>HerbalSource</strong> - Premium Himalayan Shilajit</p>
              <p>Sialkot, Pakistan</p>
              <p>📧 herbalsource.store@gmail.com | 📱 +92 349 2832456</p>
              <p style="margin-top: 15px;">
                <a href="https://www.facebook.com/Herbalsource.store/" style="color: #666; margin: 0 5px;">Facebook</a> |
                <a href="https://www.instagram.com/herbalsource.store" style="color: #666; margin: 0 5px;">Instagram</a> |
                <a href="https://www.tiktok.com/@herbalsource6" style="color: #666; margin: 0 5px;">TikTok</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Emails sent successfully',
      ownerEmailId: ownerEmail.data?.id,
      customerEmailId: customerEmail.data?.id
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}

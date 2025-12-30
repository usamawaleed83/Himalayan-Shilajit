import express from 'express';
import { sendOrderConfirmation } from '../services/emailService.js';

const router = express.Router();

// Test email endpoint (for development/testing)
router.post('/test-order-email', async (req, res) => {
  try {
    const { testEmail } = req.body;
    
    if (!testEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'testEmail is required' 
      });
    }

    // Create a test order object
    const testOrder = {
      orderNumber: `HS-TEST-${Date.now()}`,
      customer: {
        name: 'Test User',
        email: testEmail,
        phone: '03001234567',
        address: {
          street: '123 Test Street',
          city: 'Karachi',
          province: 'Sindh',
          postalCode: '75500',
          country: 'Pakistan'
        }
      },
      items: [
        {
          name: 'Premium Himalayan Shilajit Resin',
          price: 49.99,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800'
        },
        {
          name: 'Himalayan Shilajit Capsules',
          price: 39.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800'
        }
      ],
      subtotal: 139.97,
      shipping: 0,
      total: 139.97,
      paymentMethod: 'easypaisa',
      paymentStatus: 'pending',
      orderStatus: 'pending',
      createdAt: new Date()
    };

    const result = await sendOrderConfirmation(testOrder, testOrder.customer);
    
    if (result.success) {
      res.json({
        success: true,
        message: `Test email sent successfully to ${testEmail}`,
        orderNumber: testOrder.orderNumber,
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending test email',
      error: error.message
    });
  }
});

export default router;



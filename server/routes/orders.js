import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendOrderConfirmation, sendCashOnDeliveryConfirmation } from '../services/emailService.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, paymentMethod, notes } = req.body;

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      let product;
      
      // Handle both MongoDB ObjectId and numeric IDs from frontend JSON
      const productIdStr = String(item.productId);
      const isNumericId = /^\d+$/.test(productIdStr) || typeof item.productId === 'number';
      
      if (isNumericId) {
        // Numeric ID - this is from frontend JSON data
        // Try to find by slug first (most reliable), then by name
        if (item.slug) {
          product = await Product.findOne({ slug: item.slug });
          console.log(`Looking up product by slug: ${item.slug}`, product ? 'Found' : 'Not found');
        }
        
        if (!product && item.name) {
          product = await Product.findOne({ name: item.name });
          console.log(`Looking up product by name: ${item.name}`, product ? 'Found' : 'Not found');
        }
        
        // If still not found, check if products exist in database
        if (!product) {
          const productCount = await Product.countDocuments();
          console.error(`Product lookup failed. Total products in DB: ${productCount}`);
          console.error('Item data:', JSON.stringify(item, null, 2));
          
          if (productCount === 0) {
            return res.status(400).json({ 
              success: false, 
              message: 'No products found in database. Please run: npm run seed (in server folder) to seed products.' 
            });
          }
          
          return res.status(400).json({ 
            success: false, 
            message: `Product not found. Product ID: ${item.productId}, Slug: ${item.slug || 'not provided'}, Name: ${item.name || 'not provided'}. Please ensure products are seeded.` 
          });
        }
      } else {
        // MongoDB ObjectId format - try direct lookup
        try {
          product = await Product.findById(item.productId);
        } catch (error) {
          // If ObjectId is invalid, try slug/name lookup
          if (item.slug) {
            product = await Product.findOne({ slug: item.slug });
          } else if (item.name) {
            product = await Product.findOne({ name: item.name });
          }
        }
      }
      
      if (!product) {
        return res.status(400).json({ 
          success: false, 
          message: `Product ${item.productId} not found. Please ensure products are seeded in the database.` 
        });
      }

      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Insufficient stock for ${product.name}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]
      });
    }

    // Calculate shipping (free over PKR 50)
    const shipping = subtotal >= 50 ? 0 : 9.99;
    const total = subtotal + shipping;

    // Create order
    // For Cash on Delivery, payment status stays pending until delivery
    const order = new Order({
      customer,
      items: orderItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
      notes,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'pending',
      orderStatus: paymentMethod === 'cash_on_delivery' ? 'processing' : 'pending' // COD orders can be processed immediately
    });

    await order.save();

    // Send order confirmation email (different template for COD)
    try {
      if (paymentMethod === 'cash_on_delivery') {
        await sendCashOnDeliveryConfirmation(order, customer);
        console.log('Cash on Delivery confirmation email sent to:', customer.email);
      } else {
        await sendOrderConfirmation(order, customer);
        console.log('Order confirmation email sent to:', customer.email);
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    res.status(201).json({ 
      success: true, 
      data: order,
      message: 'Order created successfully' 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status (Admin)
router.patch('/:orderNumber/status', async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      { orderStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;


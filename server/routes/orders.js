import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendOrderConfirmation, sendCashOnDeliveryConfirmation } from '../services/emailService.js';

const router = express.Router();

// In-memory storage for when MongoDB is not available
let inMemoryOrders = [];
let inMemoryProducts = [
  {
    _id: '1',
    id: 1,
    name: 'Premium Himalayan Shilajit Resin',
    slug: 'premium-himalayan-shilajit-resin',
    price: 49.99,
    stockQuantity: 100,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800']
  },
  {
    _id: '2',
    id: 2,
    name: 'Himalayan Shilajit Capsules',
    slug: 'himalayan-shilajit-capsules',
    price: 39.99,
    stockQuantity: 75,
    images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800']
  },
  {
    _id: '3',
    id: 3,
    name: 'Shilajit Powder - Organic',
    slug: 'shilajit-powder-organic',
    price: 44.99,
    stockQuantity: 60,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800']
  },
  {
    _id: '4',
    id: 4,
    name: 'Premium Shilajit Gift Set',
    slug: 'premium-shilajit-gift-set',
    price: 89.99,
    stockQuantity: 25,
    images: ['https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800']
  }
];

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  return process.env.MONGODB_URI && global.mongoose && global.mongoose.connection.readyState === 1;
};

// Create new order
router.post('/', async (req, res) => {
  console.log('📦 Order creation request received');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { customer, items, paymentMethod, notes } = req.body;

    console.log('Processing order for:', customer.name, 'Payment method:', paymentMethod);

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      let product;
      
      if (isMongoConnected()) {
        // MongoDB is available - use original logic
        const productIdStr = String(item.productId);
        const isNumericId = /^\d+$/.test(productIdStr) || typeof item.productId === 'number';
        
        if (isNumericId) {
          if (item.slug) {
            product = await Product.findOne({ slug: item.slug });
          }
          if (!product && item.name) {
            product = await Product.findOne({ name: item.name });
          }
        } else {
          try {
            product = await Product.findById(item.productId);
          } catch (error) {
            if (item.slug) {
              product = await Product.findOne({ slug: item.slug });
            } else if (item.name) {
              product = await Product.findOne({ name: item.name });
            }
          }
        }
      } else {
        // MongoDB not available - use in-memory data
        console.log('Using in-memory product data for testing');
        console.log('Looking for product:', item.productId, item.slug, item.name);
        product = inMemoryProducts.find(p => 
          p._id === String(item.productId) || 
          p.id === Number(item.productId) ||
          p.slug === item.slug || 
          p.name === item.name
        );
        console.log('Found product:', product ? product.name : 'Not found');
      }
      
      if (!product) {
        console.log('❌ Product not found:', item.productId || item.slug || item.name);
        return res.status(400).json({ 
          success: false, 
          message: `Product not found: ${item.productId || item.slug || item.name}` 
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

    // Generate order number
    const orderNumber = `HS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    console.log('💰 Order totals - Subtotal:', subtotal, 'Shipping:', shipping, 'Total:', total);

    // Create order object
    const orderData = {
      orderNumber,
      customer,
      items: orderItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
      notes,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'pending',
      orderStatus: paymentMethod === 'cash_on_delivery' ? 'processing' : 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let order;
    if (isMongoConnected()) {
      // Save to MongoDB
      order = new Order(orderData);
      await order.save();
      console.log('✅ Order saved to MongoDB:', orderNumber);
    } else {
      // Save to in-memory storage
      order = { ...orderData, _id: Date.now().toString() };
      inMemoryOrders.push(order);
      console.log('✅ Order saved to in-memory storage:', orderNumber);
    }

    // Send order confirmation email (different template for COD)
    try {
      if (paymentMethod === 'cash_on_delivery') {
        await sendCashOnDeliveryConfirmation(order, customer);
        console.log('📧 Cash on Delivery confirmation email sent to:', customer.email);
      } else {
        await sendOrderConfirmation(order, customer);
        console.log('📧 Order confirmation email sent to:', customer.email);
      }
    } catch (emailError) {
      console.error('❌ Failed to send order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    console.log('🎉 Order created successfully:', orderNumber);
    res.status(201).json({ 
      success: true, 
      data: order,
      message: 'Order created successfully' 
    });
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    let order;
    
    if (isMongoConnected()) {
      order = await Order.findOne({ orderNumber: req.params.orderNumber });
    } else {
      order = inMemoryOrders.find(o => o.orderNumber === req.params.orderNumber);
    }
    
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


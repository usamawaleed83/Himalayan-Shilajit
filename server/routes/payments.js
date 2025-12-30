import express from 'express';
import axios from 'axios';
import Order from '../models/Order.js';
import { sendPaymentSuccess, sendOrderShipped } from '../services/emailService.js';

const router = express.Router();

// Easypaisa Payment Integration
router.post('/easypaisa/initiate', async (req, res) => {
  try {
    const { orderNumber, amount, customerPhone } = req.body;

    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Easypaisa API Integration
    // Note: Replace with actual Easypaisa API credentials
    const easypaisaConfig = {
      storeId: process.env.EASYPAISA_STORE_ID || 'YOUR_STORE_ID',
      accountNum: process.env.EASYPAISA_ACCOUNT_NUM || 'YOUR_ACCOUNT_NUM',
      apiKey: process.env.EASYPAISA_API_KEY || 'YOUR_API_KEY',
      apiSecret: process.env.EASYPAISA_API_SECRET || 'YOUR_API_SECRET'
    };

    // Generate transaction reference
    const transactionRef = `EP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // In production, make actual API call to Easypaisa
    // For now, simulating the response
    const paymentResponse = {
      success: true,
      transactionRef,
      paymentUrl: `https://easypaisa.com.pk/payment/${transactionRef}`,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${transactionRef}`,
      message: 'Payment initiated successfully. Please complete payment via Easypaisa.'
    };

    // Update order with transaction reference
    order.paymentTransactionId = transactionRef;
    await order.save();

    res.json({
      success: true,
      data: paymentResponse,
      message: 'Payment initiated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Easypaisa Payment Callback/Webhook
router.post('/easypaisa/callback', async (req, res) => {
  try {
    const { transactionRef, status, amount } = req.body;

    const order = await Order.findOne({ paymentTransactionId: transactionRef });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (status === 'success' || status === 'completed') {
      order.paymentStatus = 'completed';
      order.orderStatus = 'processing';
      await order.save();

      // Send payment success email
      try {
        await sendPaymentSuccess(order, order.customer);
        console.log('Payment success email sent to:', order.customer.email);
      } catch (emailError) {
        console.error('Failed to send payment success email:', emailError);
      }

      res.json({ 
        success: true, 
        message: 'Payment confirmed',
        order: order.orderNumber 
      });
    } else {
      order.paymentStatus = 'failed';
      await order.save();

      res.json({ 
        success: false, 
        message: 'Payment failed',
        order: order.orderNumber 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bank Transfer Payment
router.post('/bank-transfer/initiate', async (req, res) => {
  try {
    const { orderNumber, bankName, transactionReference, amount } = req.body;

    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Bank account details
    const bankDetails = {
      accountTitle: 'Himalayan Shilajit',
      accountNumber: process.env.BANK_ACCOUNT_NUMBER || '1234567890123',
      bankName: process.env.BANK_NAME || 'Bank Name',
      iban: process.env.BANK_IBAN || 'PK00XXXX0000000000000000',
      branch: process.env.BANK_BRANCH || 'Main Branch',
      swiftCode: process.env.BANK_SWIFT || 'SWIFTCODE'
    };

    // Update order with bank transaction reference
    order.bankTransactionReference = transactionReference;
    order.paymentStatus = 'pending'; // Will be updated manually after verification
    await order.save();

    res.json({
      success: true,
      data: {
        bankDetails,
        transactionReference,
        instructions: `Please transfer PKR ${amount} to the above account and provide the transaction reference: ${transactionReference}. Your order will be processed after payment verification.`
      },
      message: 'Bank transfer details provided'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify Bank Transfer Payment (Admin)
router.post('/bank-transfer/verify', async (req, res) => {
  try {
    const { orderNumber, transactionReference, verified } = req.body;

    const order = await Order.findOne({ 
      orderNumber,
      bankTransactionReference: transactionReference 
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (verified) {
      order.paymentStatus = 'completed';
      order.orderStatus = 'processing';
      await order.save();

      // Send payment success email
      try {
        await sendPaymentSuccess(order, order.customer);
        console.log('Payment success email sent to:', order.customer.email);
      } catch (emailError) {
        console.error('Failed to send payment success email:', emailError);
      }

      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        order 
      });
    } else {
      res.json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cash on Delivery - Confirm Order
router.post('/cash-on-delivery/confirm', async (req, res) => {
  try {
    const { orderNumber } = req.body;

    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.paymentMethod !== 'cash_on_delivery') {
      return res.status(400).json({ 
        success: false, 
        message: 'Order is not a cash on delivery order' 
      });
    }

    // COD orders are already created with paymentStatus: 'pending'
    // They will be marked as 'completed' when payment is collected on delivery
    // For now, just confirm the order is ready for processing
    order.orderStatus = 'processing';
    await order.save();

    res.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        paymentMethod: 'cash_on_delivery',
        total: order.total,
        message: 'Order confirmed. Payment will be collected on delivery.',
        instructions: 'Please have the exact amount ready for delivery. Our delivery person will collect payment upon delivery.'
      },
      message: 'Cash on delivery order confirmed'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark COD Payment as Collected (Admin - when delivery is done)
router.post('/cash-on-delivery/collect', async (req, res) => {
  try {
    const { orderNumber, collected } = req.body;

    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.paymentMethod !== 'cash_on_delivery') {
      return res.status(400).json({ 
        success: false, 
        message: 'Order is not a cash on delivery order' 
      });
    }

    if (collected) {
      order.paymentStatus = 'completed';
      order.orderStatus = 'delivered';
      await order.save();

      // Send payment success email
      try {
        await sendPaymentSuccess(order, order.customer);
        console.log('COD payment confirmation email sent to:', order.customer.email);
      } catch (emailError) {
        console.error('Failed to send payment confirmation email:', emailError);
      }

      res.json({ 
        success: true, 
        message: 'Payment collected and order delivered',
        order 
      });
    } else {
      res.json({ 
        success: false, 
        message: 'Payment collection failed' 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Payment Status
router.get('/status/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        total: order.total,
        paymentMethod: order.paymentMethod
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

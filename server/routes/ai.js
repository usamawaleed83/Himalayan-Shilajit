import express from 'express';
import { getProductRecommendations, getChatbotResponse, enhanceProductDescription } from '../services/aiService.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get AI-powered product recommendations
router.post('/recommendations', async (req, res) => {
  try {
    const { userId, preferences } = req.body;
    const recommendations = await getProductRecommendations(userId, preferences);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Chatbot endpoint
router.post('/chatbot', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message is required' 
      });
    }
    
    console.log('📨 Chatbot request received:', message.substring(0, 50));
    const response = await getChatbotResponse(message, context);
    console.log('✅ Chatbot response sent:', response.success ? 'Success' : 'Failed');
    
    res.json(response);
  } catch (error) {
    console.error('❌ Chatbot endpoint error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Enhance product description with AI
router.post('/enhance-product/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    const enhancedDescription = await enhanceProductDescription(product);
    res.json({ 
      success: true, 
      original: product.description,
      enhanced: enhancedDescription 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;


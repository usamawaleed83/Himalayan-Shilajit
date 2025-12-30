import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

// Initialize Google Gemini AI client
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Log Gemini initialization status
if (genAI) {
  const apiKeyPreview = process.env.GEMINI_API_KEY 
    ? process.env.GEMINI_API_KEY.substring(0, 20) + '...' 
    : 'Not set';
  console.log('✅ Gemini AI initialized');
  console.log('   API Key:', apiKeyPreview);
} else {
  console.log('⚠️  Gemini API key not found. Chatbot will use fallback responses.');
  console.log('   Set GEMINI_API_KEY in server/.env to enable full AI features');
  console.log('   Current GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set but invalid' : 'Not set');
}

// Log Gemini initialization status
if (genAI) {
  console.log('✅ Gemini AI initialized with API key');
} else {
  console.log('⚠️  Gemini API key not found. Chatbot will use fallback responses.');
  console.log('   Set GEMINI_API_KEY in .env to enable full AI features');
}

// Get Gemini model (using Gemini 2.0 Flash Experimental - latest Flash model)
const getModel = () => {
  if (!genAI) {
    return null;
  }
  // Using gemini-2.0-flash-exp (Gemini 2.5 Flash equivalent - latest experimental Flash)
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    return model;
  } catch (error) {
    console.error('❌ Error loading Gemini model:', error.message);
    return null;
  }
};

// AI-powered product recommendations
export const getProductRecommendations = async (userId, userPreferences = {}) => {
  try {
    // Get all products from MongoDB
    const products = await Product.find({ inStock: true });
    
    if (!getModel()) {
      // Fallback: Simple recommendation based on featured products
      return {
        success: true,
        recommendations: products.filter(p => p.featured).slice(0, 3),
        message: 'Featured products for you'
      };
    }

    // Create product descriptions for AI
    const productDescriptions = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      benefits: p.benefits?.join(', ') || '',
      price: p.price
    }));

    // Use Gemini AI to generate recommendations
    const model = getModel();
    const prompt = `Based on these Himalayan Shilajit products, recommend the top 3 products for a customer interested in wellness and natural supplements. 
    
    Products:
    ${productDescriptions.map(p => `- ${p.name}: ${p.description}. Benefits: ${p.benefits}. Price: PKR ${p.price}`).join('\n')}
    
    Return only the product IDs in JSON format: {"recommendations": ["id1", "id2", "id3"]}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const responseData = jsonMatch ? JSON.parse(jsonMatch[0]) : { recommendations: [] };
    const recommendedIds = responseData.recommendations || [];
    
    const recommendations = products.filter(p => 
      recommendedIds.includes(p._id.toString())
    ).slice(0, 3);

    return {
      success: true,
      recommendations: recommendations.length > 0 ? recommendations : products.filter(p => p.featured).slice(0, 3),
      message: 'AI-powered recommendations for you'
    };
  } catch (error) {
    console.error('AI recommendation error:', error);
    // Fallback to featured products
    const products = await Product.find({ featured: true, inStock: true }).limit(3);
    return {
      success: true,
      recommendations: products,
      message: 'Featured products for you'
    };
  }
};

// AI chatbot response using Gemini 2.5 Flash - General Purpose Assistant
export const getChatbotResponse = async (message, context = {}) => {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment variables');
      return getFallbackResponse(message);
    }

    // Check if genAI is initialized
    if (!genAI) {
      console.error('❌ Gemini AI client not initialized');
      return getFallbackResponse(message);
    }

    // Get model
    const model = getModel();
    
    if (!model) {
      console.error('❌ Failed to get Gemini model');
      return getFallbackResponse(message);
    }
    
    // General-purpose - Gemini can answer ANYTHING!
    // No restrictions - just like using Gemini chatbot directly
    // User can ask about: science, history, math, coding, general knowledge, etc.
    console.log('🤖 Sending to Gemini:', message.substring(0, 50) + '...');
    console.log('🔑 API Key present:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');
    
    try {
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ Gemini response received:', text.substring(0, 100) + '...');

      // Generate contextual suggestions based on the response
      const suggestions = generateSuggestions(message, text);

      return {
        success: true,
        response: text.trim(),
        suggestions: suggestions
      };
    } catch (geminiError) {
      console.error('❌ Gemini API Error:', geminiError.message);
      console.error('❌ Full error:', geminiError);
      
      // Return error details in development
      if (process.env.NODE_ENV === 'development') {
        return {
          success: false,
          response: `Gemini API Error: ${geminiError.message}. Please check server logs for details.`,
          suggestions: ['Try again', 'Check API key', 'Contact support']
        };
      }
      
      return getFallbackResponse(message);
    }
  } catch (error) {
    console.error('❌ AI chatbot error:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    // Return detailed error in development
    if (process.env.NODE_ENV === 'development') {
      return {
        success: false,
        response: `Error: ${error.message}. Check server logs for details.`,
        suggestions: ['Try again', 'Check configuration', 'Contact support']
      };
    }
    
    // Even on error, try to provide a helpful fallback
    return getFallbackResponse(message);
  }
};

// Generate contextual suggestions based on message and response
const generateSuggestions = (message, response) => {
  const lowerMessage = message.toLowerCase();
  const lowerResponse = response.toLowerCase();
  
  // If it's a product/store question, suggest store-related options
  if (lowerMessage.includes('shilajit') || lowerMessage.includes('product') || 
      lowerMessage.includes('order') || lowerMessage.includes('buy') ||
      lowerMessage.includes('price') || lowerMessage.includes('shipping')) {
    return ['View Products', 'Shipping Info', 'Place Order'];
  }
  
  // If it's a general question, suggest follow-up options
  if (lowerResponse.includes('health') || lowerResponse.includes('wellness')) {
    return ['More about wellness', 'Product benefits', 'Ask another question'];
  }
  
  // Default suggestions
  return ['Ask another question', 'Product information', 'Store help'];
};

// Fallback responses when AI is not available
const getFallbackResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
    return {
      success: true,
      response: 'We offer free shipping on orders over PKR 50. Standard delivery takes 3-5 business days within Pakistan. International shipping is also available!',
      suggestions: ['Order tracking', 'Shipping rates', 'International shipping']
    };
  }
  
  if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
    return {
      success: true,
      response: 'We accept Easypaisa and Bank Transfer. All payments are secure and encrypted. You can also pay via bank transfer for added security.',
      suggestions: ['Payment methods', 'Refund policy', 'Order status']
    };
  }
  
  if (lowerMessage.includes('benefit') || lowerMessage.includes('help') || lowerMessage.includes('what')) {
    return {
      success: true,
      response: 'Himalayan Shilajit offers numerous benefits including increased energy, immune support, mental clarity, and contains 84+ essential minerals. It\'s nature\'s most potent wellness resin!',
      suggestions: ['Energy boost', 'Immune support', 'Mental clarity']
    };
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return {
      success: true,
      response: 'Our products range from PKR 39.99 to PKR 89.99. We offer discounts on bulk orders and free shipping on orders over PKR 50. Check out our products page for current prices!',
      suggestions: ['View products', 'Discounts', 'Bulk orders']
    };
  }
  
  if (lowerMessage.includes('authentic') || lowerMessage.includes('quality')) {
    return {
      success: true,
      response: 'Yes! Our Shilajit is 100% authentic, sourced directly from the Himalayas. All products are lab-tested for purity and quality. We guarantee authenticity!',
      suggestions: ['Lab testing', 'Source information', 'Quality guarantee']
    };
  }
  
  return {
    success: true,
    response: 'Thank you for your question! Our Himalayan Shilajit products are 100% authentic and sourced directly from the Himalayas. How can I help you today? You can ask about products, shipping, payments, or benefits.',
    suggestions: ['Product information', 'Ordering', 'Shipping']
  };
};

// AI-powered product descriptions enhancement using Gemini
export const enhanceProductDescription = async (product) => {
  try {
    if (!getModel()) {
      return product.description;
    }

    const model = getModel();
    const prompt = `Enhance this product description to be more engaging and professional while keeping it authentic and informative:
    
    Product: ${product.name}
    Current Description: ${product.description}
    Benefits: ${product.benefits?.join(', ') || 'Wellness and vitality'}
    
    Return only the enhanced description, make it compelling but honest.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('AI enhancement error:', error);
    return product.description;
  }
};

export default {
  getProductRecommendations,
  getChatbotResponse,
  enhanceProductDescription
};

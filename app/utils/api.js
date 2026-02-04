// Next.js API configuration - Using Vercel API Routes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  },

  getFeaturedProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    return response.json();
  },

  getProductBySlug: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`);
    return response.json();
  },

  // Orders
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  getOrder: async (orderNumber) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}`);
    return response.json();
  },

  // Payments (Mock for now)
  initiateEasypaisaPayment: async (paymentData) => {
    // Mock response for Easypaisa
    return {
      success: true,
      data: {
        transactionRef: `EP-${Date.now()}`,
        paymentUrl: '#',
        message: 'Mock Easypaisa payment initiated'
      }
    };
  },

  initiateBankTransfer: async (paymentData) => {
    // Mock response for Bank Transfer
    return {
      success: true,
      data: {
        transactionReference: `BT-${Date.now()}`,
        bankDetails: {
          accountTitle: 'HerbalSource',
          accountNumber: '1234567890',
          bankName: 'Mock Bank',
          iban: 'PK36MOCK0000001234567890',
          branch: 'Main Branch'
        },
        instructions: 'Please transfer the amount and send screenshot to support.'
      }
    };
  },

  getPaymentStatus: async (orderNumber) => {
    return {
      success: true,
      data: { status: 'pending' }
    };
  },

  // AI Services (Mock for now)
  getChatbotResponse: async (message, context = {}) => {
    return {
      success: true,
      data: {
        response: 'Hello! This is a mock response. The AI chatbot will be connected soon.',
        context: context
      }
    };
  },

  getProductRecommendations: async (userId, preferences = {}) => {
    return {
      success: true,
      data: []
    };
  },
};
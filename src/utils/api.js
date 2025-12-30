const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

  // Payments
  initiateEasypaisaPayment: async (paymentData) => {
    const response = await fetch(`${API_BASE_URL}/payments/easypaisa/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  },

  initiateBankTransfer: async (paymentData) => {
    const response = await fetch(`${API_BASE_URL}/payments/bank-transfer/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  },

  getPaymentStatus: async (orderNumber) => {
    const response = await fetch(`${API_BASE_URL}/payments/status/${orderNumber}`);
    return response.json();
  },

  // AI Services
  getChatbotResponse: async (message, context = {}) => {
    const response = await fetch(`${API_BASE_URL}/ai/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, context }),
    });
    return response.json();
  },

  getProductRecommendations: async (userId, preferences = {}) => {
    const response = await fetch(`${API_BASE_URL}/ai/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, preferences }),
    });
    return response.json();
  },
};


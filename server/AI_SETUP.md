# AI Integration Setup Guide

## 🤖 AI Features Included

1. **AI-Powered Product Recommendations**
   - Personalized product suggestions
   - Based on user preferences and product data

2. **AI Chatbot**
   - Intelligent customer support
   - Answers questions about products, shipping, payments

3. **Product Description Enhancement**
   - AI-enhanced product descriptions
   - More engaging and professional content

## 🔧 OpenAI Setup (Optional)

### Without OpenAI API Key:
- System works with fallback rule-based responses
- Product recommendations use featured products
- Chatbot uses predefined responses

### With OpenAI API Key (Enhanced):

1. **Get API Key**:
   - Sign up at https://platform.openai.com
   - Create API key
   - Copy the key

2. **Add to `.env`**:
```env
OPENAI_API_KEY=sk-your-api-key-here
```

3. **Features Enabled**:
   - ✅ Intelligent product recommendations
   - ✅ Natural language chatbot
   - ✅ Enhanced product descriptions

## 📡 API Endpoints

### Get AI Recommendations
```bash
POST /api/ai/recommendations
Body: { "userId": "user123", "preferences": {} }
```

### Chatbot
```bash
POST /api/ai/chatbot
Body: { "message": "What are the benefits of Shilajit?" }
```

### Enhance Product Description
```bash
POST /api/ai/enhance-product/:productId
```

## 💰 Cost Considerations

- OpenAI API charges per request
- GPT-3.5-turbo is cost-effective (~$0.002 per request)
- System gracefully falls back if API key not provided

## ✅ Testing

Test AI features:
```bash
# Test chatbot
curl -X POST http://localhost:5000/api/ai/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Shilajit"}'

# Test recommendations
curl -X POST http://localhost:5000/api/ai/recommendations \
  -H "Content-Type: application/json" \
  -d '{"userId": "test123"}'
```

## 🎯 Usage

The AI features are automatically integrated:
- Frontend chatbot component uses AI service
- Product recommendations appear on homepage
- All features work with or without OpenAI API key





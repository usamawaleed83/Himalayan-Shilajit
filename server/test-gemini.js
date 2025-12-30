import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function testGemini() {
  console.log('🧪 Testing Gemini API Connection...\n');
  
  // Check API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    console.log('\nPlease add to server/.env:');
    console.log('GEMINI_API_KEY=AIzaSyB17H1eVG0OWaCGx9a5V_EKNoeNJiS0ktY');
    process.exit(1);
  }
  
  console.log('✅ API Key found:', apiKey.substring(0, 20) + '...');
  
  try {
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ Gemini client initialized');
    
    // Get model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    console.log('✅ Model loaded: gemini-2.0-flash-exp');
    
    // Test with a simple question
    console.log('\n📤 Sending test message: "What is 2+2?"');
    const result = await model.generateContent('What is 2+2?');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Response received:');
    console.log('📥', text);
    
    console.log('\n✅ Gemini API is working correctly!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error testing Gemini API:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Details:', error);
    
    if (error.message.includes('API_KEY')) {
      console.log('\n💡 Tip: Check if your API key is valid');
    }
    if (error.message.includes('quota') || error.message.includes('limit')) {
      console.log('\n💡 Tip: You may have exceeded API quota');
    }
    
    process.exit(1);
  }
}

testGemini();



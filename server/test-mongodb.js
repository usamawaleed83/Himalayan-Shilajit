import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://himmachelshilajit:%3CU123456K%21%3E@cluster0.6rlcjvr.mongodb.net/himalayan-shilajit';
    
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', mongoURI.replace(/:[^:@]+@/, ':****@')); // Hide password
    
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    };
    
    await mongoose.connect(mongoURI, options);
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection test passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check MongoDB Atlas IP whitelist');
    console.error('2. Verify connection string format');
    console.error('3. Check internet connection');
    console.error('4. Verify cluster is running in Atlas');
    process.exit(1);
  }
};

testConnection();



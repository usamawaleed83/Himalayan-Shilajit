import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import aiRoutes from './routes/ai.js';
import testEmailRoutes from './routes/testEmail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Database connection
const connectDB = async () => {
  try {
    // Using MongoDB Atlas or local MongoDB
    let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/himalayan-shilajit';

    // Ensure database name is included
    if (mongoURI.includes('mongodb+srv://') && !mongoURI.includes('?')) {
      // Add database name if not present
      if (!mongoURI.endsWith('/himalayan-shilajit')) {
        mongoURI = mongoURI.endsWith('/')
          ? mongoURI + 'himalayan-shilajit'
          : mongoURI + '/himalayan-shilajit';
      }
    }

    // Connection options for better reliability
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    await mongoose.connect(mongoURI, options);
    console.log('✅ MongoDB Connected Successfully');
    console.log('Database:', mongoose.connection.name);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Connection string format:', process.env.MONGODB_URI ? 'Set' : 'Not set');

    // Provide helpful error messages
    if (error.code === 'ESERVFAIL') {
      console.error('\n⚠️  DNS Resolution Failed. Possible issues:');
      console.error('1. Check your internet connection');
      console.error('2. Verify MongoDB Atlas cluster is running');
      console.error('3. Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for testing)');
      console.error('4. Verify connection string format');
    }

    // Rethrow error to stop server startup
    throw error;
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/test', testEmailRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Database connection and server startup
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();



import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

dotenv.config();

const testOrder = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/himalayan-shilajit';
        let finalURI = mongoURI;

        if (mongoURI.includes('mongodb+srv://') && !mongoURI.includes('?')) {
            if (!mongoURI.endsWith('/himalayan-shilajit')) {
                finalURI = mongoURI.endsWith('/')
                    ? mongoURI + 'himalayan-shilajit'
                    : mongoURI + '/himalayan-shilajit';
            }
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(finalURI);
        console.log('✅ Connected');

        // Get a product to use
        const product = await Product.findOne();
        if (!product) {
            throw new Error('No products found to create order with');
        }

        const orderData = {
            customer: {
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                address: {
                    street: '123 Test St',
                    city: 'Test City',
                    province: 'Punjab',
                    postalCode: '54000'
                }
            },
            items: [{
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0]
            }],
            subtotal: product.price,
            shipping: 0,
            total: product.price,
            paymentMethod: 'cash_on_delivery', // Testing COD as requested
            notes: 'Test order'
        };

        console.log('Attempting to create order...');
        const order = new Order(orderData);
        await order.save(); // This triggers validation

        console.log('✅ Order created successfully!');
        console.log('Order Number:', order.orderNumber);
        console.log('Payment Method:', order.paymentMethod);
        console.log('Status:', order.paymentStatus);

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error creating order:', error.message);
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`- ${key}: ${error.errors[key].message}`);
            });
        }
        process.exit(1);
    }
};

testOrder();


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load env vars like server does
dotenv.config();

const verify = async () => {
    try {
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

        console.log(`🔌 Connecting to: ${mongoURI.replace(/:[^:]*@/, ':****@')}`); // hide creds if any

        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');
        console.log('Database name:', mongoose.connection.name);

        const count = await Product.countDocuments();
        console.log(`📊 Total Products Found: ${count}`);

        if (count > 0) {
            const products = await Product.find().limit(3);
            console.log('📦 Sample Products:');
            products.forEach(p => console.log(` - ${p.name} (ID: ${p._id})`));
        } else {
            console.log('❌ No products found in this database.');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error verifying products:', error);
        process.exit(1);
    }
};

verify();

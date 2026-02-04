import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/himalayan-shilajit');

        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (adminExists) {
            console.log('Use existing admin: admin@example.com / admin123');
            process.exit();
        }

        const user = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123', // Will be hashed by pre-save hook
            role: 'admin'
        });

        console.log('Admin User Created:');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();

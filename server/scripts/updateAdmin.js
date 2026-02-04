import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/himalayan-shilajit');

        // Find the existing admin or the user created by the user (if any)
        let user = await User.findOne({ email: 'admin@example.com' });

        if (user) {
            user.email = 'usamawaleed83@gmail.com';
            await user.save();
            console.log('✅ Updated admin email to: usamawaleed83@gmail.com');
            console.log('Password remains: admin123');
        } else {
            // Check if user already registered with this email
            user = await User.findOne({ email: 'usamawaleed83@gmail.com' });
            if (user) {
                user.role = 'admin';
                await user.save();
                console.log('✅ Promoted usamawaleed83@gmail.com to admin');
            } else {
                // Create if doesn't exist
                await User.create({
                    name: 'Usama Waleed',
                    email: 'usamawaleed83@gmail.com',
                    password: 'admin123',
                    role: 'admin'
                });
                console.log('✅ Created new admin: usamawaleed83@gmail.com / admin123');
            }
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

updateAdmin();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const fixAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const email = 'usamawaleed83@gmail.com';
        const password = 'admin123';

        // Delete existing
        await User.deleteMany({ email });
        console.log(`🗑️  Deleted existing users with email: ${email}`);

        // Create fresh
        const user = new User({
            name: 'Usama Waleed',
            email: email,
            password: password, // This will be hashed by pre-save hook
            role: 'admin'
        });

        await user.save();
        console.log(`✨ Created fresh admin user: ${email}`);
        console.log(`🔑 Password set to: ${password}`);

        // Verify hash
        const foundUser = await User.findOne({ email });
        const isMatch = await foundUser.matchPassword(password);
        console.log(`🧪 Self-Verification Match: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during fix:', error.message);
        process.exit(1);
    }
};

fixAdmin();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const verifyLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/himalayan-shilajit');

        const email = 'usamawaleed83@gmail.com';
        const password = 'admin123';

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User not found: ${email}`);
        } else {
            console.log(`✅ User found: ${email}`);
            console.log(`Role: ${user.role}`);

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                console.log(`✅ Password 'admin123' matches the hash in DB.`);
            } else {
                console.log(`❌ Password 'admin123' DOES NOT match the hash in DB.`);

                // Reset it right now to be sure
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();
                console.log(`🔄 Password has been forcibly reset to 'admin123'`);
            }
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyLogin();

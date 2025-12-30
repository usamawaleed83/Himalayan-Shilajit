import mongoose from 'mongoose';

const uri = 'mongodb+srv://himmachelshilajit:U112233445566k@cluster0.6rlcjvr.mongodb.net/himalayan-shilajit';

console.log('Attempting to connect to MongoDB Atlas...');

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB Atlas');
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILURE: Could not connect to MongoDB Atlas');
        console.error('Error:', err.message);
        if (err.cause) console.error('Cause:', err.cause);
        process.exit(1);
    });

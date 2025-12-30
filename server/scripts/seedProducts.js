import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productsData = JSON.parse(
  fs.readFileSync(join(__dirname, '../../src/data/products.json'), 'utf-8')
);

const seedProducts = async () => {
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

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');

    // Remove 'id' field from products (MongoDB will create _id)
    const productsToInsert = productsData.map(({ id, ...product }) => ({
      ...product,
      stockQuantity: product.stockQuantity || 100 // Set default stock
    }));

    // Insert products
    const products = await Product.insertMany(productsToInsert);
    console.log(`✅ Seeded ${products.length} products successfully`);

    // Show some product details
    console.log('\n📦 Sample products:');
    products.slice(0, 3).forEach(p => {
      console.log(`  - ${p.name} (slug: ${p.slug})`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

seedProducts();


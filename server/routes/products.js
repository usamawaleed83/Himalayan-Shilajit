import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// In-memory storage for when MongoDB is not available
let inMemoryProducts = [
  {
    _id: '1',
    id: 1,
    name: 'Premium Himalayan Shilajit Resin',
    slug: 'premium-himalayan-shilajit-resin',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800'
    ],
    description: 'Pure, authentic Himalayan Shilajit resin sourced directly from the mountains. This premium resin is rich in fulvic acid and over 84 minerals essential for optimal health and vitality.',
    benefits: [
      'Boosts energy and stamina naturally',
      'Supports immune system function',
      'Enhances cognitive performance',
      'Promotes healthy aging',
      'Improves physical endurance'
    ],
    ingredients: '100% Pure Himalayan Shilajit Resin, No additives or fillers',
    usage: 'Take a pea-sized amount (200-300mg) once or twice daily. Dissolve in warm water, milk, or tea. Best taken on an empty stomach.',
    inStock: true,
    featured: true,
    stockQuantity: 100
  },
  {
    _id: '2',
    id: 2,
    name: 'Himalayan Shilajit Capsules',
    slug: 'himalayan-shilajit-capsules',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'
    ],
    description: 'Convenient capsule form of our premium Shilajit. Each capsule contains 500mg of pure Shilajit extract for easy daily supplementation.',
    benefits: [
      'Convenient daily supplementation',
      'Pre-measured dosage',
      'Easy to take on the go',
      'Same premium quality as resin',
      'No taste, easy to swallow'
    ],
    ingredients: 'Pure Himalayan Shilajit Extract (500mg per capsule), Vegetable Cellulose Capsule',
    usage: 'Take 1-2 capsules daily with water, preferably on an empty stomach or 30 minutes before meals.',
    inStock: true,
    featured: true,
    stockQuantity: 75
  },
  {
    _id: '3',
    id: 3,
    name: 'Shilajit Powder - Organic',
    slug: 'shilajit-powder-organic',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800'
    ],
    description: 'Organic Shilajit powder for versatile use. Mix into smoothies, teas, or your favorite beverages. 100% pure and organic certified.',
    benefits: [
      'Versatile and easy to mix',
      'Organic certified',
      'Same mineral richness',
      'Perfect for smoothies',
      'Long shelf life'
    ],
    ingredients: '100% Organic Himalayan Shilajit Powder',
    usage: 'Mix 200-300mg (1/4 teaspoon) into your favorite beverage, smoothie, or food. Take 1-2 times daily.',
    inStock: true,
    featured: false,
    stockQuantity: 60
  },
  {
    _id: '4',
    id: 4,
    name: 'Premium Shilajit Gift Set',
    slug: 'premium-shilajit-gift-set',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800'
    ],
    description: 'Perfect gift set containing our premium resin, capsules, and powder. Everything you need to experience the full benefits of Shilajit.',
    benefits: [
      'Complete Shilajit collection',
      'Perfect for gifting',
      'Try all forms',
      'Great value',
      'Elegant packaging'
    ],
    ingredients: 'Premium Himalayan Shilajit Resin, Capsules, and Powder',
    usage: 'Choose your preferred form and follow individual product instructions.',
    inStock: true,
    featured: true,
    stockQuantity: 25
  }
];

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  return process.env.MONGODB_URI && global.mongoose && global.mongoose.connection.readyState === 1;
};

// Get all products
router.get('/', async (req, res) => {
  try {
    let products;
    
    if (isMongoConnected()) {
      products = await Product.find({});
    } else {
      console.log('Using in-memory product data');
      products = inMemoryProducts;
    }
    
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to in-memory data
    res.json({ success: true, data: inMemoryProducts });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    let products;
    
    if (isMongoConnected()) {
      products = await Product.find({ featured: true });
    } else {
      console.log('Using in-memory featured product data');
      products = inMemoryProducts.filter(p => p.featured);
    }
    
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Fallback to in-memory data
    res.json({ success: true, data: inMemoryProducts.filter(p => p.featured) });
  }
});

// Get single product by slug
router.get('/:slug', async (req, res) => {
  try {
    let product;
    
    if (isMongoConnected()) {
      product = await Product.findOne({ slug: req.params.slug });
    } else {
      console.log('Using in-memory product data for slug:', req.params.slug);
      product = inMemoryProducts.find(p => p.slug === req.params.slug);
    }
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    // Fallback to in-memory data
    const product = inMemoryProducts.find(p => p.slug === req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  }
});

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed!'));
  }
});

// Upload image endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;





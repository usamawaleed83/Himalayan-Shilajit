import { NextResponse } from 'next/server';

// In-memory products data (same as your server)
const products = [
  {
    _id: '1',
    id: 1,
    name: 'Premium HerbalSource Shilajit Resin',
    slug: 'premium-herbalsource-shilajit-resin',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800'
    ],
    description: 'Pure, authentic HerbalSource Shilajit resin sourced directly from the mountains. This premium resin is rich in fulvic acid and over 84 minerals essential for optimal health and vitality.',
    benefits: [
      'Boosts energy and stamina naturally',
      'Supports immune system function',
      'Enhances cognitive performance',
      'Promotes healthy aging',
      'Improves physical endurance'
    ],
    ingredients: '100% Pure HerbalSource Shilajit Resin, No additives or fillers',
    usage: 'Take a pea-sized amount (200-300mg) once or twice daily. Dissolve in warm water, milk, or tea. Best taken on an empty stomach.',
    inStock: true,
    featured: true,
    stockQuantity: 100
  },
  {
    _id: '2',
    id: 2,
    name: 'HerbalSource Shilajit Capsules',
    slug: 'herbalsource-shilajit-capsules',
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
    ingredients: 'Pure HerbalSource Shilajit Extract (500mg per capsule), Vegetable Cellulose Capsule',
    usage: 'Take 1-2 capsules daily with water, preferably on an empty stomach or 30 minutes before meals.',
    inStock: true,
    featured: true,
    stockQuantity: 75
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
    ingredients: 'Premium HerbalSource Shilajit Resin, Capsules, and Powder',
    usage: 'Choose your preferred form and follow individual product instructions.',
    inStock: true,
    featured: true,
    stockQuantity: 25
  }
];

export async function GET() {
  try {
    const featuredProducts = products.filter(product => product.featured);
    console.log('⭐ Featured Products API called - returning', featuredProducts.length, 'products');
    return NextResponse.json({ 
      success: true, 
      data: featuredProducts 
    });
  } catch (error) {
    console.error('❌ Featured Products API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
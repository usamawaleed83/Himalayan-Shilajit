import { NextResponse } from 'next/server';

// In-memory products data
const products = [
  {
    _id: '1',
    id: 1,
    name: 'HerbalSource Shilajit',
    slug: 'herbalsource-shilajit',
    price: 6000,
    originalPrice: 9000,
    discount: 33,
    images: [
      '/images/herbalsource-gift-box.jpg',
      '/images/herbalsource-gift-box.jpg',
      '/images/herbalsource-gift-box.jpg'
    ],
    description: 'HerbalSource Shilajit – Pure Sunlight Activated Himalayan Resin. Discover the purest form of Himalayan energy with HerbalSource Shilajit, harvested from high-altitude mountain rocks and naturally activated in pure sunlight for maximum potency. Our traditional sun-curing process preserves the resin\'s full spectrum minerals, fulvic acid, and bioactive compounds, delivering unmatched purity and strength.',
    benefits: [
      '🌞 Sunlight Activated Processing – Naturally cured under direct Himalayan sunlight for superior potency',
      '🏔️ Himalayan Origin – Sourced from pristine, pollution-free high-altitude regions',
      '💎 Premium Gold-Grade Resin – Thick, glossy, and mineral-rich for ultimate absorption',
      '🧪 Lab Tested & Purified – Free from heavy metals and contaminants',
      '🌿 100% Natural & Authentic – No additives, fillers, or artificial heat processing',
      'Boosts energy, stamina, and overall vitality',
      'Enhances immunity and metabolic function',
      'Supports cognitive performance and focus',
      'Promotes hormonal balance and healthy aging'
    ],
    ingredients: '100% Pure Himalayan Shilajit Resin - Sunlight activated, no additives, fillers, or artificial heat processing',
    usage: 'Dissolve a small pea-sized amount in warm water, milk, or tea. Use daily for best results.',
    inStock: true,
    featured: true,
    stockQuantity: 100
  }
];

export async function GET() {
  try {
    console.log('📦 Products API called - returning', products.length, 'products');
    return NextResponse.json({ 
      success: true, 
      data: products 
    });
  } catch (error) {
    console.error('❌ Products API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
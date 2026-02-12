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
    stockQuantity: 100,
    reviews: [
      {
        id: 1,
        name: 'Ahmed Khan',
        rating: 5,
        comment: 'The sunlight activation makes a real difference! I can feel the potency. My energy levels have improved dramatically.',
        date: '2024-02-10'
      },
      {
        id: 2,
        name: 'Fatima Ali',
        rating: 5,
        comment: 'Authentic Himalayan quality! The gold-grade resin is thick and pure. Best Shilajit I have tried.',
        date: '2024-02-08'
      },
      {
        id: 3,
        name: 'Hassan Malik',
        rating: 5,
        comment: 'Lab tested and truly natural. I trust HerbalSource for combining tradition with modern purity standards.',
        date: '2024-02-05'
      }
    ]
  }
];

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const product = products.find(p => p.slug === slug);
    
    if (!product) {
      console.log('❌ Product not found:', slug);
      return NextResponse.json({ 
        success: false, 
        message: 'Product not found' 
      }, { status: 404 });
    }

    console.log('📦 Product by slug API called - returning product:', product.name);
    return NextResponse.json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('❌ Product by slug API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}

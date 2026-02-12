import { NextResponse } from 'next/server';

// In-memory products data
const products = [
  {
    _id: '1',
    id: 1,
    name: 'HerbalSource Premium Shilajit Gift Box',
    slug: 'herbalsource-premium-shilajit-gift-box',
    price: 6000,
    originalPrice: 9000,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800'
    ],
    description: 'Premium HerbalSource Shilajit Gift Box - An elegant collection featuring authentic Himalayan Shilajit in a luxurious green presentation box. This complete set includes pure Shilajit resin and a premium measuring spoon, beautifully packaged for gifting or personal use.',
    benefits: [
      '100% Pure Himalayan Shilajit',
      'Elegant premium packaging',
      'Perfect for gifting',
      'Includes measuring spoon',
      'Rich in fulvic acid and 84+ minerals',
      'Boosts energy and vitality',
      'Supports immune system',
      'Enhances cognitive function'
    ],
    ingredients: '100% Pure Himalayan Shilajit Resin, No additives or fillers',
    usage: 'Take a pea-sized amount (200-300mg) once or twice daily. Dissolve in warm water, milk, or tea. Best taken on an empty stomach. Use the included measuring spoon for accurate dosing.',
    inStock: true,
    featured: true,
    stockQuantity: 100
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

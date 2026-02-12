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
      'https://i.ibb.co/PzGG3V0F/WhatsAppImage.jpg',
      'https://i.ibb.co/PzGG3V0F/WhatsAppImage.jpg',
      'https://i.ibb.co/PzGG3V0F/WhatsAppImage.jpg'
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
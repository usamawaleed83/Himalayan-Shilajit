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
    stockQuantity: 100,
    reviews: [
      {
        id: 1,
        name: 'Ahmed Khan',
        rating: 5,
        comment: 'Beautiful packaging! The quality is exceptional and I have noticed great improvements in my energy levels.',
        date: '2024-02-10'
      },
      {
        id: 2,
        name: 'Fatima Ali',
        rating: 5,
        comment: 'Perfect gift for my parents. They love the elegant box and the product quality is outstanding!',
        date: '2024-02-08'
      },
      {
        id: 3,
        name: 'Hassan Malik',
        rating: 4,
        comment: 'Great value for money. Authentic product with premium presentation.',
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

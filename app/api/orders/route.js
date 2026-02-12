import { NextResponse } from 'next/server';

// In-memory storage for orders
let orders = [];

// Products data for validation
const products = [
  {
    _id: '1',
    id: 1,
    name: 'Premium HerbalSource Shilajit Resin',
    slug: 'premium-herbalsource-shilajit-resin',
    price: 49.99,
    stockQuantity: 100,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800']
  },
  {
    _id: '2',
    id: 2,
    name: 'HerbalSource Shilajit Capsules',
    slug: 'herbalsource-shilajit-capsules',
    price: 39.99,
    stockQuantity: 75,
    images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800']
  },
  {
    _id: '3',
    id: 3,
    name: 'Shilajit Powder - Organic',
    slug: 'shilajit-powder-organic',
    price: 44.99,
    stockQuantity: 60,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800']
  },
  {
    _id: '4',
    id: 4,
    name: 'Premium Shilajit Gift Set',
    slug: 'premium-shilajit-gift-set',
    price: 89.99,
    stockQuantity: 25,
    images: ['https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800']
  }
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, notes } = body;

    console.log('📦 Order creation request received');
    console.log('Processing order for:', customer.name, 'Payment method:', paymentMethod);

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      // Find product by ID, slug, or name
      const product = products.find(p => 
        p._id === String(item.productId) || 
        p.id === Number(item.productId) ||
        p.slug === item.slug || 
        p.name === item.name
      );
      
      if (!product) {
        console.log('❌ Product not found:', item.productId || item.slug || item.name);
        return NextResponse.json({ 
          success: false, 
          message: `Product not found: ${item.productId || item.slug || item.name}` 
        }, { status: 400 });
      }

      if (product.stockQuantity < item.quantity) {
        return NextResponse.json({ 
          success: false, 
          message: `Insufficient stock for ${product.name}` 
        }, { status: 400 });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]
      });
    }

    // Calculate shipping (free over PKR 50)
    const shipping = subtotal >= 50 ? 0 : 9.99;
    const total = subtotal + shipping;

    // Generate order number
    const orderNumber = `HS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    console.log('💰 Order totals - Subtotal:', subtotal, 'Shipping:', shipping, 'Total:', total);

    // Create order object
    const order = {
      _id: Date.now().toString(),
      orderNumber,
      customer,
      items: orderItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
      notes,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'pending',
      orderStatus: paymentMethod === 'cash_on_delivery' ? 'processing' : 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to in-memory storage
    orders.push(order);
    console.log('✅ Order saved to in-memory storage:', orderNumber);

    // Mock email sending (in production, you'd use a service like Resend or SendGrid)
    console.log('📧 Mock email sent to:', customer.email);

    console.log('🎉 Order created successfully:', orderNumber);
    
    return NextResponse.json({ 
      success: true, 
      data: order,
      message: 'Order created successfully' 
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Order creation error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 400 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: orders,
      message: `Found ${orders.length} orders` 
    });
  } catch (error) {
    console.error('❌ Orders fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
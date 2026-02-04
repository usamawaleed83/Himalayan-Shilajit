import { NextResponse } from 'next/server';

// This would be shared with the main orders route in a real app
// For now, we'll use a simple in-memory store
let orders = [];

export async function GET(request, { params }) {
  try {
    const { orderNumber } = params;
    
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
      return NextResponse.json({ 
        success: false, 
        message: 'Order not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: order 
    });
  } catch (error) {
    console.error('❌ Order fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
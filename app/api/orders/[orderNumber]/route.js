import { NextResponse } from 'next/server';
import { getOrderByNumber } from '../../../data/ordersStore';

export async function GET(request, { params }) {
  try {
    const { orderNumber } = params;
    
    const order = getOrderByNumber(orderNumber);
    
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
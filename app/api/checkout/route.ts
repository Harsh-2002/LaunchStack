import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock checkout response matching the updated CheckoutResponse interface
    const checkoutResponse = {
      checkout_url: `https://checkout.stripe.com/c/pay/cs_test_${Date.now()}#fidkdWxOYHwnPyd1blpxYHZxWjA0T0psS11FT1JRTTBKQmdETlxCcWN8bG9Ha2gxN3BHclxGN2J%2FYkZOdXR8UmpPZ09oTEp1PScpJ3VpbGtuQH11anZgYUxhJz8ncWB2dWo%2FaDVPMlRgf`,
      order_id: `order_${Date.now()}`,
      status: 'pending' as const,
      amount: body.amount || 29.99,
      currency: body.currency || 'USD',
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    };

    return NextResponse.json(checkoutResponse, { status: 201 });
  } catch (error) {
    console.error('Checkout creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

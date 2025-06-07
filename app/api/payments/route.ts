import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock payment history data
    const payments = [
      {
        id: 'pay_001',
        order_id: 'order_1234567890',
        amount: 29.99,
        currency: 'USD',
        status: 'completed' as const,
        description: 'Pro Plan - Monthly Subscription',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        method: 'card',
        last4: '4242'
      },
      {
        id: 'pay_002',
        order_id: 'order_1234567891',
        amount: 29.99,
        currency: 'USD',
        status: 'completed' as const,
        description: 'Pro Plan - Monthly Subscription',
        created_at: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
        method: 'card',
        last4: '4242'
      },
      {
        id: 'pay_003',
        order_id: 'order_1234567892',
        amount: 9.99,
        currency: 'USD',
        status: 'completed' as const,
        description: 'Starter Plan - Monthly Subscription',
        created_at: new Date(Date.now() - 62 * 24 * 60 * 60 * 1000).toISOString(),
        method: 'card',
        last4: '4242'
      }
    ];

    return NextResponse.json(payments);
  } catch (error) {
    console.error('Payment history fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment history' },
      { status: 500 }
    );
  }
}

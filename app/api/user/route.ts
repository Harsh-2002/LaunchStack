import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock user data matching the expected interface
    const user = {
      id: 'user_123',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      avatar: null,
      plan: 'Pro',
      resource_limits: {
        max_instances: 10,
        max_cpu: 4,
        max_memory: 8192, // MB
        max_disk: 100 // GB
      },
      billing: {
        status: 'active',
        next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 29.99,
        currency: 'USD'
      }
    };

    return NextResponse.json(user);
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

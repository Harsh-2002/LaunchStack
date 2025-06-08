import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock subscription data showing past_due status for demonstration
    const subscription = {
      id: 'sub_1234567890',
      plan: 'starter',
      status: 'past_due', // Could be: active, past_due, canceled, expired
      current_period_end: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days from now
      cancel_at_period_end: false,
      trial_end: null,
      created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 2.00,
      currency: 'USD',
      interval: 'month'
    };

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Subscription fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription data' },
      { status: 500 }
    );
  }
}

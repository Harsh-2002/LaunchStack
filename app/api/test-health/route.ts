import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log('Testing API connection to:', `${apiUrl}/health`);
    
    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API response status:', response.status);
    console.log('API response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);

    return NextResponse.json({
      success: true,
      apiUrl: `${apiUrl}/health`,
      serverResponse: data,
      test: 'server-side-fetch-success'
    });
  } catch (error) {
    console.error('Server-side API test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      test: 'server-side-fetch-failed'
    }, { status: 500 });
  }
}

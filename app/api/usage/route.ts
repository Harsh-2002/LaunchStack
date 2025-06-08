import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock usage data for all instances
    const usage = {
      'inst_001': {
        cpu: Math.random() * 0.8 + 0.1, // 0.1-0.9 cores
        memory: Math.random() * 800 + 200, // 200-1000 MB
        storage: Math.random() * 15 + 5, // 5-20 GB
        status: 'running'
      },
      'inst_002': {
        cpu: 0, // stopped instance
        memory: 0,
        storage: Math.random() * 0.8 + 0.2, // 0.2-1.0 GB
        status: 'stopped'
      },
      'inst_003': {
        cpu: Math.random() * 0.4 + 0.05, // 0.05-0.45 cores
        memory: Math.random() * 400 + 100, // 100-500 MB
        storage: Math.random() * 0.8 + 0.2, // 0.2-1.0 GB
        status: 'running'
      },
      'inst_004': {
        cpu: 0, // expired instance - no resource usage
        memory: 0,
        storage: Math.random() * 0.5 + 0.1, // 0.1-0.6 GB (data preserved)
        status: 'expired'
      }
    };

    return NextResponse.json(usage);
  } catch (error) {
    console.error('Usage fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
}

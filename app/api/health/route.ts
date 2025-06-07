import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock health status data matching the updated HealthStatus interface
    const healthStatus = {
      status: 'healthy' as const,
      timestamp: new Date().toISOString(),
      uptime: 86400, // 24 hours in seconds
      go_version: '1.21.0',
      database: {
        status: 'connected',
        ping_ms: 12
      },
      docker: {
        status: 'running',
        containers_active: 5
      },
      api: {
        endpoints: 12,
        response_time_ms: 45
      }
    };

    return NextResponse.json(healthStatus);
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

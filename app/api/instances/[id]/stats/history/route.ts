import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: instanceId } = await params;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '1h';

    // Validate period parameter
    const validPeriods = ['10m', '1h', '6h', '24h'];
    if (!validPeriods.includes(period)) {
      return NextResponse.json(
        { error: 'Invalid period. Must be one of: 10m, 1h, 6h, 24h' },
        { status: 400 }
      );
    }

    // Generate mock historical data based on period
    const dataPoints = generateHistoricalData(instanceId, period);

    return NextResponse.json(dataPoints);
  } catch (error) {
    console.error('Historical stats fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical stats' },
      { status: 500 }
    );
  }
}

function generateHistoricalData(instanceId: string, period: string) {
  const now = new Date();
  const dataPoints = [];
  
  // Determine number of data points and interval based on period
  let pointCount: number;
  let intervalMinutes: number;
  
  switch (period) {
    case '10m':
      pointCount = 20; // Every 30 seconds for 10 minutes
      intervalMinutes = 0.5;
      break;
    case '1h':
      pointCount = 60; // Every minute for 1 hour
      intervalMinutes = 1;
      break;
    case '6h':
      pointCount = 72; // Every 5 minutes for 6 hours
      intervalMinutes = 5;
      break;
    case '24h':
      pointCount = 96; // Every 15 minutes for 24 hours
      intervalMinutes = 15;
      break;
    default:
      pointCount = 60;
      intervalMinutes = 1;
  }

  // Generate realistic data points
  const seed = instanceId.charCodeAt(instanceId.length - 1) || 1;
  let baseCpu = 30 + (seed % 30); // 30-60% base CPU
  let baseMemory = 1024 + (seed * 100); // 1024MB + variation
  const memoryLimit = 4096; // 4GB limit
  
  for (let i = pointCount - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * intervalMinutes * 60 * 1000));
    
    // Add some realistic variation
    const timeVariation = Math.sin(i * 0.1) * 10; // Sine wave variation
    const randomVariation = (Math.random() - 0.5) * 20; // Random noise
    
    const cpuUsage = Math.max(0, Math.min(100, baseCpu + timeVariation + randomVariation));
    const memoryUsage = Math.max(0, Math.min(memoryLimit, baseMemory + (timeVariation * 50) + (randomVariation * 25)));
    const memoryPercentage = (memoryUsage / memoryLimit) * 100;
    
    // Network data with some correlation to CPU usage
    const networkMultiplier = cpuUsage / 100;
    const networkIn = Math.round((100000 + Math.random() * 900000) * networkMultiplier); // Bytes
    const networkOut = Math.round((50000 + Math.random() * 450000) * networkMultiplier); // Bytes
    
    dataPoints.push({
      timestamp: timestamp.toISOString(),
      cpu_usage: Math.round(cpuUsage * 100) / 100,
      memory_usage: Math.round(memoryUsage * 1024 * 1024), // Convert MB to bytes
      memory_limit: memoryLimit * 1024 * 1024, // Convert MB to bytes
      memory_percentage: Math.round(memoryPercentage * 100) / 100,
      network_in: networkIn,
      network_out: networkOut,
    });
  }

  return dataPoints;
}

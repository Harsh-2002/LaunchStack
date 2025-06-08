import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const instanceId = params.id;
    
    // Mock instance stats data matching the updated InstanceStats interface
    const baseStats = {
      id: `stats_${instanceId}_${Date.now()}`,
      instance_id: instanceId,
      timestamp: new Date().toISOString(),
    };

    // Generate realistic mock data based on instance ID
    const seed = (instanceId.charCodeAt(instanceId.length - 1) || 1) % 10; // Limit seed to 0-9
    const cpuUsage = Math.round((20 + seed * 5) * 100) / 100; // 20-65%
    const memoryUsage = Math.round((512 + seed * 100) * 100) / 100; // 512-1412 MB
    const memoryLimit = 4096; // 4GB limit
    const diskUsage = Math.round((5 + seed * 2) * 100) / 100; // 5-23 GB

    const instanceStats = {
      ...baseStats,
      cpu_usage: cpuUsage,
      cpu_formatted: `${cpuUsage}%`,
      memory_usage: memoryUsage,
      memory_limit: memoryLimit,
      memory_percentage: Math.round((memoryUsage / memoryLimit) * 100),
      memory_formatted: `${memoryUsage.toFixed(0)} MB / ${memoryLimit} MB`,
      disk_usage: diskUsage,
      disk_formatted: `${diskUsage} GB`,
      network_in: Math.round((10 + seed * 5) * 100) / 100, // 10-55 MB
      network_out: Math.round((8 + seed * 3) * 100) / 100, // 8-35 MB
      network_formatted: `↓${(10 + seed * 5).toFixed(1)} MB ↑${(8 + seed * 3).toFixed(1)} MB`
    };

    return NextResponse.json(instanceStats);
  } catch (error) {
    console.error('Instance stats fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch instance stats' },
      { status: 500 }
    );
  }
}

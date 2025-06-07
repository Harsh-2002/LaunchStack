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
    const seed = instanceId.charCodeAt(instanceId.length - 1) || 1;
    const cpuUsage = Math.round((40 + seed * 3) * 100) / 100; // 40-70%
    const memoryUsage = Math.round((1024 + seed * 200) * 100) / 100; // 1224-2024 MB
    const memoryLimit = 4096; // 4GB limit
    const diskUsage = Math.round((15 + seed * 5) * 100) / 100; // 15-40 GB

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
      network_in: Math.round((100 + seed * 50) * 100) / 100, // MB
      network_out: Math.round((80 + seed * 40) * 100) / 100, // MB
      network_formatted: `↓${(100 + seed * 50).toFixed(1)} MB ↑${(80 + seed * 40).toFixed(1)} MB`
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

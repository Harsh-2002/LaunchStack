import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock instances data
    const instances = [
      {
        id: 'inst_001',
        name: 'Production Workflows',
        status: 'running' as const,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        url: 'https://prod.n8n.example.com',
        region: 'us-east-1',
        plan: 'Pro',
        resources: {
          cpu: 2,
          memory: 4096,
          disk: 50
        }
      },
      {
        id: 'inst_002',
        name: 'Development Environment',
        status: 'stopped' as const,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        url: 'dev.n8n.example.com',
        region: 'us-west-2',
        plan: 'Starter',
        resources: {
          cpu: 1,
          memory: 2048,
          disk: 25
        }
      },
      {
        id: 'inst_003',
        name: 'Testing Sandbox',
        status: 'running' as const,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        url: 'test.n8n.example.com',
        region: 'eu-west-1',
        plan: 'Starter',
        resources: {
          cpu: 1,
          memory: 1024,
          disk: 20
        }
      }
    ];

    return NextResponse.json(instances);
  } catch (error) {
    console.error('Instances fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch instances' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock instance creation
    const newInstance = {
      id: `inst_${Date.now()}`,
      name: body.name || 'New Instance',
      status: 'creating' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      url: `https://${body.name?.toLowerCase().replace(/\s+/g, '-') || 'new-instance'}.n8n.example.com`,
      region: body.region || 'us-east-1',
      plan: body.plan || 'Starter',
      resources: {
        cpu: body.resources?.cpu || 1,
        memory: body.resources?.memory || 1024,
        disk: body.resources?.disk || 20
      }
    };

    return NextResponse.json(newInstance, { status: 201 });
  } catch (error) {
    console.error('Instance creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create instance' },
      { status: 500 }
    );
  }
}

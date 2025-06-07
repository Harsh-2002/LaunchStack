import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const instanceId = params.id;
    
    // Mock individual instance data
    const instances = {
      'inst_001': {
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
      'inst_002': {
        id: 'inst_002',
        name: 'Development Environment',
        status: 'stopped' as const,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        url: 'https://dev.n8n.example.com',
        region: 'us-west-2',
        plan: 'Starter',
        resources: {
          cpu: 1,
          memory: 2048,
          disk: 25
        }
      },
      'inst_003': {
        id: 'inst_003',
        name: 'Testing Sandbox',
        status: 'running' as const,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        url: 'https://test.n8n.example.com',
        region: 'eu-west-1',
        plan: 'Starter',
        resources: {
          cpu: 1,
          memory: 1024,
          disk: 20
        }
      }
    };

    const instance = instances[instanceId as keyof typeof instances];
    
    if (!instance) {
      return NextResponse.json(
        { error: 'Instance not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(instance);
  } catch (error) {
    console.error('Instance fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch instance' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const instanceId = params.id;
    const body = await request.json();
    
    // Mock instance update
    const updatedInstance = {
      id: instanceId,
      name: body.name || 'Updated Instance',
      status: body.status || 'running' as const,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
      url: body.url || `https://${instanceId}.n8n.example.com`,
      region: body.region || 'us-east-1',
      plan: body.plan || 'Starter',
      resources: body.resources || {
        cpu: 1,
        memory: 1024,
        disk: 20
      }
    };

    return NextResponse.json(updatedInstance);
  } catch (error) {
    console.error('Instance update error:', error);
    return NextResponse.json(
      { error: 'Failed to update instance' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const instanceId = params.id;
    
    // Mock instance deletion
    return NextResponse.json(
      { message: `Instance ${instanceId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Instance deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete instance' },
      { status: 500 }
    );
  }
}

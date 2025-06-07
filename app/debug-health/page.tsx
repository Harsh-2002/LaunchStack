'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DebugHealthPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      console.log('Testing API URL:', apiUrl);
      
      const healthUrl = `${apiUrl}/health`;
      console.log('Full health URL:', healthUrl);
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      setResult({
        success: true,
        data,
        url: healthUrl,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      });
      
    } catch (error) {
      console.error('API test failed:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        type: error?.constructor?.name
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">API Health Debug</h1>
      
      <div className="mb-4">
        <Button onClick={testApiConnection} disabled={loading}>
          {loading ? 'Testing...' : 'Test API Connection'}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Environment Info</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify({
              'NEXT_PUBLIC_API_BASE_URL': process.env.NEXT_PUBLIC_API_BASE_URL,
              'window.location': typeof window !== 'undefined' ? {
                origin: window.location.origin,
                hostname: window.location.hostname,
                port: window.location.port,
                protocol: window.location.protocol
              } : 'server-side'
            }, null, 2)}
          </pre>
        </CardContent>
      </Card>
      
      {result && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className={result.success ? 'text-green-600' : 'text-red-600'}>
              {result.success ? 'Success' : 'Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

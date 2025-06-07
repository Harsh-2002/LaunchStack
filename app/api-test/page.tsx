'use client';

import { useState, useEffect } from 'react';
import { useApiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ApiTestPage() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useApiClient();

  const addTestResult = (test: string, success: boolean, data: any, error?: any) => {
    const result = {
      test,
      success,
      data,
      error: error?.message || error,
      timestamp: new Date().toISOString()
    };
    setTestResults(prev => [result, ...prev]);
    console.log('Test Result:', result);
  };

  const testServerSideApi = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-health');
      const data = await response.json();
      addTestResult('Server-side API', data.success, data);
    } catch (error) {
      addTestResult('Server-side API', false, null, error);
    }
    setIsLoading(false);
  };

  const testClientSideApi = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.health.check();
      addTestResult('Client-side API', true, data);
    } catch (error) {
      addTestResult('Client-side API', false, null, error);
    }
    setIsLoading(false);
  };

  const testDirectFetch = async () => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      console.log('Direct fetch to:', `${apiUrl}/health`);
      
      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      addTestResult('Direct Fetch', true, data);
    } catch (error) {
      addTestResult('Direct Fetch', false, null, error);
    }
    setIsLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  useEffect(() => {
    // Auto-run tests on page load
    setTimeout(() => {
      testServerSideApi();
      setTimeout(() => testClientSideApi(), 1000);
      setTimeout(() => testDirectFetch(), 2000);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">API Connection Test</h1>
        <p className="text-muted-foreground">
          Testing API connectivity from both server-side and client-side
        </p>
      </div>

      <div className="mb-6 flex gap-4">
        <Button onClick={testServerSideApi} disabled={isLoading}>
          Test Server-side API
        </Button>
        <Button onClick={testClientSideApi} disabled={isLoading}>
          Test Client-side API
        </Button>
        <Button onClick={testDirectFetch} disabled={isLoading}>
          Test Direct Fetch
        </Button>
        <Button onClick={clearResults} variant="outline">
          Clear Results
        </Button>
      </div>

      <div className="space-y-4">
        {testResults.map((result, index) => (
          <Card key={index} className={result.success ? 'border-green-500' : 'border-red-500'}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{result.test}</CardTitle>
                <Badge variant={result.success ? 'default' : 'destructive'}>
                  {result.success ? 'SUCCESS' : 'FAILED'}
                </Badge>
              </div>
              <CardDescription>
                {new Date(result.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result.success ? (
                <div>
                  <h4 className="font-semibold mb-2">Response Data:</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold mb-2 text-red-600">Error:</h4>
                  <pre className="bg-red-50 border border-red-200 p-3 rounded text-sm overflow-auto">
                    {JSON.stringify(result.error, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Environment Info</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-3 rounded text-sm">
              {JSON.stringify({
                'API_BASE_URL': process.env.NEXT_PUBLIC_API_BASE_URL,
                'Current Origin': typeof window !== 'undefined' ? window.location.origin : 'server-side',
                'User Agent': typeof window !== 'undefined' ? window.navigator.userAgent : 'server-side',
              }, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

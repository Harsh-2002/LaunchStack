"use client";

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw,
  Wifi,
  WifiOff 
} from 'lucide-react';
import { useApiClient, type HealthStatus } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';

interface HealthStatusProps {
  variant?: 'full' | 'compact' | 'minimal';
  showRefresh?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function HealthStatusComponent({ 
  variant = 'compact',
  showRefresh = true,
  autoRefresh = true,
  refreshInterval = 30000 
}: HealthStatusProps) {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const api = useApiClient();
  const { toast } = useToast();

  const checkHealth = async (showToast = false) => {
    try {
      setLoading(true);
      const health = await api.health.check();
      // Add timestamp if not provided by API
      if (!health.timestamp) {
        health.timestamp = new Date().toISOString();
      }
      setHealthStatus(health);
      setLastCheck(new Date());
      
      if (showToast) {
        toast({
          title: "Health Check",
          description: `Backend is ${health.status === 'ok' ? 'healthy' : 'unhealthy'} (${health.environment})`,
          variant: health.status === 'ok' ? 'default' : 'destructive',
        });
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthStatus({
        status: 'error',
        environment: 'development',
        version: 'unknown',
        timestamp: new Date().toISOString(),
      });
      setLastCheck(new Date());
      
      if (showToast) {
        toast({
          title: "Health Check Failed",
          description: "Unable to connect to backend",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    
    if (autoRefresh) {
      const interval = setInterval(() => checkHealth(), refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getStatusIcon = () => {
    if (loading) {
      return <RefreshCw className="h-4 w-4 animate-spin" />;
    }
    
    switch (healthStatus?.status) {
      case 'ok':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = () => {
    switch (healthStatus?.status) {
      case 'ok':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusText = () => {
    if (loading) return 'Checking...';
    
    switch (healthStatus?.status) {
      case 'ok':
        return 'Backend Online';
      case 'error':
        return 'Backend Offline';
      default:
        return 'Unknown';
    }
  };

  const getConnectionIcon = () => {
    return healthStatus?.status === 'ok' ? 
      <Wifi className="h-3 w-3" /> : 
      <WifiOff className="h-3 w-3" />;
  };

  const getEnvironmentBadge = () => {
    if (!healthStatus?.environment) return null;
    
    const isDev = healthStatus.environment === 'development';
    return (
      <Badge 
        variant="outline" 
        className={`text-xs ${isDev ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-purple-100 text-purple-800 border-purple-200'}`}
      >
        {isDev ? 'DEV' : 'PROD'}
      </Badge>
    );
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex-shrink-0">
          {getStatusIcon()}
        </div>
        {showRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => checkHealth(true)}
            disabled={loading}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className={`${getStatusColor()} flex items-center gap-1 whitespace-nowrap`}>
          {getConnectionIcon()}
          <span className="text-xs font-medium">{getStatusText()}</span>
        </Badge>
        {getEnvironmentBadge()}
        {healthStatus?.version && (
          <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border-gray-200 whitespace-nowrap">
            v{healthStatus.version}
          </Badge>
        )}
        {showRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => checkHealth(true)}
            disabled={loading}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-shrink-0 mt-0.5">
            {getStatusIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-medium text-sm">{getStatusText()}</span>
              {getEnvironmentBadge()}
              {healthStatus?.version && (
                <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border-gray-200">
                  v{healthStatus.version}
                </Badge>
              )}
            </div>
            {lastCheck && (
              <div className="text-xs text-muted-foreground mb-2">
                Last check: {lastCheck.toLocaleTimeString()}
              </div>
            )}
            <div className="space-y-1">
              {healthStatus?.environment && (
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Environment:</span> {healthStatus.environment}
                </div>
              )}
              {healthStatus?.payment_gateway && (
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Payment:</span> {healthStatus.payment_gateway}
                </div>
              )}
            </div>
            {healthStatus?.database && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                {healthStatus.database.status === 'connected' ? (
                  <CheckCircle className="h-3 w-3 text-green-600" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-600" />
                )}
                <span>Database: {healthStatus.database.status}</span>
                {healthStatus.database.responseTime && (
                  <span>({healthStatus.database.responseTime}ms)</span>
                )}
              </div>
            )}
          </div>
        </div>
        {showRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => checkHealth(true)}
            disabled={loading}
            className="flex-shrink-0"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}

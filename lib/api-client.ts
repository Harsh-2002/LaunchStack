import { useAuth } from '@clerk/nextjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://gw.srvr.site/api/v1';

// Type definitions (shared with server-side API)
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  plan: string;
  subscription_status: string;
  current_period_end: string;
  instances: {
    current: number;
    limit: number;
  };
  resource_limits: {
    max_instances: number;
    cpu_limit: number;
    memory_limit: number;
    storage_limit: number;
  };
}

export interface Instance {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'starting' | 'stopping' | 'expired';
  url: string;
  cpu_limit: number;
  memory_limit: number;
  storage_limit: number;
  created_at: string;
  updated_at: string;
}

export interface Usage {
  cpu: {
    current: number;
    limit: number;
    unit: string;
  };
  memory: {
    current: number;
    limit: number;
    unit: string;
  };
  storage: {
    current: number;
    limit: number;
    unit: string;
  };
  network: {
    in: number;
    out: number;
    unit: string;
  };
}

export interface InstanceStats {
  id: string;
  instance_id: string;
  timestamp: string;
  cpu_usage: number;
  cpu_formatted: string;
  memory_usage: number;
  memory_limit: number;
  memory_percentage: number;
  memory_formatted: string;
  disk_usage: number;
  disk_formatted: string;
  network_in: number;
  network_out: number;
  network_formatted: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  invoice_url: string;
  created_at: string;
}

export interface CheckoutResponse {
  checkout_url: string;
  order_id: string;
}

export interface Subscription {
  id: string;
  plan: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface HealthStatus {
  status: 'ok' | 'error';
  version: string;
  environment: 'development' | 'production';
  go_version: string;
  timestamp: string;
  database: {
    status: 'ok' | 'error';
  };
  docker: {
    status: 'ok' | 'error';
  };
  api?: {
    endpoints: string[];
  };
}

export interface HistoryDataPoint {
  timestamp: string;
  cpu_usage: number;
  memory_usage: number;
  memory_limit: number;
  memory_percentage: number;
  network_in: number;
  network_out: number;
}

export interface InstanceStatsHistory {
  instance_id: string;
  period: string;
  data_points: HistoryDataPoint[];
}

// Hook for client-side API requests
export function useApiClient() {
  const { getToken } = useAuth();

  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken();

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  };

  // Health check function (no auth required)
  const healthCheck = async (): Promise<HealthStatus> => {
    try {
      const healthUrl = `${API_BASE_URL}/health`;
      console.log('Health check: Attempting to connect to', healthUrl);
      console.log('Current origin:', typeof window !== 'undefined' ? window.location.origin : 'server-side');
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      console.log('Health check response status:', response.status);
      console.log('Health check response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        console.error('Health check failed with status:', response.status, response.statusText);
        throw new Error(`Health check failed: HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Health check successful:', data);
      return data;
    } catch (error) {
      console.error('Health check error details:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: typeof error,
        constructor: error?.constructor?.name
      });
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to API server. Check if the API server is running and accessible.');
      }
      throw error;
    }
  };

  return {
    // Health API
    health: {
      check: healthCheck,
    },

    // User API
    user: {
      getCurrentUser: (): Promise<User> => apiRequest('/users/me/'),
      updateUser: (data: { first_name: string; last_name: string }): Promise<User> =>
        apiRequest('/users/me/', {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
    },

    // Instance API
    instances: {
      list: (): Promise<Instance[]> => apiRequest('/instances/'),
      create: (data: { name: string; description: string }): Promise<Instance> =>
        apiRequest('/instances/', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      get: (id: string): Promise<Instance> => apiRequest(`/instances/${id}/`),
      update: (id: string, data: { name: string; description: string }): Promise<Instance> =>
        apiRequest(`/instances/${id}/`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: string): Promise<{ message: string }> =>
        apiRequest(`/instances/${id}/`, { method: 'DELETE' }),
      start: (id: string): Promise<{ message: string }> =>
        apiRequest(`/instances/${id}/start/`, { method: 'POST' }),
      stop: (id: string): Promise<{ message: string }> =>
        apiRequest(`/instances/${id}/stop/`, { method: 'POST' }),
      restart: (id: string): Promise<{ message: string }> =>
        apiRequest(`/instances/${id}/restart/`, { method: 'POST' }),
      getStats: (id: string): Promise<InstanceStats> => apiRequest(`/instances/${id}/stats/`),
      getStatsHistory: (id: string, period: string = '10m'): Promise<InstanceStatsHistory> => 
        apiRequest(`/instances/${id}/stats/history?period=${period}`),
    },

    // Usage API
    usage: {
      getAll: (): Promise<Record<string, { cpu: number; memory: number; storage: number; status: string }>> =>
        apiRequest('/usage/'),
      getInstance: (instanceId: string): Promise<Usage> => apiRequest(`/usage/${instanceId}/`),
    },

    // Payment API
    payments: {
      getHistory: (): Promise<Payment[]> => apiRequest('/payments/'),
      createCheckoutSession: (data: { plan: string; success_url: string; cancel_url: string }): Promise<CheckoutResponse> =>
        apiRequest('/payments/checkout/', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      getSubscriptions: (): Promise<Subscription> => apiRequest('/payments/subscriptions/'),
      cancelSubscription: (id: string): Promise<{ status: string; message: string }> =>
        apiRequest(`/payments/subscriptions/${id}/cancel/`, { method: 'POST' }),
    },
  };
}

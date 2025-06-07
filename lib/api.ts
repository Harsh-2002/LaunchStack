import { auth } from '@clerk/nextjs/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.launchstack.io/api/v1';

// Type definitions (shared with client-side API)
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
  status: 'running' | 'stopped' | 'starting' | 'stopping';
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

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  invoice_url: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  plan: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

async function getAuthHeaders() {
  const { getToken } = await auth();
  const token = await getToken();
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// User API
export const userApi = {
  getCurrentUser: (): Promise<User> => apiRequest('/users/me'),
  updateUser: (data: { first_name: string; last_name: string }): Promise<User> =>
    apiRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Instance API
export const instanceApi = {
  listInstances: (): Promise<Instance[]> => apiRequest('/instances'),
  createInstance: (data: { name: string; description: string }): Promise<Instance> =>
    apiRequest('/instances', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getInstance: (id: string): Promise<Instance> => apiRequest(`/instances/${id}`),
  updateInstance: (id: string, data: { name: string; description: string }): Promise<Instance> =>
    apiRequest(`/instances/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteInstance: (id: string): Promise<{ message: string }> =>
    apiRequest(`/instances/${id}`, { method: 'DELETE' }),
  startInstance: (id: string): Promise<{ message: string }> =>
    apiRequest(`/instances/${id}/start`, { method: 'POST' }),
  stopInstance: (id: string): Promise<{ message: string }> =>
    apiRequest(`/instances/${id}/stop`, { method: 'POST' }),
  restartInstance: (id: string): Promise<{ message: string }> =>
    apiRequest(`/instances/${id}/restart`, { method: 'POST' }),
};

// Usage API
export const usageApi = {
  getAllUsage: (): Promise<Record<string, { cpu: number; memory: number; storage: number; status: string }>> =>
    apiRequest('/usage'),
  getInstanceUsage: (instanceId: string): Promise<Usage> => apiRequest(`/usage/${instanceId}`),
};

// Payment API
export const paymentApi = {
  getPaymentHistory: (): Promise<Payment[]> => apiRequest('/payments'),
  createCheckoutSession: (data: { plan: string; success_url: string; cancel_url: string }): Promise<{ checkout_url: string }> =>
    apiRequest('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getSubscriptions: (): Promise<Subscription> => apiRequest('/payments/subscriptions'),
  cancelSubscription: (id: string): Promise<{ status: string; message: string }> =>
    apiRequest(`/payments/subscriptions/${id}/cancel`, { method: 'POST' }),
};

# Frontend Authentication with Backend APIs 🔐

## Overview
The LaunchStack frontend uses **Clerk Authentication** integrated with the backend API at `https://gw.srvr.site/api/v1`. This document details the current authentication implementation and API communication patterns.

## 🏗️ Authentication Architecture

### Frontend (Client-Side)
- **Auth Provider**: [Clerk](https://clerk.com/) - Third-party authentication service
- **Integration**: `@clerk/nextjs` package
- **Token Management**: Clerk JWT tokens for API authorization
- **Route Protection**: Middleware-based protection for dashboard routes

### Backend (Server-Side)
- **API Base URL**: `https://gw.srvr.site/api/v1`
- **Auth Method**: Bearer token (Clerk JWT)
- **Webhook Integration**: Clerk webhook for user lifecycle management
- **CORS Policy**: Permissive CORS allowing frontend origin

## 🔑 Authentication Flow

### 1. User Authentication (Clerk)
```typescript
// User signs in via Clerk hosted authentication
// Frontend: /login or /signup pages
// Clerk handles: OAuth, email/password, MFA, etc.
```

### 2. Token Acquisition
```typescript
// In React components/hooks:
import { useAuth } from '@clerk/nextjs';

const { getToken } = useAuth();
const token = await getToken(); // Gets current Clerk JWT
```

### 3. API Communication
```typescript
// All protected API calls include Bearer token:
const response = await fetch(`${API_BASE_URL}/endpoint`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

## 📁 Implementation Files

### Core Authentication Components

#### `/lib/api-client.ts` - Main API Client
```typescript
export function useApiClient() {
  const { getToken } = useAuth(); // Clerk hook

  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken(); // Get current JWT

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Authorization': `Bearer ${token}`, // Include Bearer token
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  };

  return {
    user: {
      getCurrentUser: () => apiRequest('/users/me/'),
      updateUser: (data) => apiRequest('/users/me/', { method: 'PUT', body: JSON.stringify(data) }),
    },
    instances: {
      list: () => apiRequest('/instances/'),
      create: (data) => apiRequest('/instances/', { method: 'POST', body: JSON.stringify(data) }),
      getStats: (id) => apiRequest(`/instances/${id}/stats/`),
      getStatsHistory: (id, period) => apiRequest(`/instances/${id}/stats/history?period=${period}`),
      // ... other instance methods
    },
    // ... other API groups
  };
}
```

#### `/middleware.ts` - Route Protection
```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // Enforce authentication
  }
});
```

#### `/app/layout.tsx` - Clerk Provider Configuration
```typescript
<ClerkProvider
  appearance={{
    elements: {
      formButtonPrimary: "bg-black hover:bg-gray-800...",
      // Custom styling for auth forms
    }
  }}
  signInUrl="/login"
  signUpUrl="/signup"
  afterSignInUrl="/dashboard"
  afterSignUpUrl="/dashboard"
>
  {children}
</ClerkProvider>
```

## 🔗 API Endpoints & Authentication

### Public Endpoints (No Auth Required)
```typescript
// Health check - no authentication needed
GET /api/v1/health
```

### Protected Endpoints (Require Bearer Token)
```typescript
// User Management
GET /api/v1/users/me/                     // Get current user
PUT /api/v1/users/me/                     // Update user

// Instance Management  
GET /api/v1/instances/                    // List instances
POST /api/v1/instances/                   // Create instance
GET /api/v1/instances/{id}/               // Get instance
PUT /api/v1/instances/{id}/               // Update instance
DELETE /api/v1/instances/{id}/            // Delete instance
POST /api/v1/instances/{id}/start/        // Start instance
POST /api/v1/instances/{id}/stop/         // Stop instance
POST /api/v1/instances/{id}/restart/      // Restart instance

// Resource Monitoring
GET /api/v1/instances/{id}/stats/         // Current stats
GET /api/v1/instances/{id}/stats/history  // Historical data

// Payment Management
GET /api/v1/payments/                     // Payment history
POST /api/v1/payments/checkout/           // Create checkout
GET /api/v1/payments/subscriptions/       // Get subscriptions
POST /api/v1/payments/subscriptions/{id}/cancel/ // Cancel subscription

// Usage Tracking
GET /api/v1/usage/                        // All usage data
GET /api/v1/usage/{instanceId}/           // Instance usage
```

## 🚨 Authentication Error Handling

### Common Error Patterns
```typescript
// 401 Unauthorized - Invalid or expired token
{
  "error": "Invalid token"
}

// 401 Unauthorized - Missing token
{
  "error": "Authorization header required"
}
```

### Frontend Error Handling
```typescript
try {
  const data = await apiClient.instances.list();
} catch (error) {
  if (error.message.includes('401') || error.message.includes('Invalid token')) {
    // Token expired or invalid - Clerk will handle refresh
    console.error('Authentication error:', error);
  } else {
    // Other API errors
    console.error('API error:', error);
  }
}
```

## 🔄 Webhook Integration

### Clerk → Backend Webhook
```typescript
// Backend endpoint for user lifecycle events
POST /api/v1/auth/webhook

// Events handled:
// - user.created   → Create user in backend database
// - user.updated   → Update user information
// - user.deleted   → Soft delete user account
```

## 🛠️ Configuration

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_BASE_URL=https://gw.srvr.site/api/v1
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Backend
CLERK_WEBHOOK_SECRET=whsec_...
```

### API Base URL Configuration
```typescript
// Configurable API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://gw.srvr.site/api/v1';
```

## 🔍 Debugging Authentication

### Adding Debug Logs
```typescript
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();
  console.log(`🔑 API Request: ${endpoint}, Token: ${token ? 'Present' : 'Missing'}`);
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  console.log(`📡 API Response: ${endpoint} -> ${response.status} ${response.statusText}`);
  
  if (!response.ok) {
    console.error(`❌ API Error: ${endpoint} -> ${response.status}`);
  }
  
  return response.json();
};
```

### Browser Console Inspection
```javascript
// Check if user is authenticated
const { user } = Clerk;
console.log('Current user:', user);

// Check token
const token = await Clerk.session?.getToken();
console.log('Current token:', token);
```

## 🎯 Current Status

### ✅ Working Features
- **User Authentication**: Clerk login/signup working
- **Route Protection**: Dashboard requires authentication
- **Token Management**: Automatic JWT token handling
- **API Integration**: All endpoints use Bearer token authentication
- **Error Handling**: Graceful handling of auth errors

### 🔄 Active Issues
- **Real Backend Connection**: Requires valid Clerk tokens for API access
- **User Registration**: New users need to be created via Clerk webhook
- **Token Validation**: Backend validates Clerk JWT signatures

### 🛡️ Security Features
- **HTTPS Only**: All API communication over HTTPS
- **JWT Validation**: Backend validates Clerk JWT tokens
- **Route Protection**: Middleware protects sensitive routes
- **CORS Security**: Proper CORS headers on backend
- **Token Refresh**: Clerk handles automatic token refresh

## 📈 Next Steps

1. **User Onboarding**: Ensure Clerk webhook creates users in backend
2. **Error Monitoring**: Add comprehensive error tracking
3. **Token Debugging**: Add detailed token validation logging
4. **Health Monitoring**: Monitor authentication success rates
5. **Testing**: Create automated tests for auth flows

---

**Last Updated**: June 8, 2025  
**Status**: Production Ready  
**Documentation Version**: 1.0

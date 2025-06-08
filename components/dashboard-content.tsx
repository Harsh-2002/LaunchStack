"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Server, 
  Play, 
  Square, 
  RotateCcw, 
  Plus, 
  Settings, 
  TrendingUp,
  CreditCard,
  Users,
  Database,
  Cpu,
  HardDrive,
  Network,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useApiClient, type User, type Instance, type Usage, type Payment, type Subscription, type HealthStatus, type InstanceStats } from '@/lib/api-client';
import { CreateInstanceDialog } from '@/components/create-instance-dialog';
import { EditInstanceDialog } from '@/components/edit-instance-dialog';
import { InstanceCard } from '@/components/instance-card';
import { UsageChart } from '@/components/usage-chart';
import { PaymentHistory } from '@/components/payment-history';
import { HealthStatusComponent } from '@/components/health-status';
import Header from '@/components/header';
import { useToast } from '@/hooks/use-toast';

export function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);
  const [instances, setInstances] = useState<Instance[]>([]);
  const [instanceStats, setInstanceStats] = useState<Record<string, InstanceStats>>({});
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [nextRefresh, setNextRefresh] = useState(10);
  const { toast } = useToast();
  const api = useApiClient();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Live resource stats polling - every 10 seconds
  useEffect(() => {
    if (!loading && instances.length > 0) {
      // Clear any existing intervals
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      
      // Start countdown
      setNextRefresh(10);
      countdownIntervalRef.current = setInterval(() => {
        setNextRefresh(prev => {
          if (prev <= 1) {
            return 10; // Reset countdown
          }
          return prev - 1;
        });
      }, 1000);
      
      // Start refresh interval
      refreshIntervalRef.current = setInterval(() => {
        loadResourceStats();
      }, 10000); // 10 seconds

      return () => {
        if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      };
    }
  }, [loading, instances]);

  const loadResourceStats = async (showToast = false) => {
    if (instances.length === 0) return;
    
    try {
      setStatsLoading(true);
      
      // Reset countdown when manually refreshed
      if (showToast) {
        setNextRefresh(10);
        toast({
          title: "Refreshing",
          description: "Updating resource statistics...",
        });
      }
      
      // Fetch stats for each instance
      const statsPromises = instances.map(instance => 
        api.instances.getStats(instance.id).catch(error => {
          console.warn(`Failed to fetch stats for instance ${instance.id}:`, error);
          return null;
        })
      );
      
      const statsResults = await Promise.allSettled(statsPromises);
      const statsMap: Record<string, InstanceStats> = {};
      
      instances.forEach((instance, index) => {
        const statsResult = statsResults[index];
        if (statsResult.status === 'fulfilled' && statsResult.value) {
          statsMap[instance.id] = statsResult.value;
        }
      });
      
      setInstanceStats(statsMap);
      
      if (showToast) {
        toast({
          title: "Updated",
          description: "Resource statistics refreshed successfully.",
        });
      }
    } catch (error) {
      console.warn('Failed to load resource stats:', error);
      if (showToast) {
        toast({
          title: "Error",
          description: "Failed to refresh resource statistics.",
          variant: "destructive",
        });
      }
    } finally {
      setStatsLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Use client-side API calls
      const [userData, instancesData, paymentsData, subscriptionData] = await Promise.allSettled([
        api.user.getCurrentUser(),
        api.instances.list(),
        api.payments.getHistory(),
        api.payments.getSubscriptions()
      ]);

      if (userData.status === 'fulfilled') setUser(userData.value);
      
      let instanceList: Instance[] = [];
      if (instancesData.status === 'fulfilled') {
        instanceList = instancesData.value;
        setInstances(instanceList);
      }
      
      if (paymentsData.status === 'fulfilled') setPayments(paymentsData.value);
      if (subscriptionData.status === 'fulfilled') setSubscription(subscriptionData.value);

      // Load initial resource stats
      if (instanceList.length > 0) {
        setStatsLoading(true);
        const statsPromises = instanceList.map(instance => 
          api.instances.getStats(instance.id).catch(error => {
            console.warn(`Failed to fetch stats for instance ${instance.id}:`, error);
            return null;
          })
        );
        
        const statsResults = await Promise.allSettled(statsPromises);
        const statsMap: Record<string, InstanceStats> = {};
        
        instanceList.forEach((instance, index) => {
          const statsResult = statsResults[index];
          if (statsResult.status === 'fulfilled' && statsResult.value) {
            statsMap[instance.id] = statsResult.value;
          }
        });
        
        setInstanceStats(statsMap);
        setStatsLoading(false);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstanceAction = async (instanceId: string, action: 'start' | 'stop' | 'restart' | 'delete') => {
    try {
      setActionLoading(prev => ({ ...prev, [`${instanceId}-${action}`]: true }));
      
      let result;
      switch (action) {
        case 'start':
          result = await api.instances.start(instanceId);
          break;
        case 'stop':
          result = await api.instances.stop(instanceId);
          break;
        case 'restart':
          result = await api.instances.restart(instanceId);
          break;
        case 'delete':
          result = await api.instances.delete(instanceId);
          // Remove the deleted instance from state immediately for better UX
          setInstances(prev => prev.filter(instance => instance.id !== instanceId));
          setInstanceStats(prev => {
            const newStats = { ...prev };
            delete newStats[instanceId];
            return newStats;
          });
          break;
      }

      toast({
        title: "Success",
        description: result.message,
      });

      // For non-delete actions, reload instances and their stats
      if (action !== 'delete') {
        const updatedInstances = await api.instances.list();
        setInstances(updatedInstances);
        
        // Refresh stats for the affected instance or all instances
        if (action === 'start' || action === 'restart') {
          // Wait a moment for the instance to fully start before fetching stats
          setTimeout(() => {
            loadResourceStats();
          }, 2000);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${action} instance`,
        variant: "destructive",
      });
    } finally {
      setActionLoading(prev => ({ ...prev, [`${instanceId}-${action}`]: false }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-red-100 text-red-800';
      case 'starting': return 'bg-yellow-100 text-yellow-800';
      case 'stopping': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-3 w-3" />;
      case 'stopped': return <Square className="h-3 w-3" />;
      default: return <RotateCcw className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const runningInstances = instances.filter(i => i.status === 'running').length;
  const totalInstances = instances.length;
  const maxInstances = user?.resource_limits?.max_instances || 10; // Default fallback
  const usagePercentage = totalInstances > 0 ? (totalInstances / maxInstances) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.first_name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Manage your n8n workflow instances and monitor your usage
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Instances</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInstances}</div>
              <p className="text-xs text-muted-foreground">
                {maxInstances - totalInstances} remaining
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Running Instances</CardTitle>
              <Play className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{runningInstances}</div>
              <p className="text-xs text-muted-foreground">
                Active workflows
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{user?.plan || 'Free'}</div>
              <p className="text-xs text-muted-foreground">
                {user?.subscription_status === 'active' ? 'Active' : 'Inactive'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
              <div className="flex items-center gap-2">
                {statsLoading && (
                  <RefreshCw className="h-3 w-3 animate-spin text-blue-600" />
                )}
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(usagePercentage)}%</div>
              <Progress value={usagePercentage} className="mt-2" />
              {statsLoading && (
                <p className="text-xs text-blue-600 mt-1">Updating...</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Backend Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <HealthStatusComponent variant="compact" showRefresh={true} />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="instances" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="instances">Instances</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Instances Tab */}
          <TabsContent value="instances" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Your Instances</h2>
                {instances.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadResourceStats(true)}
                      disabled={statsLoading}
                    >
                      {statsLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span className="ml-1">Refresh Stats</span>
                    </Button>
                    {!statsLoading && (
                      <span className="text-xs text-muted-foreground">
                        Next auto-refresh in {nextRefresh}s
                      </span>
                    )}
                  </div>
                )}
              </div>
              <CreateInstanceDialog onInstanceCreated={loadDashboardData}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Instance
                </Button>
              </CreateInstanceDialog>
            </div>

            {instances.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Server className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No instances yet</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Create your first n8n workflow instance to get started with automation
                  </p>
                  <CreateInstanceDialog onInstanceCreated={loadDashboardData}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Instance
                    </Button>
                  </CreateInstanceDialog>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {instances.map((instance) => (
                  <InstanceCard
                    key={instance.id}
                    instance={instance}
                    usage={instanceStats[instance.id] ? {
                      cpu: instanceStats[instance.id].cpu_usage,
                      memory: instanceStats[instance.id].memory_usage / (1024 * 1024), // Convert bytes to MB
                      storage: instanceStats[instance.id].disk_usage / (1024 * 1024 * 1024), // Convert bytes to GB
                      status: instance.status
                    } : undefined}
                    onAction={handleInstanceAction}
                    actionLoading={actionLoading}
                    statsLoading={statsLoading}
                    onEdit={loadDashboardData}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <h2 className="text-2xl font-bold">Resource Usage</h2>
            {instances.length > 0 ? (
              <UsageChart 
                instances={instances} 
                instanceStats={instanceStats} 
                statsLoading={statsLoading}
              />
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No usage data</h3>
                  <p className="text-gray-600 text-center">
                    Create some instances to see resource usage statistics
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <h2 className="text-2xl font-bold">Billing & Payments</h2>
            <PaymentHistory payments={payments} subscription={subscription} />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <p className="text-gray-600">{user?.first_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <p className="text-gray-600">{user?.last_name}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Limits</CardTitle>
                <CardDescription>
                  Your current plan limits and allocations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    <span className="text-sm">Max Instances: {user?.resource_limits?.max_instances || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    <span className="text-sm">CPU Limit: {user?.resource_limits?.cpu_limit || 'N/A'} cores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4" />
                    <span className="text-sm">Memory: {user?.resource_limits?.memory_limit || 'N/A'} MB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span className="text-sm">Storage: {user?.resource_limits?.storage_limit || 'N/A'} GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

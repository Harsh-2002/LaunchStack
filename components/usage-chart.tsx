"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Instance, InstanceStats, HistoryDataPoint, useApiClient } from '@/lib/api-client';
import { Cpu, HardDrive, Database, TrendingUp, Clock, RefreshCw } from 'lucide-react';

interface UsageChartProps {
  instances: Instance[];
  instanceStats: Record<string, InstanceStats>;
}

export function UsageChart({ instances, instanceStats }: UsageChartProps) {
  const apiClient = useApiClient();
  const [selectedPeriod, setSelectedPeriod] = useState('1h');
  const [historicalData, setHistoricalData] = useState<Record<string, HistoryDataPoint[]>>({});
  const [loadingHistory, setLoadingHistory] = useState(false);

  const periods = [
    { value: '10m', label: '10 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '6h', label: '6 hours' },
    { value: '24h', label: '24 hours' },
  ];

  // Load historical data for all instances
  const loadHistoricalData = async (period: string = selectedPeriod) => {
    if (instances.length === 0) return;

    setLoadingHistory(true);
    try {
      const historyPromises = instances.map(async (instance) => {
        try {
          const historyData = await apiClient.instances.getStatsHistory(instance.id, period);
          return { instanceId: instance.id, data: historyData };
        } catch (error) {
          console.warn(`Failed to load history for instance ${instance.id}:`, error);
          return { instanceId: instance.id, data: [] };
        }
      });

      const results = await Promise.all(historyPromises);
      const newHistoricalData: Record<string, HistoryDataPoint[]> = {};
      
      results.forEach(({ instanceId, data }) => {
        newHistoricalData[instanceId] = data;
      });

      setHistoricalData(newHistoricalData);
    } catch (error) {
      console.error('Failed to load historical data:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Load historical data when component mounts or period changes
  useEffect(() => {
    loadHistoricalData();
  }, [selectedPeriod, instances.length]);

  // Process historical data for charts
  const processedHistoricalData = () => {
    if (Object.keys(historicalData).length === 0) return [];

    // Get all timestamps and sort them
    const allTimestamps = new Set<string>();
    Object.values(historicalData).forEach(instanceData => {
      instanceData.forEach(point => allTimestamps.add(point.timestamp));
    });

    const sortedTimestamps = Array.from(allTimestamps).sort();

    const result = sortedTimestamps.map(timestamp => {
      const dataPoint: any = {
        time: new Date(timestamp).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          ...(selectedPeriod === '24h' ? { month: 'short', day: 'numeric' } : {})
        }),
        timestamp,
      };

      // Calculate average CPU and memory across all instances at this timestamp
      let totalCpu = 0;
      let totalMemory = 0;
      let instanceCount = 0;

      Object.values(historicalData).forEach(instanceData => {
        const point = instanceData.find(p => p.timestamp === timestamp);
        if (point) {
          totalCpu += point.cpu_usage;
          totalMemory += point.memory_usage / (1024 * 1024); // Convert to MB
          instanceCount++;
        }
      });

      if (instanceCount > 0) {
        dataPoint.cpu = totalCpu / instanceCount;
        dataPoint.memory = totalMemory / instanceCount;
      } else {
        dataPoint.cpu = 0;
        dataPoint.memory = 0;
      }

      return dataPoint;
    });
    
    return result;
  };

  const timeSeriesData = processedHistoricalData();

  // Aggregate current usage data
  const currentUsageData = instances.map(instance => {
    const stats = instanceStats[instance.id];
    return {
      name: instance.name,
      cpu: stats ? stats.cpu_usage : 0,
      memory: stats ? (stats.memory_usage / (1024 * 1024)) : 0, // Convert bytes to MB
    };
  });

  // Calculate average resource usage across instances
  const averageUsage = instances.length > 0 ? {
    cpu: instances.reduce((acc, instance) => {
      const stats = instanceStats[instance.id];
      return acc + (stats ? stats.cpu_usage : 0);
    }, 0) / instances.length,
    memory: instances.reduce((acc, instance) => {
      const stats = instanceStats[instance.id];
      return acc + (stats ? stats.memory_usage / (1024 * 1024) : 0); // Convert bytes to MB
    }, 0) / instances.length,
  } : { cpu: 0, memory: 0 };

  const totalLimits = instances.reduce((acc, instance) => {
    acc.cpu += instance.cpu_limit;
    acc.memory += instance.memory_limit;
    return acc;
  }, { cpu: 0, memory: 0 });

  const utilizationData = [
    {
      name: 'CPU',
      used: averageUsage.cpu,
      available: 100 - averageUsage.cpu,
      percentage: averageUsage.cpu,
      color: '#3b82f6',
    },
    {
      name: 'Memory',
      used: averageUsage.memory,
      available: totalLimits.memory - averageUsage.memory,
      percentage: totalLimits.memory > 0 ? (averageUsage.memory / totalLimits.memory) * 100 : 0,
      color: '#10b981',
    },
  ];

  const chartConfig = {
    cpu: {
      label: 'CPU',
      color: '#3b82f6',
    },
    memory: {
      label: 'Memory',
      color: '#10b981',
    },
  };

  return (
    <div className="space-y-6">
      {/* Historical Time Series Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resource Usage Over Time</CardTitle>
              <CardDescription>
                CPU and Memory utilization history
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {loadingHistory && (
                <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              <div className="flex gap-1">
                {periods.map((period) => (
                  <Button
                    key={period.value}
                    variant={selectedPeriod === period.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.value)}
                    disabled={loadingHistory}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            {timeSeriesData.length > 0 ? (
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 11 }} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  labelFormatter={(value) => `Time: ${value}`}
                />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke={chartConfig.cpu.color}
                  strokeWidth={2}
                  dot={false}
                  name="CPU %"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke={chartConfig.memory.color}
                  strokeWidth={2}
                  dot={false}
                  name="Memory MB"
                />
              </LineChart>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                {loadingHistory ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading historical data...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    No historical data available
                  </div>
                )}
              </div>
            )}
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Per-Instance Usage */}
      {currentUsageData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Instance Usage Breakdown</CardTitle>
            <CardDescription>
              Current resource utilization by instance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={currentUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="cpu"
                  fill={chartConfig.cpu.color}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="memory"
                  fill={chartConfig.memory.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Resource Utilization Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Resource Utilization</CardTitle>
          <CardDescription>
            Distribution of resource usage across CPU and Memory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[300px] w-[300px]">
              <PieChart>
                <Pie
                  data={utilizationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="percentage"
                >
                  {utilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: data.color }}
                              />
                              <span className="font-medium">{data.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Usage: {data.percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ChartContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            {utilizationData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}: {item.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Cell
} from 'recharts';
import { Instance, InstanceStats } from '@/lib/api-client';
import { Cpu, HardDrive, Database, TrendingUp } from 'lucide-react';

interface UsageChartProps {
  instances: Instance[];
  instanceStats: Record<string, InstanceStats>;
}

export function UsageChart({ instances, instanceStats }: UsageChartProps) {
  // Generate sample time-series data for demonstration
  const generateTimeSeriesData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date();
      hour.setHours(hour.getHours() - (23 - i));
      
      return {
        time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        cpu: Math.random() * 80 + 10,
        memory: Math.random() * 70 + 20,
        // Storage tracking removed
      };
    });
    return hours;
  };

  const timeSeriesData = generateTimeSeriesData();

  // Aggregate current usage data
  const currentUsageData = instances.map(instance => {
    const stats = instanceStats[instance.id];
    return {
      name: instance.name,
      cpu: stats ? stats.cpu_usage : 0,
      memory: stats ? (stats.memory_usage / (1024 * 1024)) : 0, // Convert bytes to MB
      // Storage tracking removed
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
    // Storage limits removed
    return acc;
  }, { cpu: 0, memory: 0 });

  const utilizationData = [
    {
      name: 'CPU',
      used: averageUsage.cpu,
      available: 100 - averageUsage.cpu, // CPU is percentage, so available is 100 - used
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
    // Storage tracking removed
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
    // Storage config removed
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageUsage.cpu.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Average CPU utilization across {instances.length} instance{instances.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageUsage.memory.toFixed(0)} MB</div>
            <p className="text-xs text-muted-foreground">
              of {totalLimits.memory} MB ({utilizationData[1].percentage.toFixed(1)}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Usage Over Time</CardTitle>
          <CardDescription>
            CPU and Memory utilization over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="cpu"
                stackId="1"
                stroke={chartConfig.cpu.color}
                fill={chartConfig.cpu.color}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="memory"
                stackId="1"
                stroke={chartConfig.memory.color}
                fill={chartConfig.memory.color}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Per-Instance Usage */}
      {currentUsageData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Instance Usage Breakdown</CardTitle>
            <CardDescription>
              Resource utilization by instance
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

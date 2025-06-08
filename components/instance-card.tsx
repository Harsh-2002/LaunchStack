"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Square, 
  RotateCcw, 
  ExternalLink,
  Edit,
  Trash2,
  Cpu,
  HardDrive,
  Database,
  Calendar,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import type { Instance } from '@/lib/api-client';
import { EditInstanceDialog } from '@/components/edit-instance-dialog';
import { ensureHttpsProtocol } from '@/lib/url-utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface InstanceCardProps {
  instance: Instance;
  usage?: {
    cpu: number;
    memory: number;
    storage: number;
    status: string;
  };
  onAction: (instanceId: string, action: 'start' | 'stop' | 'restart' | 'delete') => void;
  actionLoading: Record<string, boolean>;
  statsLoading?: boolean;
  onEdit: () => void;
}

export function InstanceCard({ instance, usage, onAction, actionLoading, statsLoading, onEdit }: InstanceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800 border-green-200';
      case 'stopped': return 'bg-red-100 text-red-800 border-red-200';
      case 'starting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'stopping': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expired': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-3 w-3" />;
      case 'stopped': return <Square className="h-3 w-3" />;
      case 'expired': return <AlertTriangle className="h-3 w-3" />;
      default: return <RotateCcw className="h-3 w-3 animate-spin" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cpuPercentage = usage ? (usage.cpu / instance.cpu_limit) * 100 : 0;
  const memoryPercentage = usage ? (usage.memory / instance.memory_limit) * 100 : 0;
  const storagePercentage = usage ? (usage.storage / instance.storage_limit) * 100 : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{instance.name}</CardTitle>
              <Badge variant="outline" className={getStatusColor(instance.status)}>
                {getStatusIcon(instance.status)}
                <span className="ml-1 capitalize">{instance.status}</span>
              </Badge>
            </div>
            <CardDescription>{instance.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <EditInstanceDialog instance={instance} onInstanceUpdated={onEdit}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </EditInstanceDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Instance</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{instance.name}"? This action cannot be undone and all data will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onAction(instance.id, 'delete')}
                    disabled={actionLoading[`${instance.id}-delete`]}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                  >
                    {actionLoading[`${instance.id}-delete`] && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {actionLoading[`${instance.id}-delete`] ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instance URL */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full justify-start"
          >
            <a 
              href={ensureHttpsProtocol(instance.url)} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {instance.url}
            </a>
          </Button>
        </div>

        {/* Resource Usage */}
        {usage ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Resource Usage</h4>
              {statsLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span>CPU</span>
                </div>
                <span>{usage.cpu.toFixed(1)} / {instance.cpu_limit} cores</span>
              </div>
              <Progress value={cpuPercentage} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  <span>Memory</span>
                </div>
                <span>{usage.memory.toFixed(1)} / {instance.memory_limit} MB</span>
              </div>
              <Progress value={memoryPercentage} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>Storage</span>
                </div>
                <span>{usage.storage.toFixed(1)} / {instance.storage_limit} GB</span>
              </div>
              <Progress value={storagePercentage} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Resource Usage</h4>
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
            <div className="space-y-2 opacity-50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span>CPU</span>
                </div>
                <span>Loading...</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div className="space-y-2 opacity-50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  <span>Memory</span>
                </div>
                <span>Loading...</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div className="space-y-2 opacity-50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>Storage</span>
                </div>
                <span>Loading...</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>
        )}

        {/* Instance Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(instance.created_at)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {instance.status === 'expired' && (
            <div className="flex-1 bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-purple-800 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Payment Required</span>
              </div>
              <p className="text-xs text-purple-600 mt-1">
                Instance suspended due to payment failure. Please update your payment method.
              </p>
            </div>
          )}
          {instance.status === 'stopped' && (
            <Button
              onClick={() => onAction(instance.id, 'start')}
              disabled={actionLoading[`${instance.id}-start`]}
              size="sm"
              className="flex-1"
            >
              {actionLoading[`${instance.id}-start`] && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <Play className="h-4 w-4 mr-1" />
              Start
            </Button>
          )}
          {instance.status === 'running' && (
            <Button
              onClick={() => onAction(instance.id, 'stop')}
              disabled={actionLoading[`${instance.id}-stop`]}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              {actionLoading[`${instance.id}-stop`] && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          )}
          {instance.status === 'running' && (
            <Button
              onClick={() => onAction(instance.id, 'restart')}
              disabled={actionLoading[`${instance.id}-restart`]}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              {actionLoading[`${instance.id}-restart`] && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <RotateCcw className="h-4 w-4 mr-1" />
              Restart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

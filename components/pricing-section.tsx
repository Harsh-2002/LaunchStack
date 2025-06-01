"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { WaitlistForm } from '@/components/waitlist-form';
import { Goal, Check, Info, Cpu, Database, Activity, Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro'>('starter');
  const [showComparison, setShowComparison] = useState(false);

  const features = {
    starter: [
      "1/2 CPU Core",
      "512 MB RAM",
      "2GB storage",
      "Unlimited operations",
      "Community support",
      "Weekly backups"
    ],
    pro: [
      "1 CPU Core (auto-scalable)",
      "1GB RAM (auto-scalable)",
      "10GB storage",
      "Unlimited operations",
      "Priority email support",
      "Daily backups",
      "Custom domain"
    ]
  };

  const handlePlanSelect = (plan: 'starter' | 'pro') => {
    setSelectedPlan(plan);
    setIsFormOpen(true);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center items-center mb-12">
          <Label htmlFor="billing-cycle" className={`mr-2 ${billingCycle === 'monthly' ? 'font-medium' : ''}`}>
            Monthly
          </Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === 'yearly'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
          />
          <Label htmlFor="billing-cycle" className={`ml-2 ${billingCycle === 'yearly' ? 'font-medium' : ''}`}>
            Yearly
          </Label>
          <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-full">Save 16%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="relative border-2 rounded-lg p-6 flex flex-col h-full transition-all duration-200 hover:border-black hover:shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Starter</h3>
              <p className="text-sm text-muted-foreground">For individuals and small projects</p>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold">${billingCycle === 'monthly' ? '2' : '20'}</span>
              <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            
            {/* Resource Specifications */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Cpu className="h-4 w-4 mr-2" />
                Resource Allocation
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Cpu className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>1/2 CPU Core</span>
                </div>
                <div className="flex items-center text-sm">
                  <Database className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>512 MB RAM</span>
                </div>
                <div className="flex items-center text-sm">
                  <Activity className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>Unlimited workflows & operations</span>
                </div>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              {features.starter.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-black mr-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <Goal className="h-5 w-5" />
                <span>UPI & PayPal Available</span>
              </div>
              <Button 
                onClick={() => handlePlanSelect('starter')}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative border-2 border-black rounded-lg p-6 flex flex-col h-full bg-gray-50 shadow-lg">
            <div className="absolute top-0 right-0 -translate-y-1/2 bg-black text-white text-xs font-medium py-1 px-3 rounded-full">
              POPULAR
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Pro</h3>
              <p className="text-sm text-muted-foreground">For growing teams and businesses</p>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold">${billingCycle === 'monthly' ? '5' : '50'}</span>
              <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            
            {/* Resource Specifications */}
            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Cpu className="h-4 w-4 mr-2" />
                Resource Allocation
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Cpu className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>1 CPU Core (auto-scalable)</span>
                </div>
                <div className="flex items-center text-sm">
                  <Database className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>1 GB RAM (auto-scalable)</span>
                </div>
                <div className="flex items-center text-sm">
                  <Activity className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>Unlimited workflows & operations</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>Multiple users</span>
                </div>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              {features.pro.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-black mr-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <Goal className="h-5 w-5" />
                <span>UPI & PayPal Available</span>
              </div>
              <Button 
                onClick={() => handlePlanSelect('pro')}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        
        {/* Pricing Comparison Toggle */}
        <div className="mt-16 text-center">
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2"
            onClick={() => setShowComparison(!showComparison)}
          >
            <Info className="h-4 w-4" />
            <span>{showComparison ? 'Hide Pricing Comparison' : 'Compare with n8n Cloud Pricing'}</span>
          </Button>
        </div>
        
        {/* Pricing Comparison Table */}
        {showComparison && (
          <div className="mt-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead>LaunchStack Starter</TableHead>
                  <TableHead>LaunchStack Pro</TableHead>
                  <TableHead>n8n Cloud Starter</TableHead>
                  <TableHead>n8n Cloud Pro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Monthly Price</TableCell>
                  <TableCell>${billingCycle === 'monthly' ? '2' : '1.67'}</TableCell>
                  <TableCell>${billingCycle === 'monthly' ? '5' : '4.17'}</TableCell>
                  <TableCell>$20</TableCell>
                  <TableCell>$50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CPU</TableCell>
                  <TableCell>1/2 Core</TableCell>
                  <TableCell>1 Core (auto-scalable)</TableCell>
                  <TableCell>Shared</TableCell>
                  <TableCell>Shared</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Memory</TableCell>
                  <TableCell>512 MB</TableCell>
                  <TableCell>1 GB (auto-scalable)</TableCell>
                  <TableCell>Not specified</TableCell>
                  <TableCell>Not specified</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Storage</TableCell>
                  <TableCell>2 GB</TableCell>
                  <TableCell>10 GB</TableCell>
                  <TableCell>Not specified</TableCell>
                  <TableCell>Not specified</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Active Workflows</TableCell>
                  <TableCell>Unlimited</TableCell>
                  <TableCell>Unlimited</TableCell>
                  <TableCell>5 limited</TableCell>
                  <TableCell>15 limited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Workflow Executions</TableCell>
                  <TableCell>Unlimited</TableCell>
                  <TableCell>Unlimited</TableCell>
                  <TableCell>2.5k/month limited</TableCell>
                  <TableCell>10k/month limited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Custom Domain</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dedicated Instance</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>No (shared)</TableCell>
                  <TableCell>No (shared)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Data Location</TableCell>
                  <TableCell>Mumbai, India</TableCell>
                  <TableCell>Mumbai, India</TableCell>
                  <TableCell>Frankfurt, Germany</TableCell>
                  <TableCell>Frankfurt, Germany</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              * n8n Cloud pricing and features based on published information as of June 2024. 
              LaunchStack provides dedicated resources with no workflow or execution limits.
            </p>
          </div>
        )}
        
        {/* Value Proposition */}
        <div className="mt-16 bg-gray-50 border border-gray-200 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4 text-center">Why LaunchStack Pricing Makes Sense</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-2">Dedicated Resources</h4>
              <p className="text-sm text-muted-foreground">
                Unlike shared hosting, each LaunchStack customer gets dedicated CPU and RAM resources allocated exclusively to their n8n instance.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">No Execution Limits</h4>
              <p className="text-sm text-muted-foreground">
                We don't limit your workflow executions or active workflows. Run as many automations as your resources can handle.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Transparent Pricing</h4>
              <p className="text-sm text-muted-foreground">
                Our pricing is simple and predictable - you always know exactly what you'll pay without worrying about overage charges.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <WaitlistForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        plan={selectedPlan}
        billingCycle={billingCycle}
      />
    </>
  );
}
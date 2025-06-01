"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { WaitlistForm } from '@/components/waitlist-form';
import { Goal } from 'lucide-react';

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro'>('starter');

  const features = {
    starter: [
      "Up to 90% Uptime Guarantee",
      "2GB storage",
      "Unlimited operations",
      "Community support",
      "Weekly backups"
    ],
    pro: [
      "Up to 95% Uptime Guarantee",
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
            <ul className="space-y-3 mb-8 flex-grow">
              {features.starter.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-black mr-2 shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
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
            <ul className="space-y-3 mb-8 flex-grow">
              {features.pro.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-black mr-2 shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
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
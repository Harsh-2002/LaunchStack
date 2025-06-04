"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { WaitlistForm } from '@/components/waitlist-form';
import { Goal, Check, Info, Cpu, Database, Activity, Users, Server, Gauge, CoinsIcon, DollarSign, Euro, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Currency conversion rates (as of June 2025)
const CONVERSION_RATES = {
  USD: 1,
  EUR: 0.92, // 1 USD = 0.92 EUR
  INR: 83.36 // 1 USD = 83.36 INR
};

// Currency symbols
const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  INR: '₹'
};

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro'>('starter');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'INR'>('USD');

  const features = {
    starter: [
      "1/2 CPU Core",
      "512 MB RAM",
      "2GB storage",
      "SQLite database",
      "Unlimited operations",
      "Community support",
      "Weekly backups"
    ],
    pro: [
      "1 CPU Core (auto-scalable)",
      "1GB RAM (auto-scalable)",
      "10GB storage",
      "PostgreSQL database",
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

  // Function to convert and format price
  const formatPrice = (usdPrice: number): string => {
    const convertedPrice = usdPrice * CONVERSION_RATES[currency];
    
    // Format based on currency
    switch (currency) {
      case 'USD':
        return `${CURRENCY_SYMBOLS.USD}${convertedPrice.toFixed(2)}`;
      case 'EUR':
        return `${CURRENCY_SYMBOLS.EUR}${convertedPrice.toFixed(2)}`;
      case 'INR':
        return `${CURRENCY_SYMBOLS.INR}${Math.round(convertedPrice)}`;
      default:
        return `${CURRENCY_SYMBOLS.USD}${convertedPrice.toFixed(2)}`;
    }
  };

  // Base prices in USD
  const starterMonthlyUSD = 2;
  const starterYearlyUSD = 20;
  const proMonthlyUSD = 5;
  const proYearlyUSD = 50;

  // Get current prices based on billing cycle
  const starterPrice = billingCycle === 'monthly' ? starterMonthlyUSD : starterYearlyUSD;
  const proPrice = billingCycle === 'monthly' ? proMonthlyUSD : proYearlyUSD;

  // Pricing table comparison values
  const starterMonthlyPrice = billingCycle === 'monthly' ? starterMonthlyUSD : (starterYearlyUSD / 12);
  const proMonthlyPrice = billingCycle === 'monthly' ? proMonthlyUSD : (proYearlyUSD / 12);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4">
        {/* Currency and Billing Cycle Selection */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center">
            <Label htmlFor="currency-select" className="text-sm font-medium whitespace-nowrap">
              Currency:
            </Label>
            <Select
              value={currency}
              onValueChange={(value) => setCurrency(value as 'USD' | 'EUR' | 'INR')}
            >
              <SelectTrigger id="currency-select" className="w-24 sm:w-28">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 inline" /> USD
                </SelectItem>
                <SelectItem value="EUR" className="flex items-center">
                  <Euro className="h-4 w-4 mr-2 inline" /> EUR
                </SelectItem>
                <SelectItem value="INR" className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-2 inline" /> INR
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center w-full sm:w-auto justify-center mt-4 sm:mt-0">
            <Label htmlFor="billing-cycle" className={`mr-2 ${billingCycle === 'monthly' ? 'font-medium' : ''} text-sm`}>
              Monthly
            </Label>
            <Switch
              id="billing-cycle"
              checked={billingCycle === 'yearly'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
            />
            <Label htmlFor="billing-cycle" className={`ml-2 ${billingCycle === 'yearly' ? 'font-medium' : ''} text-sm`}>
              Yearly
            </Label>
            <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-full">Save 16%</span>
          </div>
        </div>

        {/* Exchange Rate Note */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {currency !== 'USD' && (
              <>
                Current exchange rate: 1 USD = {currency === 'EUR' ? `${CURRENCY_SYMBOLS.EUR}${CONVERSION_RATES.EUR}` : `${CURRENCY_SYMBOLS.INR}${CONVERSION_RATES.INR}`}
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="relative border-2 rounded-lg p-4 sm:p-6 flex flex-col h-full transition-all duration-200 hover:border-black hover:shadow-lg">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-lg font-medium">Starter</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">For individuals and small projects</p>
            </div>
            <div className="mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl font-bold">{formatPrice(starterPrice)}</span>
              <span className="text-muted-foreground text-sm">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            
            {/* Resource Specifications */}
            <div className="mb-4 sm:mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h4 className="text-xs sm:text-sm font-medium mb-2 flex items-center">
                <Cpu className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-2" />
                Resource Allocation
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center text-xs sm:text-sm">
                  <Cpu className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>1/2 CPU Core</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Database className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>512 MB RAM</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Database className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>SQLite database</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Activity className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>Unlimited workflows & operations</span>
                </div>
              </div>
            </div>
            
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8 flex-grow text-sm">
              {features.starter.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 sm:h-5 w-4 sm:w-5 text-black mr-1.5 sm:mr-2 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 sm:space-y-4">
              {/* Payment Methods with Logos */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
                <span>Payment options:</span>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white p-1 rounded-md border border-gray-100 shadow-sm">
                    <Image 
                      src="/images/payment/upi.png" 
                      alt="UPI" 
                      width={35} 
                      height={20} 
                      className="h-4 sm:h-5 object-contain" 
                    />
                  </div>
                  <div className="bg-white p-1 rounded-md border border-gray-100 shadow-sm">
                    <Image 
                      src="/images/payment/paypal.png" 
                      alt="PayPal" 
                      width={45} 
                      height={20} 
                      className="h-4 sm:h-5 object-contain" 
                    />
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => handlePlanSelect('starter')}
                className="w-full bg-black text-white hover:bg-gray-800 text-sm sm:text-base py-2 sm:py-2.5"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative border-2 border-black rounded-lg p-4 sm:p-6 flex flex-col h-full bg-gray-50 shadow-lg">
            <div className="absolute top-0 right-0 -translate-y-1/2 bg-black text-white text-xs font-medium py-1 px-3 rounded-full">
              POPULAR
            </div>
            <div className="mb-3 sm:mb-4">
              <h3 className="text-lg font-medium">Pro</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">For growing teams and businesses</p>
            </div>
            <div className="mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl font-bold">{formatPrice(proPrice)}</span>
              <span className="text-muted-foreground text-sm">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            
            {/* Resource Specifications */}
            <div className="mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <h4 className="text-xs sm:text-sm font-medium mb-2 flex items-center">
                <Cpu className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-2" />
                Resource Allocation
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center text-xs sm:text-sm">
                  <Cpu className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>1 CPU Core (auto-scalable)</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Database className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>1 GB RAM (auto-scalable)</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Database className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>PostgreSQL database</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Activity className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>Unlimited workflows & operations</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Users className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-2 text-gray-500" />
                  <span>Multiple users</span>
                </div>
              </div>
            </div>
            
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8 flex-grow text-sm">
              {features.pro.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 sm:h-5 w-4 sm:w-5 text-black mr-1.5 sm:mr-2 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 sm:space-y-4">
              {/* Payment Methods with Logos */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
                <span>Payment options:</span>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white p-1 rounded-md border border-gray-100 shadow-sm">
                    <Image 
                      src="/images/payment/upi.png" 
                      alt="UPI" 
                      width={35} 
                      height={20} 
                      className="h-4 sm:h-5 object-contain" 
                    />
                  </div>
                  <div className="bg-white p-1 rounded-md border border-gray-100 shadow-sm">
                    <Image 
                      src="/images/payment/paypal.png" 
                      alt="PayPal" 
                      width={45} 
                      height={20} 
                      className="h-4 sm:h-5 object-contain" 
                    />
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => handlePlanSelect('pro')}
                className="w-full bg-black text-white hover:bg-gray-800 text-sm sm:text-base py-2 sm:py-2.5"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        
        {/* Pricing Comparison Label - Centered */}
        <div className="mt-12 sm:mt-16 text-center">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 inline-flex items-center">
            <Info className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
            n8n Cloud Pricing Comparison
          </h3>
        </div>
        
        {/* Pricing Comparison Table - Always Visible */}
        <div className="mt-4 overflow-x-auto -mx-4 sm:mx-0 pb-2">
          <div className="min-w-[600px] px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] sm:w-[200px] text-xs sm:text-sm">Feature</TableHead>
                  <TableHead className="text-xs sm:text-sm">LaunchStack Starter</TableHead>
                  <TableHead className="text-xs sm:text-sm">LaunchStack Pro</TableHead>
                  <TableHead className="text-xs sm:text-sm">n8n Cloud Starter</TableHead>
                  <TableHead className="text-xs sm:text-sm">n8n Cloud Pro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">Monthly Price</TableCell>
                  <TableCell className="text-xs sm:text-sm">{formatPrice(starterMonthlyPrice)}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{formatPrice(proMonthlyPrice)}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{formatPrice(24)}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{formatPrice(60)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">CPU</TableCell>
                  <TableCell className="text-xs sm:text-sm">1/2 Core</TableCell>
                  <TableCell className="text-xs sm:text-sm">1 Core (auto-scalable)</TableCell>
                  <TableCell className="text-xs sm:text-sm">Shared</TableCell>
                  <TableCell className="text-xs sm:text-sm">Shared</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">Memory</TableCell>
                  <TableCell className="text-xs sm:text-sm">512 MB</TableCell>
                  <TableCell className="text-xs sm:text-sm">1 GB (auto-scalable)</TableCell>
                  <TableCell className="text-xs sm:text-sm">Not specified</TableCell>
                  <TableCell className="text-xs sm:text-sm">Not specified</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">Storage</TableCell>
                  <TableCell className="text-xs sm:text-sm">2 GB</TableCell>
                  <TableCell className="text-xs sm:text-sm">10 GB</TableCell>
                  <TableCell className="text-xs sm:text-sm">Not specified</TableCell>
                  <TableCell className="text-xs sm:text-sm">Not specified</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">Active Workflows</TableCell>
                  <TableCell className="text-xs sm:text-sm">Unlimited*</TableCell>
                  <TableCell className="text-xs sm:text-sm">Unlimited*</TableCell>
                  <TableCell className="text-xs sm:text-sm">5 active workflows</TableCell>
                  <TableCell className="text-xs sm:text-sm">15 active workflows</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">Workflow Executions</TableCell>
                  <TableCell className="text-xs sm:text-sm">Unlimited*</TableCell>
                  <TableCell className="text-xs sm:text-sm">Unlimited*</TableCell>
                  <TableCell className="text-xs sm:text-sm">2.5k/month</TableCell>
                  <TableCell className="text-xs sm:text-sm">10k/month</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">Custom Domain</TableCell>
                  <TableCell className="text-xs sm:text-sm">No</TableCell>
                  <TableCell className="text-xs sm:text-sm">Yes</TableCell>
                  <TableCell className="text-xs sm:text-sm">No</TableCell>
                  <TableCell className="text-xs sm:text-sm">No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">Dedicated Instance</TableCell>
                  <TableCell className="text-xs sm:text-sm">Yes</TableCell>
                  <TableCell className="text-xs sm:text-sm">Yes</TableCell>
                  <TableCell className="text-xs sm:text-sm">No (shared)</TableCell>
                  <TableCell className="text-xs sm:text-sm">No (shared)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs sm:text-sm">Data Location</TableCell>
                  <TableCell className="text-xs sm:text-sm">Mumbai, India</TableCell>
                  <TableCell className="text-xs sm:text-sm">Mumbai, India</TableCell>
                  <TableCell className="text-xs sm:text-sm">Frankfurt, Germany</TableCell>
                  <TableCell className="text-xs sm:text-sm">Frankfurt, Germany</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center px-4 sm:px-0">
            * n8n Cloud pricing and features based on published information as of June 2025. 
            n8n prices shown are for monthly billing ($24/mo for Starter, $60/mo for Pro); they offer discounts for annual billing.
            <br />
            * Unlimited executions are subject to fair usage and available resources (CPU, RAM, storage).
          </p>
        </div>
        
        {/* Value Proposition with Icons */}
        <div className="mt-12 sm:mt-16 bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-center">Why LaunchStack Pricing Makes Sense</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex flex-col items-center text-center">
              <Server className="h-8 w-8 sm:h-10 sm:w-10 text-black mb-3 sm:mb-4" />
              <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Dedicated Resources</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Unlike shared hosting, each LaunchStack customer gets dedicated CPU and RAM resources allocated exclusively to their n8n instance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Gauge className="h-8 w-8 sm:h-10 sm:w-10 text-black mb-3 sm:mb-4" />
              <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">No Execution Limits</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We don't limit your workflow executions or active workflows. Run as many automations as your resources can handle.
              </p>
            </div>
            <div className="flex flex-col items-center text-center sm:col-span-2 md:col-span-1">
              <CoinsIcon className="h-8 w-8 sm:h-10 sm:w-10 text-black mb-3 sm:mb-4" />
              <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Transparent Pricing</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Our pricing is simple and predictable - you always know exactly what you'll pay without worrying about overage charges.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <WaitlistForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
}
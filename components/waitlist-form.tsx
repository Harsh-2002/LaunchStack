"use client";

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  useCase: z.enum(["automation", "data-integration", "workflows", "testing", "other"], {
    required_error: "Please tell us your primary use case.",
  }),
  currentTool: z.enum(["none", "zapier", "n8n-cloud", "self-hosted", "other"], {
    required_error: "Please tell us what you currently use.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: 'starter' | 'pro';
  billingCycle?: 'monthly' | 'yearly';
}

export function WaitlistForm({ isOpen, onClose, plan, billingCycle }: WaitlistFormProps) {
  const { toast } = useToast();
  const [selectedPlan] = useState(plan);
  const [selectedBillingCycle] = useState(billingCycle);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    useCase: 'automation',
    currentTool: 'none',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form data
      formSchema.parse(formData);
      
      // Submit to Formspree
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      
      if (!formspreeEndpoint) {
        throw new Error('Formspree endpoint not configured');
      }

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || '',
          useCase: formData.useCase,
          currentTool: formData.currentTool,
          plan: selectedPlan || 'not specified',
          billingCycle: selectedBillingCycle || 'not specified',
          timestamp: new Date().toISOString(),
          source: 'LaunchStack Waitlist'
        }),
      });

      if (response.ok) {
        toast({
          title: "You're on the priority list! 🎉",
          description: "Thanks for joining our waiting list. We'll contact you soon on a first-come, first-served basis.",
        });
        
        onClose();
        setFormData({
          name: '',
          email: '',
          company: '',
          useCase: 'automation',
          currentTool: 'none',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Handle different types of errors
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        
        toast({
          title: "Submission failed",
          description: errorMessage.includes('Formspree') 
            ? "Please check your internet connection and try again."
            : "There was an error submitting your information. Please try again.",
          variant: "destructive",
        });
        
        console.error('Form submission error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Join Our Priority Waiting List</DialogTitle>
          <DialogDescription>
            Be among the first to experience affordable n8n hosting! 
            {selectedPlan && (
              <>
                <br />
                <span className="font-medium">Selected Plan: {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} ({selectedBillingCycle || 'monthly'})</span>
              </>
            )}
            <br />
            We're accepting users on a first-come, first-served basis as we scale our infrastructure.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
            />
          </div>

          <div className="space-y-2">
            <Label>What's your primary use case? *</Label>
            <Select 
              value={formData.useCase}
              onValueChange={(value) => handleSelectChange('useCase', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your use case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automation">Workflow Automation</SelectItem>
                <SelectItem value="data-integration">Data Integration</SelectItem>
                <SelectItem value="workflows">Business Process Workflows</SelectItem>
                <SelectItem value="testing">API Testing & Monitoring</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.useCase && (
              <p className="text-sm text-red-500">{errors.useCase}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>What do you currently use for automation? *</Label>
            <Select 
              value={formData.currentTool}
              onValueChange={(value) => handleSelectChange('currentTool', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select current solution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nothing yet / Starting fresh</SelectItem>
                <SelectItem value="zapier">Zapier</SelectItem>
                <SelectItem value="n8n-cloud">n8n Cloud</SelectItem>
                <SelectItem value="self-hosted">Self-hosted n8n</SelectItem>
                <SelectItem value="other">Other tools</SelectItem>
              </SelectContent>
            </Select>
            {errors.currentTool && (
              <p className="text-sm text-red-500">{errors.currentTool}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding you to waitlist..." : "Join Waitlist"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
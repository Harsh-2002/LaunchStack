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
import { Textarea } from '@/components/ui/textarea';
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
  
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
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

      const submissionData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        useCase: formData.useCase,
        currentTool: formData.currentTool,
        plan: selectedPlan || 'not specified',
        billingCycle: selectedBillingCycle || 'not specified',
        timestamp: new Date().toISOString(),
        source: 'LaunchStack Waitlist',
        formType: 'waitlist'
      };

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
          toast({
            title: "You're on the priority list! 🎉",
            description: "Thanks for joining our waiting list. We'll contact you soon on a first-come, first-served basis.",
          });
        
        onClose();
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          useCase: 'automation',
          currentTool: 'none',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlanLabel = (plan: string | undefined) => {
    switch (plan) {
      case 'starter':
        return 'Starter Plan';
      case 'pro':
        return 'Pro Plan';
      default:
        return '';
    }
  };

  const getBillingLabel = (cycle: string | undefined) => {
    switch (cycle) {
      case 'monthly':
        return 'Monthly billing';
      case 'yearly':
        return 'Annual billing (16% discount)';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Join the LaunchStack Waitlist</DialogTitle>
          <DialogDescription>
            Complete the form below to join our priority waitlist.
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
              placeholder="Your name"
              className={errors.name ? "border-red-500" : ""}
                />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
              placeholder="you@example.com"
              className={errors.email ? "border-red-500" : ""}
                />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
            <Label htmlFor="company">Company (optional)</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
              placeholder="Your company"
                />
              </div>

              <div className="space-y-2">
            <Label htmlFor="useCase">Primary Use Case *</Label>
                <Select 
                  value={formData.useCase}
                  onValueChange={(value) => handleSelectChange('useCase', value)}
                >
              <SelectTrigger className={errors.useCase ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your primary use case" />
                  </SelectTrigger>
                  <SelectContent>
                <SelectItem value="automation">General automation</SelectItem>
                <SelectItem value="data-integration">Data integration</SelectItem>
                <SelectItem value="workflows">Business workflows</SelectItem>
                <SelectItem value="testing">Testing and monitoring</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
            {errors.useCase && <p className="text-xs text-red-500">{errors.useCase}</p>}
              </div>

              <div className="space-y-2">
            <Label htmlFor="currentTool">Currently Using *</Label>
                <Select 
                  value={formData.currentTool}
                  onValueChange={(value) => handleSelectChange('currentTool', value)}
                >
              <SelectTrigger className={errors.currentTool ? "border-red-500" : ""}>
                <SelectValue placeholder="What are you using now?" />
                  </SelectTrigger>
                  <SelectContent>
                <SelectItem value="none">Nothing yet</SelectItem>
                    <SelectItem value="zapier">Zapier</SelectItem>
                    <SelectItem value="n8n-cloud">n8n Cloud</SelectItem>
                    <SelectItem value="self-hosted">Self-hosted n8n</SelectItem>
                <SelectItem value="other">Other platform</SelectItem>
                  </SelectContent>
                </Select>
            {errors.currentTool && <p className="text-xs text-red-500">{errors.currentTool}</p>}
              </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
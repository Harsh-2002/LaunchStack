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
  phone: z.string().optional(),
  referralSource: z.enum(["search", "social", "friend", "other"], {
    required_error: "Please tell us how you found us.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: 'starter' | 'pro';
  billingCycle?: 'monthly' | 'yearly';
}

export function WaitlistForm({ isOpen, onClose }: WaitlistFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    referralSource: 'search',
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
      formSchema.parse(formData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Welcome to our waitlist! 🎉",
        description: "We'll notify you as soon as LaunchStack is ready for new users. Thanks for your interest!",
      });
      
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        referralSource: 'search',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Our Waitlist</DialogTitle>
          <DialogDescription>
            Be among the first to experience affordable n8n hosting! We'll notify you as soon as we're ready to welcome new users.
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
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label>How did you hear about us? *</Label>
            <Select 
              value={formData.referralSource}
              onValueChange={(value) => handleSelectChange('referralSource', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">Search Engine</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="friend">Friend/Colleague</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.referralSource && (
              <p className="text-sm text-red-500">{errors.referralSource}</p>
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
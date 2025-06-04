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

const enterpriseFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(1, { message: "Company name is required for Enterprise inquiries." }),
  jobTitle: z.string().min(1, { message: "Job title is required." }),
  phone: z.string().optional(),
  teamSize: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"], {
    required_error: "Please select your team size.",
  }),
  projectScope: z.enum(["single-project", "multiple-projects", "enterprise-wide", "custom-solution"], {
    required_error: "Please select your project scope.",
  }),
  budget: z.enum(["under-5k", "5k-15k", "15k-50k", "50k-100k", "100k+", "flexible"], {
    required_error: "Please select your budget range.",
  }),
  timeline: z.enum(["immediate", "1-month", "2-3-months", "3-6-months", "flexible"], {
    required_error: "Please select your timeline.",
  }),
  requirements: z.string().min(10, { message: "Please describe your requirements (minimum 10 characters)." }),
});

type FormData = z.infer<typeof formSchema>;
type EnterpriseFormData = z.infer<typeof enterpriseFormSchema>;

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: 'starter' | 'pro' | 'enterprise';
  billingCycle?: 'monthly' | 'yearly';
}

export function WaitlistForm({ isOpen, onClose, plan, billingCycle }: WaitlistFormProps) {
  const { toast } = useToast();
  const [selectedPlan] = useState(plan);
  const [selectedBillingCycle] = useState(billingCycle);
  const isEnterprise = plan === 'enterprise';
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    useCase: 'automation',
    currentTool: 'none',
  });
  
  const [enterpriseFormData, setEnterpriseFormData] = useState<EnterpriseFormData>({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    teamSize: '1-10',
    projectScope: 'single-project',
    budget: 'flexible',
    timeline: 'flexible',
    requirements: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (isEnterprise) {
      setEnterpriseFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (isEnterprise) {
      setEnterpriseFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form data based on plan type
      if (isEnterprise) {
        enterpriseFormSchema.parse(enterpriseFormData);
      } else {
        formSchema.parse(formData);
      }
      
      // Submit to Formspree
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      
      if (!formspreeEndpoint) {
        throw new Error('Formspree endpoint not configured');
      }

      const submissionData = isEnterprise ? {
        name: enterpriseFormData.name,
        email: enterpriseFormData.email,
        company: enterpriseFormData.company,
        jobTitle: enterpriseFormData.jobTitle,
        phone: enterpriseFormData.phone || '',
        teamSize: enterpriseFormData.teamSize,
        projectScope: enterpriseFormData.projectScope,
        budget: enterpriseFormData.budget,
        timeline: enterpriseFormData.timeline,
        requirements: enterpriseFormData.requirements,
        plan: selectedPlan || 'enterprise',
        billingCycle: 'custom',
        timestamp: new Date().toISOString(),
        source: 'LaunchStack Enterprise Inquiry',
        formType: 'enterprise'
      } : {
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
        if (isEnterprise) {
          toast({
            title: "Enterprise inquiry submitted! 🎯",
            description: "Thank you for your interest! Our team will contact you within 24 hours with a custom quote and consultation.",
          });
        } else {
          toast({
            title: "You're on the priority list! 🎉",
            description: "Thanks for joining our waiting list. We'll contact you soon on a first-come, first-served basis.",
          });
        }
        
        onClose();
        
        // Reset forms
        setFormData({
          name: '',
          email: '',
          company: '',
          useCase: 'automation',
          currentTool: 'none',
        });
        setEnterpriseFormData({
          name: '',
          email: '',
          company: '',
          jobTitle: '',
          phone: '',
          teamSize: '1-10',
          projectScope: 'single-project',
          budget: 'flexible',
          timeline: 'flexible',
          requirements: '',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<string, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
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
      <DialogContent className={`${isEnterprise ? 'sm:max-w-[600px] max-h-[90vh] overflow-y-auto' : 'sm:max-w-[450px]'}`}>
        <DialogHeader>
          <DialogTitle>
            {isEnterprise ? 'Enterprise Custom Solution Inquiry' : 'Join Our Priority Waiting List'}
          </DialogTitle>
          <DialogDescription>
            {isEnterprise ? (
              <>
                Get a custom quote for full-service automation solutions tailored to your business needs.
                Our team will contact you within 24 hours with a personalized proposal.
              </>
            ) : (
              <>
                Be among the first to experience affordable n8n hosting! 
                {selectedPlan && (
                  <>
                    <br />
                    <span className="font-medium">Selected Plan: {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} ({selectedBillingCycle || 'monthly'})</span>
                  </>
                )}
                <br />
                We're accepting users on a first-come, first-served basis as we scale our infrastructure.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isEnterprise ? (
            // Enterprise Form Fields
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={enterpriseFormData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={enterpriseFormData.jobTitle}
                    onChange={handleChange}
                    placeholder="CTO, Operations Manager, etc."
                  />
                  {errors.jobTitle && (
                    <p className="text-sm text-red-500">{errors.jobTitle}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={enterpriseFormData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={enterpriseFormData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  name="company"
                  value={enterpriseFormData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
                {errors.company && (
                  <p className="text-sm text-red-500">{errors.company}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Team Size *</Label>
                  <Select 
                    value={enterpriseFormData.teamSize}
                    onValueChange={(value) => handleSelectChange('teamSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.teamSize && (
                    <p className="text-sm text-red-500">{errors.teamSize}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Project Scope *</Label>
                  <Select 
                    value={enterpriseFormData.projectScope}
                    onValueChange={(value) => handleSelectChange('projectScope', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-project">Single automation project</SelectItem>
                      <SelectItem value="multiple-projects">Multiple automation projects</SelectItem>
                      <SelectItem value="enterprise-wide">Enterprise-wide automation</SelectItem>
                      <SelectItem value="custom-solution">Custom solution development</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projectScope && (
                    <p className="text-sm text-red-500">{errors.projectScope}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Budget Range *</Label>
                  <Select 
                    value={enterpriseFormData.budget}
                    onValueChange={(value) => handleSelectChange('budget', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                      <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k+">$100,000+</SelectItem>
                      <SelectItem value="flexible">Flexible / To be discussed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && (
                    <p className="text-sm text-red-500">{errors.budget}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Timeline *</Label>
                  <Select 
                    value={enterpriseFormData.timeline}
                    onValueChange={(value) => handleSelectChange('timeline', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (ASAP)</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.timeline && (
                    <p className="text-sm text-red-500">{errors.timeline}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Project Requirements & Goals *</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={enterpriseFormData.requirements}
                  onChange={handleChange}
                  placeholder="Please describe your automation needs, current challenges, integration requirements, and success criteria. The more details you provide, the better we can tailor our solution to your needs."
                  rows={4}
                />
                {errors.requirements && (
                  <p className="text-sm text-red-500">{errors.requirements}</p>
                )}
              </div>
            </>
          ) : (
            // Regular Waitlist Form Fields
            <>
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
            </>
          )}
          
          <DialogFooter className="mt-6">
            <Button 
              type="submit" 
              className={`w-full text-white hover:opacity-90 ${
                isEnterprise 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                  : 'bg-black hover:bg-gray-800'
              }`} 
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (isEnterprise ? "Submitting inquiry..." : "Adding you to waitlist...") 
                : (isEnterprise ? "Request Custom Quote" : "Join Waitlist")
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
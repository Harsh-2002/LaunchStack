"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  MessageSquare, 
  Globe, 
  HelpCircle, 
  Users, 
  ChevronRight 
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          _replyto: formState.email,
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        // Reset form after successful submission
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        // Auto-hide success message after 5 seconds
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      // Auto-hide error message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Build Workflows That Actually Work</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scale from prototype to production seamlessly. Fully managed N8N that lets you focus on what matters. Get expert support and guidance for your automation journey.
          </p>
        </div>
      </section>
      
      {/* FAQ Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Common Inquiries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <HelpCircle className="h-10 w-10 text-black mb-4" />
              <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
              <p className="text-gray-600 mb-4">Need help with your n8n workflows or having issues with your hosting?</p>
              <Button variant="link" className="p-0 text-black font-medium flex items-center">
                Get Technical Help <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Globe className="h-10 w-10 text-black mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Domains</h3>
              <p className="text-gray-600 mb-4">Want to use your own domain for your n8n instance? We can help set that up.</p>
              <Button variant="link" className="p-0 text-black font-medium flex items-center">
                Learn More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Users className="h-10 w-10 text-black mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enterprise Inquiries</h3>
              <p className="text-gray-600 mb-4">Looking for custom solutions or have special requirements for your team?</p>
              <Button variant="link" className="p-0 text-black font-medium flex items-center">
                Contact Sales <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 text-black mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      <a href="mailto:support@firstfinger.io" className="text-black hover:underline">support@firstfinger.io</a>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/firstfinger/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="bg-black text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Message Sent!</h3>
                  <p className="text-green-600">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : formStatus === 'error' ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-6">
                  <h3 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h3>
                  <p className="text-red-600">
                    Please try again or contact us directly at support@firstfinger.io
                  </p>
                </div>
              ) : null}
              
              {formStatus !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <Input 
                        id="name" 
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name" 
                        required 
                        disabled={isSubmitting}
                        className="border-gray-300 focus:border-black focus:ring-black disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your@email.com" 
                        required 
                        disabled={isSubmitting}
                        className="border-gray-300 focus:border-black focus:ring-black disabled:opacity-50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                    <Input 
                      id="subject" 
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="How can we help?" 
                      required 
                      disabled={isSubmitting}
                      className="border-gray-300 focus:border-black focus:ring-black disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                    <Textarea 
                      id="message" 
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your needs..." 
                      required
                      disabled={isSubmitting}
                      className="min-h-[150px] border-gray-300 focus:border-black focus:ring-black disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-black hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Inspirational Quote Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-light italic mb-6 leading-relaxed">
            "The best workflows are the ones that work reliably, scale effortlessly, and let you focus on building what matters most."
          </blockquote>
          <div className="text-gray-300">
            <p className="text-lg font-medium">— LaunchStack Team</p>
            <p className="text-sm mt-2">Empowering automation excellence since day one</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
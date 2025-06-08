"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import { useSignIn } from '@clerk/nextjs';
import { toast } from '@/hooks/use-toast';

export function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const { signIn } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      setEmailSent(true);
      toast({
        title: 'Reset link sent',
        description: 'Please check your email for password reset instructions.',
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: 'Error sending reset email',
        description: error.errors?.[0]?.message || 'Please check your email address and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Card className="shadow-xl border-2 bg-white/95 backdrop-blur-sm transition-all duration-200 hover:border-gray-300 hover:shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-gray-600 mb-4 text-sm">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="w-full h-10 text-sm"
              >
                Send another email
              </Button>
              
              <Link href="/login">
                <Button variant="ghost" className="w-full h-10 text-sm">
                  Back to sign in
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-2 bg-white/95 backdrop-blur-sm transition-all duration-200 hover:border-gray-300 hover:shadow-2xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-10 border-gray-200 focus:border-black focus:ring-black text-sm"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-10 bg-black hover:bg-gray-800 text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            disabled={loading || !email}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Sending...' : 'Send reset instructions'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

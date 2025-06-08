import { AuthForm } from '@/components/auth-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account - LaunchStack',
  description: 'Create your LaunchStack account to start hosting n8n instances with dedicated resources.',
};

export default function SignupPage() {
  return <AuthForm type="signup" />;
}

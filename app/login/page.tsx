import { AuthForm } from '@/components/auth-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - LaunchStack',
  description: 'Sign in to your LaunchStack account to manage your n8n hosting instances.',
};

export default function LoginPage() {
  return <AuthForm type="signin" />;
}

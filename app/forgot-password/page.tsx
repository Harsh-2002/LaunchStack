import { Metadata } from 'next';
import Link from 'next/link';
import { ResetPasswordForm } from '@/components/reset-password-form';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your LaunchStack account password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Back to Login Link */}
        <div className="mb-6">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Link>
        </div>

        {/* Main Content */}
        <div className="text-center mb-6">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-lg">LaunchStack</span>
          </Link>

          <h1 className="text-xl font-bold text-gray-900 mb-2">Reset your password</h1>
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Reset Password Form */}
        <ResetPasswordForm />

        {/* Additional Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Remember your password?{' '}
            <Link 
              href="/login" 
              className="font-medium text-black hover:text-gray-700 transition-colors duration-200"
            >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

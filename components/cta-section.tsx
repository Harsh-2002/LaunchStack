import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 animated-gradient">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[gradient_15s_ease_infinite]" />
      </div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Simplify Your Workflow Automation?</h2>
        <p className="text-lg text-gray-100 mb-10 max-w-3xl mx-auto">
          Join thousands of businesses that trust us with their n8n hosting needs.
          Get started today and focus on what matters most - your business.
        </p>
        <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
          <Link href="/pricing">
            Get Started Now <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
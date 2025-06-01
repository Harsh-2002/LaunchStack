import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FeatureCard } from '@/components/feature-card';
import { HeroSection } from '@/components/hero-section';
import { CtaSection } from '@/components/cta-section';
import { UseCasesCarousel } from '@/components/use-cases-carousel';
import { ComparisonTable } from '@/components/comparison-table';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LaunchStack?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide the most reliable and secure hosting solution for your n8n workflows.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            title="Affordable Pricing" 
            description="Start automating your workflows for just $2/month with our budget-friendly plans."
            icon="DollarSign"
          />
          <FeatureCard 
            title="Automatic Updates" 
            description="Always stay on the latest version of n8n with our automatic update system."
            icon="RefreshCcw"
          />
          <FeatureCard 
            title="Dedicated Support" 
            description="Get priority support from our team of n8n experts whenever you need assistance."
            icon="HeadphonesIcon"
          />
          <FeatureCard 
            title="Enhanced Security" 
            description="Your data is protected with enterprise-grade security measures and regular backups."
            icon="ShieldCheck"
          />
          <FeatureCard 
            title="Custom Domain" 
            description="Use your own domain for your n8n instance to maintain your brand identity."
            icon="Globe"
          />
          <FeatureCard 
            title="Scalable Resources" 
            description="Easily scale your resources up or down based on your workflow demands."
            icon="BarChart"
          />
        </div>
      </section>

      <section className="py-24 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Workflow Examples</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover how n8n can automate your workflows across various scenarios
            </p>
          </div>
          
          <UseCasesCarousel />
        </div>
      </section>
      
      <ComparisonTable />
      <CtaSection />
      <Footer />
    </main>
  );
}
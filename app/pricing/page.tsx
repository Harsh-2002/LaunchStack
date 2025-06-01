import Header from '@/components/header';
import Footer from '@/components/footer';
import { PricingSection } from '@/components/pricing-section';
import { FAQSection } from '@/components/faq-section';
import { CtaSection } from '@/components/cta-section';

export default function Pricing() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      <div className="flex-1">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. No hidden fees or surprises.
            </p>
          </div>
          
          <PricingSection />
        </section>
        
        <FAQSection />
        <CtaSection />
      </div>
      
      <Footer />
    </main>
  );
}
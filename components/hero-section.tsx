"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, ShieldCheck, DollarSign } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 bg-background overflow-hidden" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-foreground">
              Build Workflows That Actually Work
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 md:mb-8 max-w-xl">
              Scale from prototype to production seamlessly. Fully managed N8N that lets you focus on what matters.
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                <Link href="/pricing" aria-label="View pricing plans and get started">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/contact" aria-label="Contact us for more information">
                  Contact Us
                </Link>
              </Button>
            </div>
            
            <ul className="flex flex-col sm:flex-row sm:items-center mt-8 sm:mt-12 space-y-4 sm:space-y-0 sm:space-x-6" aria-label="Key benefits">
              <li className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 shrink-0" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Starting at $2/mo</span>
              </li>
              <li className="flex items-center">
                <Zap className="h-5 w-5 mr-2 shrink-0" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Lightning Fast</span>
              </li>
              <li className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 shrink-0" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Enterprise Security</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:flex justify-center items-center mt-6 md:mt-0"
          >
            <div className="relative w-full max-w-[650px] mx-auto">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-3 rounded-2xl border-[0.5px] border-gray-200 shadow-xl sm:shadow-2xl">
                <Image
                  src="/image.png"
                  alt="n8n Workflow Automation Interface showing connected nodes in a workflow"
                  width={700}
                  height={466}
                  className="rounded-xl w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent pointer-events-none" aria-hidden="true"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
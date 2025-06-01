"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, ShieldCheck, DollarSign } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 px-4 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Affordable n8n Hosting for Your Workflow Automation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              Get started with n8n hosting at just $2/month. Focus on your workflows while we handle the infrastructure.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
                <Link href="/pricing">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            
            <div className="flex items-center mt-12 space-x-6">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                <span className="text-sm text-muted-foreground">Starting at $2/mo</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                <span className="text-sm text-muted-foreground">Lightning Fast</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2" />
                <span className="text-sm text-muted-foreground">Enterprise Security</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-[550px] mx-auto">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl border border-gray-200 shadow-2xl">
                <Image
                  src="/image.png"
                  alt="n8n Workflow Automation Diagram"
                  width={600}
                  height={400}
                  className="rounded-xl w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
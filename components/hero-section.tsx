"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, ShieldCheck, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [randomImage, setRandomImage] = useState<string>('/images/hero/DrawKit Larry Character Illustration (11).png');

  useEffect(() => {
    // List of available hero images
    const heroImages = [
      '/images/hero/DrawKit Larry Character Illustration (3).png',
      '/images/hero/DrawKit Larry Character Illustration (4).png',
      '/images/hero/DrawKit Larry Character Illustration (5).png',
      '/images/hero/DrawKit Larry Character Illustration (6).png',
      '/images/hero/DrawKit Larry Character Illustration (11).png',
      '/images/hero/DrawKit Larry Character Illustration (13).png',
      '/images/hero/DrawKit Larry Character Illustration (14).png',
    ];
    
    try {
      // Get the last shown image from localStorage
      const lastShownImage = localStorage.getItem('lastShownHeroImage');
      
      // Filter out the last shown image to ensure we show a different one
      const availableImages = lastShownImage 
        ? heroImages.filter(img => img !== lastShownImage)
        : heroImages;
      
      // Select a random image from the available options
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const selectedImage = availableImages[randomIndex];
      
      // Save the current image to localStorage for next time
      localStorage.setItem('lastShownHeroImage', selectedImage);
      
      // Update state with the selected image
      setRandomImage(selectedImage);
    } catch (e) {
      // Fallback in case localStorage is not available (e.g., in private browsing)
      const randomIndex = Math.floor(Math.random() * heroImages.length);
      setRandomImage(heroImages[randomIndex]);
    }
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 px-4 overflow-hidden" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-foreground font-heading">
              Build Workflows That Actually Work
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-5 sm:mb-6 md:mb-8 max-w-xl font-body">
              Scale from prototype to production seamlessly. Fully managed N8N that lets you focus on what matters.
            </p>
            
            <div>
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                <Link href="/pricing" aria-label="View pricing plans and get started">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            
            <ul className="flex flex-col sm:flex-row sm:items-center mt-6 sm:mt-8 md:mt-10 space-y-3 sm:space-y-0 sm:space-x-6 font-body" aria-label="Key benefits">
              <li className="flex items-center">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-muted-foreground">Starting at $2/mo</span>
              </li>
              <li className="flex items-center">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-muted-foreground">Lightning Fast</span>
              </li>
              <li className="flex items-center">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-muted-foreground">Enterprise Security</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center items-center mt-6 sm:mt-8 lg:mt-0 lg:order-last"
          >
            <div className="relative w-full max-w-[250px] xs:max-w-[350px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] mx-auto">
              <div className="relative">
                <Image
                  src={randomImage}
                  alt="LaunchStack illustration showing workflow automation concept"
                  width={700}
                  height={466}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
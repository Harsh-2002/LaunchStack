"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="border-b border-border sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-6 sm:h-6"
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
          <span className="font-bold text-base sm:text-xl">LaunchStack</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <Link 
            href="/features" 
            className="text-sm font-medium hover:text-primary relative group transition-colors"
          >
            Features
            <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm font-medium hover:text-primary relative group transition-colors"
          >
            Pricing
            <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-medium hover:text-primary relative group transition-colors"
          >
            Contact
            <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
          </Link>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden relative" ref={menuRef}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 p-0"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
              >
                <div className="py-1">
                  <Link 
                    href="/features" 
                    className="block px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={closeMenu}
                  >
                    Features
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="block px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={closeMenu}
                  >
                    Pricing
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
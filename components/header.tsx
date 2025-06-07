"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { HealthStatusComponent } from '@/components/health-status';

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
        {/* Logo - Left */}
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
        
        {/* Desktop Navigation & Auth - Right */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8 lg:space-x-10">
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
          <SignedIn>
            <Link 
              href="/dashboard" 
              className="text-sm font-medium hover:text-primary relative group transition-colors"
            >
              Dashboard
              <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
            </Link>
          </SignedIn>
        </nav>
        
        {/* Authentication buttons */}
        <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-gray-200">
          <SignedIn>
            <HealthStatusComponent variant="minimal" showRefresh={false} />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="ghost" 
                size="sm"
                className="bg-white/80 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 backdrop-blur-sm px-4 py-2"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button 
                size="sm"
                className="bg-black hover:bg-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 border-0 px-4 py-2"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border-2 border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
                }
              }}
            />
          </SignedIn>
        </div>
        </div>
        
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
                  <SignedIn>
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                  </SignedIn>
                  
                  {/* Mobile Authentication */}
                  <div className="border-t border-gray-200 mt-3 pt-3 space-y-3">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="block w-full text-center px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 rounded-lg mx-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="block w-full text-center px-4 py-3 text-sm font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-300 rounded-lg mx-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                          Sign Up
                        </button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <div className="px-4 py-2.5 text-center">
                        <UserButton 
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              avatarBox: "w-9 h-9 border-2 border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
                            }
                          }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
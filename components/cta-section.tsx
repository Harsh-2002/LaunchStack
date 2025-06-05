"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Settings, LayoutGrid, Workflow } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function CtaSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Node class for the floating dots
    class Node {
      x: number;
      y: number;
      radius: number;
      pulseIntensity: number;
      pulseDirection: number;
      color: string;
      speedX: number;
      speedY: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(x: number, y: number, radius: number, color: string, canvasWidth: number, canvasHeight: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.pulseIntensity = Math.random() * 0.5;
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
        this.color = color;
        // Slow floating motion
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw node with pulse effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * (1 + this.pulseIntensity * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Update pulse
        this.pulseIntensity += 0.01 * this.pulseDirection;
        if (this.pulseIntensity > 1 || this.pulseIntensity < 0) {
          this.pulseDirection *= -1;
        }
        
        // Update position for floating effect
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > this.canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.speedY *= -1;
      }
    }

    // Create nodes
    const nodeCount = Math.floor(canvas.width / 70); // Increase density slightly
    const nodes: Node[] = [];
    const colors = [
      'rgba(75, 85, 99, 0.5)',  // Gray
      'rgba(107, 114, 128, 0.5)', // Gray
      'rgba(156, 163, 175, 0.5)', // Light gray
      'rgba(209, 213, 219, 0.3)'  // Very light gray
    ];

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 1 + Math.random() * 3; // Slightly larger nodes
      const color = colors[Math.floor(Math.random() * colors.length)];
      nodes.push(new Node(x, y, radius, color, canvas.width, canvas.height));
    }

    // Animation loop
    const animate = () => {
      // Create background gradient that matches footer
      const gradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw just the nodes (no connections)
      nodes.forEach(node => {
        node.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative py-24 px-4 bg-black overflow-hidden border-b border-gray-800">
      {/* Canvas Background */}
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Gradient overlay to help text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-0"></div>
      </div>

      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-500/10 rounded-full mix-blend-overlay filter blur-[80px] opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-600/10 rounded-full mix-blend-overlay filter blur-[80px] opacity-20 animate-pulse-slower"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-48 bg-gray-700/10 rounded-full mix-blend-overlay filter blur-[80px] opacity-20"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-heading">Need Custom Automation Solutions?</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto font-body">
          Beyond our standard plans, we provide Automation as a Service. Our experts can build custom n8n workflows, 
          provide dedicated infrastructure, and scale your automation needs based on your specific requirements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-5 text-white border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <Settings className="h-10 w-10 text-gray-300 animate-spin-slow" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-heading">Custom Workflows</h3>
            <p className="text-sm text-gray-300 font-body">
              Our experts build tailored n8n workflows to match your exact business processes
            </p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-5 text-white border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <LayoutGrid className="h-10 w-10 text-gray-300 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-heading">Dedicated Infrastructure</h3>
            <p className="text-sm text-gray-300 font-body">
              Scalable and reliable hosting solutions designed for your specific workload
            </p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-5 text-white border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <Workflow className="h-10 w-10 text-gray-300 animate-bounce-slow" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-heading">Ongoing Support</h3>
            <p className="text-sm text-gray-300 font-body">
              Continuous optimization, monitoring, and updates to keep your automations running smoothly
            </p>
          </div>
        </div>
        
        <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-heading">
          <Link href="/contact">
            Contact Our Experts <ChevronRight className="ml-2 h-4 w-4 animate-bounce-slow" />
          </Link>
        </Button>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slower {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </section>
  );
}
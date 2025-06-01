"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const workflowExamples = [
  {
    title: "Sales Lead Automation",
    industry: "Sales",
    description: "Automatically qualify and route leads from multiple sources to sales representatives",
    timeline: "2-3 days",
    category: "Sales & Marketing"
  },
  {
    title: "Employee Onboarding",
    industry: "HR",
    description: "Streamline new hire documentation, system access, and training workflows",
    timeline: "1-2 days",
    category: "Human Resources"
  },
  {
    title: "Invoice Processing",
    industry: "Finance",
    description: "Automate invoice capture, approval routing, and payment processing",
    timeline: "3-4 days",
    category: "Finance"
  },
  {
    title: "Social Media Management",
    industry: "Marketing",
    description: "Schedule and publish content across multiple platforms automatically",
    timeline: "1 day",
    category: "Marketing"
  },
  {
    title: "Customer Support Ticketing",
    industry: "Customer Service",
    description: "Route and prioritize support tickets based on keywords and urgency",
    timeline: "2-3 days",
    category: "Customer Service"
  },
  {
    title: "Inventory Management",
    industry: "Operations",
    description: "Automate stock alerts, reordering, and supplier communications",
    timeline: "3-4 days",
    category: "Operations"
  },
  {
    title: "Content Approval Workflow",
    industry: "Marketing",
    description: "Streamline content review and approval process across teams",
    timeline: "1-2 days",
    category: "Marketing"
  },
  {
    title: "Expense Report Processing",
    industry: "Finance",
    description: "Automate receipt collection, approval, and reimbursement",
    timeline: "2-3 days",
    category: "Finance"
  },
  {
    title: "Project Status Updates",
    industry: "Project Management",
    description: "Automated project milestone notifications and status reports",
    timeline: "1 day",
    category: "Project Management"
  },
  {
    title: "Customer Feedback Collection",
    industry: "Customer Success",
    description: "Automate feedback surveys and response analysis",
    timeline: "2-3 days",
    category: "Customer Success"
  },
  {
    title: "IT Service Requests",
    industry: "IT",
    description: "Automate IT ticket routing and resolution tracking",
    timeline: "2-3 days",
    category: "IT"
  }
];

export function UseCasesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerPage = 3;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => 
          prev + itemsPerPage >= workflowExamples.length ? 0 : prev + itemsPerPage
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= workflowExamples.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerPage < 0 ? workflowExamples.length - itemsPerPage : prev - itemsPerPage
    );
  };

  return (
    <div 
      className="relative max-w-7xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {workflowExamples.slice(currentIndex, currentIndex + itemsPerPage).map((workflow, index) => (
              <motion.div
                key={currentIndex + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-white mb-3">{workflow.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-sm px-2 py-1 bg-white/10 rounded-full text-white/80">
                          {workflow.industry}
                        </span>
                        <span className="text-sm px-2 py-1 bg-white/10 rounded-full text-white/80">
                          {workflow.timeline}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 flex-grow">{workflow.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute -left-4 top-1/2 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/20 hover:bg-black/40 text-white rounded-full"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute -right-4 top-1/2 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/20 hover:bg-black/40 text-white rounded-full"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(workflowExamples.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.floor(currentIndex / itemsPerPage) === index
                ? 'bg-white w-4'
                : 'bg-white/40'
            }`}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
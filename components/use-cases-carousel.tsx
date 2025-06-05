"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const workflowExamples = [
  {
    title: "Sales Lead Automation",
    description: "Automatically qualify and route leads from multiple sources to sales representatives"
  },
  {
    title: "Employee Onboarding",
    description: "Streamline new hire documentation, system access, and training workflows"
  },
  {
    title: "Invoice Processing",
    description: "Automate invoice capture, approval routing, and payment processing"
  },
  {
    title: "Social Media Management",
    description: "Schedule and publish content across multiple platforms automatically"
  },
  {
    title: "Customer Support Ticketing",
    description: "Route and prioritize support tickets based on keywords and urgency"
  },
  {
    title: "Inventory Management",
    description: "Automate stock alerts, reordering, and supplier communications"
  },
  {
    title: "Content Approval Workflow",
    description: "Streamline content review and approval process across teams"
  },
  {
    title: "Expense Report Processing",
    description: "Automate receipt collection, approval, and reimbursement"
  },
  {
    title: "Project Status Updates",
    description: "Automated project milestone notifications and status reports"
  },
  {
    title: "Customer Feedback Collection",
    description: "Automate feedback surveys and response analysis"
  },
  {
    title: "IT Service Requests",
    description: "Automate IT ticket routing and resolution tracking"
  },
  {
    title: "Email Campaign Automation",
    description: "Trigger personalized email sequences based on customer behavior and segments"
  },
  {
    title: "Data Backup Workflows",
    description: "Schedule automated backups across systems and send confirmation notifications"
  },
  {
    title: "Product Catalog Updates",
    description: "Sync product information across multiple platforms and marketplaces automatically"
  },
  {
    title: "Client Onboarding",
    description: "Automate welcome emails, document collection, and kickoff meeting scheduling"
  },
  {
    title: "HR Leave Management",
    description: "Streamline leave requests, approvals, and team calendar updates"
  },
  {
    title: "Contract Renewal Automation",
    description: "Send timely renewal reminders and automate contract generation processes"
  },
  {
    title: "Website Monitoring",
    description: "Receive alerts and trigger workflows when your website experiences issues"
  },
  {
    title: "Recruitment Pipeline",
    description: "Automate job posting, candidate screening, and interview scheduling"
  },
  {
    title: "Event Registration",
    description: "Streamline event registrations, confirmation emails, and attendee management"
  }
];

export function UseCasesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + itemsPerPage >= workflowExamples.length ? 0 : prev + itemsPerPage
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="overflow-hidden py-8">
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
                    <h3 className="text-xl font-semibold text-white mb-3 font-heading">{workflow.title}</h3>
                    <p className="text-gray-300 flex-grow font-body">{workflow.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
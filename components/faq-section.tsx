"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is n8n?",
      answer: "n8n is a workflow automation tool that allows you to connect different services and automate tasks. It's like Zapier or Integromat, but with more flexibility and can be self-hosted."
    },
    {
      question: "Why should I use your hosting instead of self-hosting?",
      answer: "Our hosting service saves you time and resources on server management, updates, and maintenance. We provide reliable hosting with up to 95% uptime on Pro plans, automatic updates, backups, and dedicated support so you can focus on building your workflows."
    },
    {
      question: "How does the waitlist work?",
      answer: "After joining our waitlist, we'll review your application and reach out to you with next steps. We're currently in a controlled rollout phase to ensure the highest quality service for all our customers."
    },
    {
      question: "Can I migrate my existing n8n workflows?",
      answer: "Yes! We provide a seamless migration process for your existing n8n workflows. Our team will guide you through the entire process to ensure a smooth transition."
    },
    {
      question: "What kind of support do you provide?",
      answer: "All plans include some level of support. Starter plans come with community support, Pro plans include priority email support."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Do you offer a free trial?",
      answer: "We currently don't offer a free trial, but we do offer a 14-day money-back guarantee if you're not satisfied with our service."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our n8n hosting service.
          </p>
        </div>
        
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border-b border-gray-200 overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="py-4 flex justify-between items-center cursor-pointer">
                <h3 className="text-left font-medium">{faq.question}</h3>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-300",
                    hoveredIndex === index ? "rotate-180" : ""
                  )} 
                />
              </div>
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out text-muted-foreground text-sm",
                  hoveredIndex === index ? "max-h-96 pb-4" : "max-h-0 pb-0"
                )}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
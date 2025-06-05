"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is n8n?",
      answer: "n8n is a workflow automation tool that allows you to connect different services and automate tasks. It's like Zapier or Make (formerly Integromat), but with more flexibility and can be self-hosted."
    },
    {
      question: "Why should I use your hosting instead of self-hosting?",
      answer: "Our hosting service saves you time and resources on server management, updates, and maintenance. We provide reliable hosting with 99.9% uptime on all plans, automatic updates, backups, and dedicated support so you can focus on building your workflows."
    },
    {
      question: "How does the waitlist work for Pro plans?",
      answer: "After joining our waitlist for the Pro plan, we'll review your application and reach out to you with next steps. We're currently in a controlled rollout phase to ensure the highest quality service for all our customers."
    },
    {
      question: "Can I migrate my existing n8n workflows?",
      answer: "Yes! We provide a seamless migration process for your existing n8n workflows. Our team will guide you through the entire process to ensure a smooth transition with minimal downtime."
    },
    {
      question: "What kind of support do you provide?",
      answer: "All plans include some level of support. Starter plans come with community support, while Pro plans include priority email support from our team of n8n experts."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. Upgrading from Starter to Pro is subject to availability."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 7-day free trial on our Starter plan with no credit card required. This gives you the opportunity to test our service and see if it meets your needs before committing."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept payments via PayPal and UPI. Additional payment methods will be added in the future."
    },
    {
      question: "Are there any limits on workflows or operations?",
      answer: "No, we don't limit the number of workflows or operations you can run. You can create as many workflows as you need within the resource limits of your chosen plan."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
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
                <h3 className="text-left font-medium font-heading">{faq.question}</h3>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-300",
                    hoveredIndex === index ? "rotate-180" : ""
                  )} 
                />
              </div>
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out text-muted-foreground text-sm font-body",
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
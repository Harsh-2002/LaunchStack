"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
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
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
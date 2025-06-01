"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Testimonials() {
  const testimonials = [
    {
      quote: "Switching to n8n Hosting was one of the best decisions we've made. Our workflows are now more reliable than ever.",
      author: "Sarah Johnson",
      role: "CTO, TechSolutions Inc.",
      avatar: "SJ"
    },
    {
      quote: "The dedicated support team has been incredible. They've helped us optimize our automation processes tremendously.",
      author: "David Chen",
      role: "Head of Operations, DataFlow",
      avatar: "DC"
    },
    {
      quote: "We've saved countless hours by not having to worry about server maintenance or updates. Highly recommended!",
      author: "Melissa Rodriguez",
      role: "Automation Lead, Innovate LLC",
      avatar: "MR"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-black transition-colors duration-300">
                <CardContent className="pt-6">
                  <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarFallback className="bg-black text-white">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
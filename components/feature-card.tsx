"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  // Fix type issue by using dynamic import with type checking
  const IconComponent = LucideIcons[icon] as React.ElementType;

  return (
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      role="listitem"
    >
      <Card className="h-full border-2 hover:border-black transition-colors duration-300">
        <CardHeader className="pb-2">
          <div className="bg-black text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4" aria-hidden="true">
            <IconComponent className="h-6 w-6" />
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base text-muted-foreground">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
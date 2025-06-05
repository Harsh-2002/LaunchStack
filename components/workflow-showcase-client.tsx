"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function WorkflowShowcaseClient() {
  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Powerful Workflow Automation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Build complex workflows with n8n's intuitive interface and connect to hundreds of services
          </p>
        </div>
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative shadow-2xl rounded-lg overflow-hidden mx-auto"
            style={{ maxWidth: '90%' }}
          >
            <Image
              src="/images/body/Home_Dev_O_Ps_43aa01a07b.webp"
              alt="n8n workflow interface with device mockup"
              width={1200}
              height={675}
              className="w-full h-auto rounded-lg"
              priority
            />
          </motion.div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground font-body max-w-3xl mx-auto">
            Create, visualize, and manage your workflows with n8n's intuitive interface. Connect to hundreds of services and APIs to automate your business processes.
          </p>
        </div>
      </div>
    </section>
  );
} 
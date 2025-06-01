import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Workflow, Server, HeartHandshake, GraduationCap } from 'lucide-react';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About LaunchStack</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make n8n workflow automation accessible, affordable, and hassle-free for businesses of all sizes.
            </p>
          </div>
          
          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                LaunchStack was founded with a simple yet powerful mission: to democratize workflow automation by making n8n accessible to everyone, regardless of technical expertise or budget constraints.
              </p>
              <p className="text-muted-foreground mb-6">
                We believe that powerful automation shouldn't be limited to enterprises with big budgets or teams with specialized DevOps knowledge. By providing simple, affordable n8n hosting, we enable businesses of all sizes to automate their workflows and focus on what matters most - growing their business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-black text-white hover:bg-gray-800">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">View Our Plans</Link>
                </Button>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <Workflow className="h-10 w-10 text-black mb-3" />
                  <h3 className="font-medium mb-2">Simplified Automation</h3>
                  <p className="text-sm text-muted-foreground">Making n8n accessible to everyone</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <Server className="h-10 w-10 text-black mb-3" />
                  <h3 className="font-medium mb-2">Managed Infrastructure</h3>
                  <p className="text-sm text-muted-foreground">No technical expertise required</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <HeartHandshake className="h-10 w-10 text-black mb-3" />
                  <h3 className="font-medium mb-2">Customer-First</h3>
                  <p className="text-sm text-muted-foreground">Dedicated support and guidance</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <GraduationCap className="h-10 w-10 text-black mb-3" />
                  <h3 className="font-medium mb-2">n8n Experts</h3>
                  <p className="text-sm text-muted-foreground">Specialized in workflow optimization</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Story */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border mb-8">
              <p className="text-muted-foreground mb-4">
                LaunchStack began when our founding team discovered the power of n8n for workflow automation but found that many businesses struggled with the technical complexity of self-hosting. We saw an opportunity to create a specialized service that would make n8n accessible to everyone.
              </p>
              <p className="text-muted-foreground mb-4">
                Having worked extensively with n8n and other automation tools, we understood the challenges that businesses face when trying to implement workflow automation. The technical barriers to entry were simply too high for many small and medium-sized businesses.
              </p>
              <p className="text-muted-foreground">
                Today, LaunchStack serves businesses across India and beyond, providing reliable, affordable n8n hosting with expert support. We're proud to help our customers save countless hours through powerful automation, allowing them to focus on growing their businesses instead of managing infrastructure.
              </p>
            </div>
          </div>
          
          {/* Our Expertise */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center">Our n8n Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Infrastructure Optimization</h3>
                <p className="text-muted-foreground">
                  Our team has extensive experience optimizing container-based environments for n8n, ensuring reliable performance and scalability. We've fine-tuned our infrastructure specifically for n8n workloads.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Workflow Development</h3>
                <p className="text-muted-foreground">
                  We've built hundreds of n8n workflows across various industries, from simple automation to complex multi-step processes. Our team understands the nuances of n8n's capabilities and best practices.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Integration Knowledge</h3>
                <p className="text-muted-foreground">
                  With deep expertise in n8n's integration capabilities, we've worked with dozens of third-party services and APIs, understanding how to optimize connections and troubleshoot common issues.
                </p>
              </div>
            </div>
          </div>
          
          {/* Values */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
                <p className="text-muted-foreground">
                  We believe in making complex technology simple and accessible. From our user interface to our pricing structure, we strive for clarity and ease of use.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Reliability</h3>
                <p className="text-muted-foreground">
                  We understand that our customers rely on their workflows for critical business operations. That's why we prioritize stability, security, and consistent performance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Affordability</h3>
                <p className="text-muted-foreground">
                  We're committed to providing value-based pricing that makes powerful automation accessible to businesses of all sizes, from solopreneurs to growing companies.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Customer Success</h3>
                <p className="text-muted-foreground">
                  Your success is our success. We're dedicated to providing the support, resources, and expertise you need to maximize the value of your n8n workflows.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-24 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started with n8n?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Launch your n8n instance today and experience the power of workflow automation without the technical complexity.
            </p>
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
              <Link href="/pricing">View Our Plans</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
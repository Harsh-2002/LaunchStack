import Header from '@/components/header';
import Footer from '@/components/footer';
import { Shield, Lock, Database, Server, Globe, FileText, Users } from 'lucide-react';

export default function Security() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Security & Privacy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At LaunchStack, we take the security and privacy of your data seriously. Learn how we protect your information and workflows.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-start mb-4">
                <Server className="h-8 w-8 text-black mr-4" />
                <h2 className="text-2xl font-bold">Isolated Container Architecture</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Each customer receives their own isolated n8n instance running in a dedicated container environment. This container-based approach ensures:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Complete isolation between customer instances</li>
                <li>Enhanced security through containerization</li>
                <li>No data sharing between customers</li>
                <li>Independent resource allocation for optimal performance</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-start mb-4">
                <Lock className="h-8 w-8 text-black mr-4" />
                <h2 className="text-2xl font-bold">Data Encryption</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Your data is protected using industry-standard encryption methods:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Encryption at Rest:</strong> All stored data is encrypted on disk</li>
                <li><strong>Encryption in Transit:</strong> All data transmissions use TLS 1.2+ encryption</li>
                <li><strong>Secure Credentials:</strong> Your workflow credentials are encrypted and securely stored</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-start mb-4">
                <Database className="h-8 w-8 text-black mr-4" />
                <h2 className="text-2xl font-bold">Data Ownership & Privacy</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                You maintain complete ownership of your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We do not access your workflow data except for maintenance or troubleshooting with your permission</li>
                <li>All data is processed and stored in our Mumbai, India datacenter</li>
                <li>You can export or delete your data at any time</li>
                <li>We do not use your data for marketing or sell it to third parties</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-start mb-4">
                <Shield className="h-8 w-8 text-black mr-4" />
                <h2 className="text-2xl font-bold">Security Practices</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Our security measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Regular security updates and patches for all systems</li>
                <li>Network security monitoring and intrusion detection</li>
                <li>Regular backups of your workflow data</li>
                <li>Access controls and authentication for all systems</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-start mb-4">
                <Globe className="h-8 w-8 text-black mr-4" />
                <h2 className="text-2xl font-bold">Data Location</h2>
              </div>
              <p className="text-muted-foreground">
                All LaunchStack services and customer data are hosted in a secure datacenter in Mumbai, India. This provides optimal performance for customers in India and surrounding regions while maintaining compliance with data locality requirements.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-start mb-4">
                <Users className="h-8 w-8 text-black mr-4" />
                <h2 className="text-2xl font-bold">User Authentication</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                We implement secure user authentication:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Secure password policies</li>
                <li>Protection against brute force attacks</li>
                <li>Session management and automatic timeouts</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-start mb-4">
                <FileText className="h-8 w-8 text-black mr-4" />
                <h2 className="text-2xl font-bold">Privacy Policy</h2>
              </div>
              <p className="text-muted-foreground">
                Our privacy policy outlines in detail how we collect, use, and protect your personal information. We are committed to transparency in our data practices and compliance with applicable privacy regulations.
              </p>
              <div className="mt-4">
                <a href="/privacy" className="text-black font-medium hover:underline">Read our full Privacy Policy →</a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Have questions about our security practices or need more information?
            </p>
            <a href="/contact" className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Contact Our Security Team
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
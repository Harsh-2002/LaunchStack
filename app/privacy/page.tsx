import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: June 15, 2024</p>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
              <div className="flex items-start mb-4">
                <Shield className="h-6 w-6 text-black mr-3 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  At LaunchStack, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our n8n hosting service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access our service.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Personal Data</h3>
            <p>
              We may collect personal identification information from you in a variety of ways, including, but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>When you register for an account</li>
              <li>When you subscribe to our service</li>
              <li>When you fill out a form</li>
              <li>When you respond to a survey</li>
              <li>When you make a payment</li>
            </ul>
            <p>The personal information we collect may include:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your name, email address, and contact details</li>
              <li>Billing information and payment details</li>
              <li>Company information (if applicable)</li>
              <li>Usage data and service preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">n8n Workflow Data</h3>
            <p>
              As a hosting provider for n8n, we have access to the servers where your workflow data is stored. However:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>We do not access, view, or process your workflow data unless explicitly requested by you for troubleshooting purposes</li>
              <li>Your data is stored in isolated environments specific to your account</li>
              <li>We implement strict access controls to ensure your data privacy</li>
              <li>All data is encrypted at rest and in transit</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h3>
            <p>
              When you access our service, we may automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Service usage patterns</li>
              <li>Server performance metrics relevant to your instance</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              How We Use Your Information
            </h2>
            
            <p>
              We may use the information we collect from you for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>To provide and maintain our service</li>
              <li>To process your payments and manage your account</li>
              <li>To notify you about changes to our service</li>
              <li>To monitor usage of our service for security and optimization</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To respond to your customer service requests</li>
              <li>To send you service updates and promotional materials (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Data Storage and Security</h2>
            
            <p>
              Your data is stored on servers located in Mumbai, India. We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encryption of data at rest and in transit using industry-standard protocols</li>
              <li>Container-based isolation between customer environments</li>
              <li>Regular security updates and patches</li>
              <li>Restricted access controls for our staff</li>
              <li>Regular security assessments and monitoring</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Data Retention</h2>
            
            <p>
              We will retain your personal information only for as long as is necessary for the purposes set out in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>
            <p>
              If you wish to request that we delete your data, please contact us at support@launchstack.in.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Disclosure of Your Information</h2>
            
            <p>
              We may disclose your personal information in the following situations:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
              <li><strong>To Service Providers:</strong> We may share your information with third-party vendors and service providers that provide services on our behalf, such as payment processing and customer support.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Your Data Protection Rights</h2>
            
            <p>
              Depending on your location, you may have the following data protection rights:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to access, update, or delete the information we have on you</li>
              <li>The right to rectification (to have your information corrected if inaccurate)</li>
              <li>The right to object (to our processing of your personal data)</li>
              <li>The right of restriction (to request that we restrict the processing of your personal data)</li>
              <li>The right to data portability (to receive a copy of your data in a structured format)</li>
              <li>The right to withdraw consent (where we rely on your consent to process your personal data)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Tracking Technologies</h2>
            
            <p>
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>By email: privacy@launchstack.in</li>
              <li>By visiting the contact page on our website: <Link href="/contact" className="text-black underline">Contact Us</Link></li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg mt-12 border border-gray-100">
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-black mr-3 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  This privacy policy was created to provide clarity about our data practices. It is not intended to and does not create any contractual or other legal rights in or on behalf of any party.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
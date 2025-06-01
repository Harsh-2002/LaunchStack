import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ScrollText, AlertTriangle, Clock, Ban } from 'lucide-react';

export default function TermsOfService() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: June 15, 2024</p>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
              <div className="flex items-start mb-4">
                <ScrollText className="h-6 w-6 text-black mr-3 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  Please read these Terms of Service carefully before using the LaunchStack n8n hosting service. Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-black mr-3 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Service Description</h2>
            
            <p>
              LaunchStack provides a managed hosting service for n8n, a workflow automation tool. Our service includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provisioning and maintenance of n8n instances</li>
              <li>Automated backups</li>
              <li>Technical support as specified in your selected plan</li>
              <li>Security updates and patches</li>
              <li>Monitoring and incident response</li>
            </ul>
            <p>
              The specific features and limitations of the service depend on the plan you select. Plan details are available on our <Link href="/pricing" className="text-black underline">Pricing Page</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Account Terms</h2>
            
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Subscription and Billing</h2>
            
            <p>
              Our service is billed on a subscription basis. You will be billed in advance on a recurring basis, depending on the billing cycle you select when purchasing a subscription.
            </p>
            <p>
              We reserve the right to change our subscription fees upon thirty (30) days' notice. Such notice may be provided by posting the changes to the LaunchStack website or via email.
            </p>
            <p>
              All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities, and you shall be responsible for payment of all such taxes, levies, or duties.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Refund Policy</h2>
            
            <p>
              We offer a 14-day money-back guarantee for new subscriptions. If you are not satisfied with our service within the first 14 days of your subscription, you may request a full refund by contacting our support team at support@launchstack.in.
            </p>
            <p>
              After the 14-day period, subscriptions are non-refundable except where required by law. If you cancel your subscription, you will continue to have access to the Service until the end of your current billing period.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Service Availability and Uptime</h2>
            
            <p>
              We strive to maintain high availability of our service. Our Pro plan includes a 95% uptime guarantee. This excludes scheduled maintenance windows, which will be announced at least 24 hours in advance whenever possible.
            </p>
            <p>
              In the event that we fail to meet our uptime guarantee, you may be eligible for service credits as specified in our <Link href="/contact" className="text-black underline">Support Policy</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Ownership and Privacy</h2>
            
            <p>
              You retain all rights to your data. We do not own the workflows, credentials, or any other data you store on your n8n instance.
            </p>
            <p>
              Our privacy practices are detailed in our <Link href="/privacy" className="text-black underline">Privacy Policy</Link>, which is incorporated into these Terms of Service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. User Responsibilities</h2>
            
            <p>
              While using our service, you agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the service for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Violate or infringe upon the rights of others, including intellectual property rights</li>
              <li>Transmit any material that is defamatory, obscene, threatening, or invades the privacy or rights of any third party</li>
              <li>Attempt to gain unauthorized access to any portion of the service or its related systems</li>
              <li>Use the service in a manner that could damage, disable, overburden, or impair the service or interfere with any other party's use of the service</li>
              <li>Attempt to reverse-engineer, decompile, or otherwise attempt to extract the source code of our software</li>
              <li>Use the service to distribute malware, viruses, or any other malicious code</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              8. Term and Termination
            </h2>
            
            <p>
              These Terms shall remain in full force and effect while you use the Service. We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
            </p>
            <p>
              After termination, we will store your data for a period of 30 days, during which you may request a copy of your data. After this period, we reserve the right to delete all data associated with your account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
            
            <p>
              In no event shall LaunchStack, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p>
              Our liability is limited to the maximum extent permitted by law. In jurisdictions where limitation of liability for consequential or incidental damages is not permitted, our liability shall be limited to the maximum extent permitted by law.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Disclaimer of Warranties</h2>
            
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            <p>
              LaunchStack, its subsidiaries, affiliates, and licensors do not warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The Service will function uninterrupted, secure, or available at any particular time or location</li>
              <li>Any errors or defects will be corrected</li>
              <li>The Service is free of viruses or other harmful components</li>
              <li>The results of using the Service will meet your requirements</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
              <Ban className="h-5 w-5 mr-2" />
              11. Prohibited Uses
            </h2>
            
            <p>
              The n8n instances provided through our service may not be used for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Mining cryptocurrency</li>
              <li>Processing activities that constitute or encourage conduct that would be considered a criminal offense, give rise to civil liability, or otherwise violate any law</li>
              <li>Processing activities designed to overwhelm or harm third-party services (including DDoS attacks)</li>
              <li>Distribution of unlicensed copyrighted materials</li>
              <li>Sending unsolicited mass communications (spam)</li>
              <li>Activities that could reasonably be expected to cause excessive load on our infrastructure</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate service to any customer engaging in these prohibited activities.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Modifications to the Service and Terms</h2>
            
            <p>
              We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.
            </p>
            <p>
              We may modify these Terms from time to time. We will notify you of any material changes by posting the new Terms on our website or sending you an email. Your continued use of the Service after such modifications will constitute your acknowledgment of the modified Terms and agreement to abide and be bound by them.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">13. Governing Law and Dispute Resolution</h2>
            
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, India.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">14. Contact Information</h2>
            
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>By email: legal@launchstack.in</li>
              <li>By visiting the contact page on our website: <Link href="/contact" className="text-black underline">Contact Us</Link></li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg mt-12 border border-gray-100">
              <p className="text-sm">
                By using our service, you acknowledge that you have read these Terms of Service, understood them, and agree to be bound by them. If you do not agree to these Terms of Service, you are not authorized to use the Service.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
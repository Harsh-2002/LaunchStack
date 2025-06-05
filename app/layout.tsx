import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Work_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['600', '700']
});

const workSans = Work_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  weight: ['400', '500']
});

// Define viewport metadata as an object since the Viewport type is not available in this Next.js version
const viewportMetadata = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://launch-stack.srvr.site'),
  title: {
    default: 'LaunchStack - Affordable n8n Hosting Service',
    template: '%s | LaunchStack'
  },
  description: 'Professional n8n hosting service with dedicated resources, unlimited workflows, and 99.9% uptime guarantee. Starting at just $2/month.',
  keywords: ['n8n hosting', 'workflow automation', 'n8n cloud alternative', 'managed n8n', 'n8n server', 'automation platform', 'no-code automation'],
  creator: 'LaunchStack Team',
  publisher: 'LaunchStack',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  // Include viewport properties directly in metadata (this is supported in Next.js 13)
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://launch-stack.srvr.site',
    title: 'LaunchStack - Affordable n8n Hosting Service',
    description: 'Professional n8n hosting service with dedicated resources, unlimited workflows, and 99.9% uptime guarantee.',
    siteName: 'LaunchStack',
    images: [
      {
        url: '/images/preview/preview.webp',
        width: 1200,
        height: 630,
        alt: 'LaunchStack - n8n Hosting Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LaunchStack - Affordable n8n Hosting Service',
    description: 'Professional n8n hosting service with dedicated resources, unlimited workflows, and 99.9% uptime guarantee.',
    images: ['/images/preview/preview.webp'],
  },
  alternates: {
    canonical: 'https://launch-stack.srvr.site',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${workSans.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={workSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
        {/* Organization Schema Markup */}
        <Script id="schema-organization" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LaunchStack",
              "url": "https://launch-stack.srvr.site",
              "logo": "https://launch-stack.srvr.site/logo.svg",
              "description": "Professional n8n hosting service with dedicated resources, unlimited workflows, and 99.9% uptime guarantee.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressLocality": "Mumbai"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "support@firstfinger.io"
              },
              "sameAs": [
                "https://www.linkedin.com/company/firstfinger/?viewAsMember=true"
              ]
            }
          `}
        </Script>
        {/* Service Schema Markup */}
        <Script id="schema-service" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "n8n Hosting",
              "provider": {
                "@type": "Organization",
                "name": "LaunchStack"
              },
              "description": "Managed n8n hosting service with dedicated resources and unlimited workflow executions",
              "offers": {
                "@type": "Offer",
                "price": "2.00",
                "priceCurrency": "USD",
                "priceValidUntil": "${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}",
                "availability": "https://schema.org/InStock"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
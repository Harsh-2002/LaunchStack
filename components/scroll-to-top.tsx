import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const ScrollToTopClient = dynamic(() => import('./scroll-to-top-client'), { 
  ssr: false 
});

export function ScrollToTop() {
  return <ScrollToTopClient />;
} 
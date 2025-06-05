import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const WorkflowShowcaseClient = dynamic(() => import('./workflow-showcase-client'), { 
  ssr: false 
});

export function WorkflowShowcase() {
  return <WorkflowShowcaseClient />;
} 
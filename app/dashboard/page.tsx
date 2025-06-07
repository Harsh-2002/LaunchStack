import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardContent } from '@/components/dashboard-content';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/');
  }

  return <DashboardContent />;
}

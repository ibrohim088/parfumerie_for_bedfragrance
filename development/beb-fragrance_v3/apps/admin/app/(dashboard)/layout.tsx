'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout/AdminLayout';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Spinner } from '@/components/ui/Spinner/Spinner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { admin, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push('/login');
    }
  }, [admin, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!admin) return null;

  return <AdminLayout>{children}</AdminLayout>;
}

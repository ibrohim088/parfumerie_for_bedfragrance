'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import AccountSidebar from '@/components/account/AccountSidebar/AccountSidebar';
import styles from './AccountLayout.module.scss';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push(`/${locale}/auth/login`);
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AccountSidebar />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

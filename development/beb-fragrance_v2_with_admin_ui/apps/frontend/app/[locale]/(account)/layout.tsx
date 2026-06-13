import { ReactNode } from 'react';
import AccountSidebar from '@/components/layout/AccountSidebar/AccountSidebar';
import styles from './account-layout.module.scss';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className={styles.accountLayout}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <AccountSidebar />
        </aside>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}

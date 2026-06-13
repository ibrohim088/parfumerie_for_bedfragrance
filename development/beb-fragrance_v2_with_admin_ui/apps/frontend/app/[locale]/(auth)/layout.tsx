import { ReactNode } from 'react';
import styles from './auth-layout.module.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.authLayout}>
      {children}
    </div>
  );
}

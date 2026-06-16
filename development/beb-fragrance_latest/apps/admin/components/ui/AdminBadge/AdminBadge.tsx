import React from 'react';
import styles from './AdminBadge.module.scss';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'pending';

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const AdminBadge: React.FC<AdminBadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export { AdminBadge };
export default AdminBadge;

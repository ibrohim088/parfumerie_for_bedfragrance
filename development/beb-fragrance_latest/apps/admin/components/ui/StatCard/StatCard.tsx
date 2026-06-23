import React from 'react';
import Link from 'next/link';
import styles from './StatCard.module.scss';

export type StatTrend = 'up' | 'down' | 'neutral';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  href?: string;
  icon?: React.ReactNode;
  trend?: StatTrend;
  trendValue?: string;
  trendLabel?: string;
  loading?: boolean;
  className?: string;
  color?: 'default' | 'blue' | 'green' | 'red' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  href,
  icon,
  trend,
  trendValue,
  trendLabel,
  loading = false,
  className = '',
  color = 'default',
}) => {
  if (loading) {
    return (
      <div className={`${styles.card} ${className}`}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonValue} />
        <div className={styles.skeletonTrend} />
      </div>
    );
  }

  const content = (
    <>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && (
          <span className={`${styles.iconWrapper} ${styles[`icon_${color}`]}`}>
            {icon}
          </span>
        )}
      </div>
      <div className={styles.value}>{value}</div>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
      {trend && trendValue && (
        <div className={`${styles.trend} ${styles[trend]}`}>
          <span className={styles.trendArrow}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
          <span className={styles.trendValue}>{trendValue}</span>
          {trendLabel && <span className={styles.trendLabel}>{trendLabel}</span>}
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.card} ${styles.clickable} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`${styles.card} ${className}`}>
      {content}
    </div>
  );
};

export { StatCard };
export default StatCard;
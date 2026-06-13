'use client';

import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export default function Spinner({ size = 'medium' }: SpinnerProps) {
  return <div className={`${styles.spinner} ${styles[size]}`} />;
}

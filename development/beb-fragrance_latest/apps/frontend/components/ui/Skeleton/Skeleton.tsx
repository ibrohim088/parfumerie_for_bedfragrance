'use client';

import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  count?: number;
}

export default function Skeleton({ width = '100%', height = '20px', count = 1 }: SkeletonProps) {
  return (
    <div className={styles.skeletonWrapper}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={styles.skeleton}
          style={{ width, height }}
        />
      ))}
    </div>
  );
}

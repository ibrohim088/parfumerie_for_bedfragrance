import React from 'react';
import styles from './Spinner.module.scss';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
  fullPage?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  className = '',
  fullPage = false,
}) => {
  const spinner = (
    <div
      className={`${styles.spinner} ${styles[size]} ${className}`}
      style={color ? ({ '--spinner-color': color } as React.CSSProperties) : undefined}
      role="status"
      aria-label="Loading"
    >
      <span className={styles.track} />
      <span className={styles.fill} />
    </div>
  );

  if (fullPage) {
    return <div className={styles.fullPage}>{spinner}</div>;
  }

  return spinner;
};

export { Spinner };
export default Spinner;

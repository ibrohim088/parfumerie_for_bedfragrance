'use client';

import styles from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export default function Select({ label, error, options, ...props }: SelectProps) {
  return (
    <div className={styles.wrapper}>
      {label && <label>{label}</label>}
      <select
        className={`${styles.select} ${error ? styles.hasError : ''}`}
        {...props}
      >
        <option value="">Tanlamang...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

import React, { forwardRef } from 'react';
import styles from './AdminSelect.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

const AdminSelect = forwardRef<HTMLSelectElement, AdminSelectProps>(
  (
    {
      label,
      options,
      error,
      hint,
      placeholder,
      fullWidth = false,
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {rest.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={`${styles.selectWrapper} ${error ? styles.hasError : ''}`}>
          <select
            ref={ref}
            id={selectId}
            className={`${styles.select} ${className}`}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.arrow} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {hint && !error && <p className={styles.hint}>{hint}</p>}
      </div>
    );
  }
);

AdminSelect.displayName = 'AdminSelect';

export { AdminSelect };
export default AdminSelect;

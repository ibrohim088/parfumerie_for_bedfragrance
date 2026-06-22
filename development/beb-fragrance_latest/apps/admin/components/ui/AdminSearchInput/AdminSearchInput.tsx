'use client';

import React, { useRef } from 'react';
import styles from './AdminSearchInput.module.scss';
import {X} from 'lucide-react';

interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}

const AdminSearchInput: React.FC<AdminSearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Qidirish...',
  className = '',
  autoFocus = false,
  style,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={`${styles.wrapper} ${className}`} style={style}>
      <span className={styles.searchIcon} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {value && (
        <button className={styles.clearBtn} onClick={handleClear} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export { AdminSearchInput };
export default AdminSearchInput;
'use client';

import styles from './Textarea.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, ...props }: TextareaProps) {
  return (
    <div className={styles.wrapper}>
      {label && <label>{label}</label>}
      <textarea
        className={`${styles.textarea} ${error ? styles.hasError : ''}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import styles from './RefundModal.module.scss';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';

interface RefundModalProps {
  transactionId: string;
  onConfirm: (reason: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function RefundModal({
  transactionId,
  onConfirm,
  onClose,
  isLoading = false,
}: RefundModalProps) {
  const [reason, setReason] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const isValid = reason.trim().length >= 3;

  const handleSubmit = () => {
    setTouched(true);
    if (!isValid || isLoading) return;
    onConfirm(reason.trim());
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="refund-modal-title"
      >
        <div className={styles.header}>
          <h3 id="refund-modal-title" className={styles.title}>
            To'lovni qaytarish
          </h3>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Yopish"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>
            Siz haqiqatan ham bu tranzaksiyani qaytarmoqchimisiz? Bu amal qaytarib bo'lmaydi.
          </p>

          <div className={styles.idRow}>
            <span className={styles.muted}>Tranzaksiya ID:</span>
            <span className={styles.mono}>{transactionId}</span>
          </div>

          <label className={styles.label}>
            Qaytarish sababi <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            placeholder="Masalan: Mijoz so'rovi bo'yicha bekor qilindi..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            disabled={isLoading}
            autoFocus
          />
          {touched && !isValid && (
            <p className={styles.error}>Iltimos, kamida 3 ta belgili sabab kiriting.</p>
          )}
        </div>

        <div className={styles.footer}>
          <AdminButton variant="ghost" onClick={onClose} disabled={isLoading}>
            Bekor qilish
          </AdminButton>
          <AdminButton
            variant="danger"
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Qaytarilmoqda...' : "Ha, qaytarish"}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}

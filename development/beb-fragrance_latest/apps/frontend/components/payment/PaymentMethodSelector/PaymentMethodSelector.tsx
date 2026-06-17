'use client';

import { CreditCard, Link2, Banknote } from 'lucide-react';
import styles from './PaymentMethodSelector.module.scss';

interface PaymentMethodSelectorProps {
  selected: string;
  onChange: (method: string) => void;
}

export default function PaymentMethodSelector({
  selected,
  onChange,
}: PaymentMethodSelectorProps) {
  const methods = [
    { id: 'payme', name: 'Payme', icon: CreditCard },
    { id: 'click', name: 'Click', icon: Link2 },
    { id: 'cash', name: 'Naqt pul', icon: Banknote },
  ];

  return (
    <div className={styles.selector}>
      {methods.map((method) => (
        <label key={method.id} className={styles.option}>
          <input
            type="radio"
            name="payment"
            value={method.id}
            checked={selected === method.id}
            onChange={() => onChange(method.id)}
          />
          <span className={styles.label}>
            <span className={styles.icon}>
              <method.icon size={18} />
            </span>
            <span className={styles.name}>{method.name}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

'use client';

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
    { id: 'payme', name: 'Payme', icon: '💳' },
    { id: 'click', name: 'Click', icon: '🔗' },
    { id: 'cash', name: 'Naqt pul', icon: '💵' },
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
            <span className={styles.icon}>{method.icon}</span>
            <span className={styles.name}>{method.name}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

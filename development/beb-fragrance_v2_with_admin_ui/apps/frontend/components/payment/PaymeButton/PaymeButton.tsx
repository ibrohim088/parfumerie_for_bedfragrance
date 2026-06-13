'use client';

import Button from '@/components/ui/Button/Button';
import styles from './PaymeButton.module.scss';

interface PaymeButtonProps {
  orderId: string;
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function PaymeButton({
  orderId,
  amount,
  onSuccess,
  onError,
}: PaymeButtonProps) {
  const handleClick = async () => {
    try {
      // TODO: Call Payme API
      console.log('Payme payment initiated', { orderId, amount });
    } catch (error) {
      onError?.('Payme payment failed');
    }
  };

  return (
    <Button onClick={handleClick} className={styles.button}>
      💳 Payme orqali to'lov
    </Button>
  );
}

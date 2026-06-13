'use client';

import Button from '@/components/ui/Button/Button';
import styles from './ClickButton.module.scss';

interface ClickButtonProps {
  orderId: string;
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function ClickButton({
  orderId,
  amount,
  onSuccess,
  onError,
}: ClickButtonProps) {
  const handleClick = async () => {
    try {
      // TODO: Call Click API
      console.log('Click payment initiated', { orderId, amount });
    } catch (error) {
      onError?.('Click payment failed');
    }
  };

  return (
    <Button onClick={handleClick} className={styles.button}>
      🔗 Click orqali to'lov
    </Button>
  );
}

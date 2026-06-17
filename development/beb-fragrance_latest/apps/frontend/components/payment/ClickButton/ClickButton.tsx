'use client';

import { Link2 } from 'lucide-react';
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
      <Link2 size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
      Click orqali to'lov
    </Button>
  );
}

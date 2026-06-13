import { useState, useCallback } from 'react';

interface UsePaymentReturn {
  processing: boolean;
  error: string | null;
  initiatePayment: (method: 'payme' | 'click' | 'cash', orderId: string, amount: number) => Promise<void>;
  verifyPayment: (transactionId: string) => Promise<boolean>;
  cancelPayment: (transactionId: string) => Promise<void>;
}

export function usePayment(): UsePaymentReturn {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = useCallback(
    async (method: 'payme' | 'click' | 'cash', orderId: string, amount: number) => {
      try {
        setProcessing(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/${method}/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ orderId, amount }),
          }
        );

        if (!response.ok) throw new Error('Failed to initiate payment');

        const data = await response.json();

        if (method === 'payme') {
          // Redirect to Payme payment page
          window.location.href = data.paymentUrl;
        } else if (method === 'click') {
          // Redirect to Click payment page
          window.location.href = data.paymentUrl;
        }
        // For cash, payment is confirmed on delivery
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        throw err;
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  const verifyPayment = useCallback(
    async (transactionId: string): Promise<boolean> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/${transactionId}/status`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) return false;

        const data = await response.json();
        return data.data.status === 'paid';
      } catch (err) {
        console.error('Verify payment error:', err);
        return false;
      }
    },
    []
  );

  const cancelPayment = useCallback(
    async (transactionId: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/${transactionId}/cancel`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to cancel payment');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        throw err;
      }
    },
    []
  );

  return { processing, error, initiatePayment, verifyPayment, cancelPayment };
}

import { useState, useEffect } from 'react';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'payme' | 'click' | 'cash';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  shippingPhone: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseOrderReturn {
  order: OrderDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useOrder(id: string): UseOrderReturn {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) throw new Error('Order not found');

      const data = await response.json();
      setOrder(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  return { order, loading, error, refetch: fetchOrder };
}

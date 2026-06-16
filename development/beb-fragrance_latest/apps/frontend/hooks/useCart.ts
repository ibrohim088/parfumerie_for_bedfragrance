import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

interface UseCartReturn {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback(
    (newItem: CartItem) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.productId === newItem.productId);

        if (existingItem) {
          return prevItems.map((item) =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }

        return [...prevItems, newItem];
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    },
    [setItems]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    },
    [setItems, removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return { items, total, count, addItem, removeItem, updateQuantity, clearCart };
}

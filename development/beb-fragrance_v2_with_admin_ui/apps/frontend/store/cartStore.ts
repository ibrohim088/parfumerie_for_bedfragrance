import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      count: 0,

      addItem: (newItem: CartItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === newItem.productId
          );

          let updatedItems;
          if (existingItem) {
            updatedItems = state.items.map((item) =>
              item.productId === newItem.productId
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            );
          } else {
            updatedItems = [...state.items, newItem];
          }

          const total = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const count = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: updatedItems, total, count };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.productId !== productId
          );
          const total = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const count = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: updatedItems, total, count };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          );
          const total = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const count = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: updatedItems, total, count };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0, count: 0 });
      },

      getTotal: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-store',
      version: 1,
    }
  )
);

export default useCartStore;

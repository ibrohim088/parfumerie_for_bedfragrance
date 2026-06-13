import { create } from 'zustand';

export interface WishlistItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  addedAt: number;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlist: () => WishlistItem[];
  count: number;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  count: 0,

  addItem: (item: WishlistItem) =>
    set((state) => {
      const exists = state.items.find((i) => i.productId === item.productId);
      if (exists) return state;

      const updatedItems = [...state.items, item];
      return { items: updatedItems, count: updatedItems.length };
    }),

  removeItem: (productId: string) =>
    set((state) => {
      const updatedItems = state.items.filter((i) => i.productId !== productId);
      return { items: updatedItems, count: updatedItems.length };
    }),

  isInWishlist: (productId: string) => {
    const { items } = get();
    return items.some((i) => i.productId === productId);
  },

  clearWishlist: () => set({ items: [], count: 0 }),

  getWishlist: () => get().items,
}));

export default useWishlistStore;

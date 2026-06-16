export { useCartStore, default as cartStore } from './cartStore';
export type { CartState } from './cartStore';

export { useUIStore, default as uiStore } from './uiStore';
export type { UIState } from './uiStore';

export { useAuthStore, default as authStore } from './authStore';
export type { AuthState } from './authStore';

export { useNotificationStore, default as notificationStore } from './notificationStore';
export type { Notification, NotificationState } from './notificationStore';

export { useFilterStore, default as filterStore } from './filterStore';
export type { FilterState, FilterStoreState } from './filterStore';

export { useWishlistStore, default as wishlistStore } from './wishlistStore';
export type { WishlistItem, WishlistState } from './wishlistStore';

// Convenience export for using all stores
export {
  useCartStore,
  useUIStore,
  useAuthStore,
  useNotificationStore,
  useFilterStore,
  useWishlistStore,
};

import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  filterPanelOpen: boolean;
  cartSheetOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  toggleFilterPanel: () => void;
  toggleCartSheet: () => void;
  closeSidebar: () => void;
  closeMobileMenu: () => void;
  closeSearch: () => void;
  closeFilterPanel: () => void;
  closeCartSheet: () => void;
  closeAll: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setFilterPanelOpen: (open: boolean) => void;
  setCartSheetOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  searchOpen: false,
  filterPanelOpen: false,
  cartSheetOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  toggleFilterPanel: () => set((state) => ({ filterPanelOpen: !state.filterPanelOpen })),
  toggleCartSheet: () => set((state) => ({ cartSheetOpen: !state.cartSheetOpen })),

  closeSidebar: () => set({ sidebarOpen: false }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
  closeFilterPanel: () => set({ filterPanelOpen: false }),
  closeCartSheet: () => set({ cartSheetOpen: false }),

  closeAll: () =>
    set({
      sidebarOpen: false,
      mobileMenuOpen: false,
      searchOpen: false,
      filterPanelOpen: false,
      cartSheetOpen: false,
    }),

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setMobileMenuOpen: (open: boolean) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
  setFilterPanelOpen: (open: boolean) => set({ filterPanelOpen: open }),
  setCartSheetOpen: (open: boolean) => set({ cartSheetOpen: open }),
}));

export default useUIStore;

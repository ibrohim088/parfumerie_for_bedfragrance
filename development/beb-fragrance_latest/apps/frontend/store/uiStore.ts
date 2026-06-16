import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type Language = 'uz' | 'ru';

interface UIState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // UI States
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  filterPanelOpen: boolean;
  cartSheetOpen: boolean;

  // UI Actions
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

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme state
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // Language state
      language: 'uz',
      setLanguage: (language) => set({ language }),

      // UI states
      sidebarOpen: true,
      mobileMenuOpen: false,
      searchOpen: false,
      filterPanelOpen: false,
      cartSheetOpen: false,

      // UI actions
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
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);

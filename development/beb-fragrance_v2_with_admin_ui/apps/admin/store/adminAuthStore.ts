import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
  role: 'admin';
}

interface AdminAuthState {
  // State
  user: AdminUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Actions
  setAuth: (payload: {
    user: AdminUser;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setUser: (user: AdminUser) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  setHydrated: () => void;
}

// ─────────────────────────────────────────────────────────────
//  Store
// ─────────────────────────────────────────────────────────────

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isHydrated: false,

      // Login / token refresh dan keyin chaqiriladi
      setAuth: ({ user, accessToken, refreshToken }) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      // Faqat user ma'lumotlarini yangilash
      setUser: (user) =>
        set({ user }),

      // Token refresh dan keyin faqat accessToken yangilash
      setAccessToken: (token) =>
        set({ accessToken: token }),

      // Logout
      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      // Persist rehydration tugagandan keyin
      setHydrated: () =>
        set({ isHydrated: true }),
    }),
    {
      name: 'admin-auth',
      storage: createJSONStorage(() => localStorage),

      // Faqat shu fieldlarni localStorage ga saqlash
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),

      // Rehydration tugaganda isHydrated = true qilish
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// ─────────────────────────────────────────────────────────────
//  Selectors (performance uchun alohida)
// ─────────────────────────────────────────────────────────────

export const selectAdminUser = (state: AdminAuthState) => state.user;
export const selectAccessToken = (state: AdminAuthState) => state.accessToken;
export const selectIsAuthenticated = (state: AdminAuthState) => state.isAuthenticated;
export const selectIsHydrated = (state: AdminAuthState) => state.isHydrated;
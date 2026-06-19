import { create } from 'zustand';

interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: true,

  setUser: (user: User | null) => set({ user }),

  setTokens: (accessToken: string | null, refreshToken: string | null) => {
    set({ accessToken, refreshToken });
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  logout: () => {
    set({ user: null, accessToken: null, refreshToken: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  updateUser: (updates: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },

  isAuthenticated: () => {
    const { user, accessToken } = get();
    return !!user && !!accessToken;
  },

  isAdmin: () => {
    const { user } = get();
    return user?.role === 'admin';
  },
}));

export default useAuthStore;

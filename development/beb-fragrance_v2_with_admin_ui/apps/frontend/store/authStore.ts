import { create } from 'zustand';

interface User {
  id: string;
  phone: string;
  fullName?: string;
  email?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,

  setUser: (user: User | null) => set({ user }),

  setToken: (token: string | null) => {
    set({ token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },

  updateUser: (updates: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },

  isAuthenticated: () => {
    const { user, token } = get();
    return !!user && !!token;
  },

  isAdmin: () => {
    const { user } = get();
    return user?.role === 'admin';
  },
}));

export default useAuthStore;

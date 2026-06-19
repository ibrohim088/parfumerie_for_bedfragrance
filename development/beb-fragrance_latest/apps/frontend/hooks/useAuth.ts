import { useCallback, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';

interface UseAuthReturn {
  user: ReturnType<typeof useAuthStore.getState>['user'];
  isLoading: boolean;
  isAuthenticated: boolean;
  sendOtp: (phone: string) => Promise<void>;
  login: (credentials: { phone: string; otp: string }) => Promise<void>;
  register: (data: { phone: string; otp: string; firstName: string; lastName?: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
}

// useAuth - authStore (Zustand) ustidagi qatlam (wrapper).
// Bu butun ilova bo'ylab yagona haqiqat manbai (single source of truth)
// hisoblanadi: Navbar, AccountSidebar va boshqa joylar ham xuddi shu
// authStore'ni o'qiydi, shuning uchun login/register bo'lgandan keyin
// barcha komponentlar bir vaqtda yangilanadi.
export function useAuth(): UseAuthReturn {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const storeLogout = useAuthStore((state) => state.logout);

  const hasLoaded = useRef(false);

  // Sahifa birinchi marta yuklanganda localStorage'dagi token orqali
  // foydalanuvchini tiklaymiz (faqat bir marta, butun ilova bo'ylab)
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const loadUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          setTokens(null, null);
          setUser(null);
        } else {
          const data = await response.json();
          setUser(data.data);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        setTokens(null, null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [setUser, setTokens, setIsLoading]);

  const sendOtp = useCallback(async (phone: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      }
    );

    if (!response.ok) {
      const errBody = await response.json().catch(() => null);
      throw new Error(errBody?.message || 'OTP yuborishda xatolik yuz berdi');
    }
  }, []);

  const login = useCallback(
    async (credentials: { phone: string; otp: string }) => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          }
        );

        if (!response.ok) {
          const errBody = await response.json().catch(() => null);
          throw new Error(errBody?.message || 'Tizimga kirishda xatolik yuz berdi');
        }

        const { data } = await response.json();
        setTokens(data.accessToken, data.refreshToken);
        setUser(data.user);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setTokens, setUser]
  );

  const register = useCallback(
    async (data: { phone: string; otp: string; firstName: string; lastName?: string }) => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          const errBody = await response.json().catch(() => null);
          throw new Error(errBody?.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
        }

        const result = await response.json();
        setTokens(result.data.accessToken, result.data.refreshToken);
        setUser(result.data.user);
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setTokens, setUser]
  );

  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  const updateProfile = useCallback(
    async (data: any) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) throw new Error('Update failed');

        const result = await response.json();
        setUser(result.data);
      } catch (error) {
        console.error('Profile update error:', error);
        throw error;
      }
    },
    [setUser]
  );

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    sendOtp,
    login,
    register,
    logout,
    updateProfile,
  };
}

export default useAuth;

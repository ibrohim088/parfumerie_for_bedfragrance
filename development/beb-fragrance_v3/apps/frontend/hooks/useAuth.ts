import { useState, useCallback, useEffect } from 'react';

interface User {
  id: string;
  phone: string;
  fullName?: string;
  email?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { phone: string; otp: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
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
          localStorage.removeItem('token');
          setUser(null);
        } else {
          const data = await response.json();
          setUser(data.data);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
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

        if (!response.ok) throw new Error('Login failed');

        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (data: any) => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) throw new Error('Registration failed');

        const result = await response.json();
        localStorage.setItem('token', result.token);
        setUser(result.user);
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (data: any) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
    []
  );

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };
}

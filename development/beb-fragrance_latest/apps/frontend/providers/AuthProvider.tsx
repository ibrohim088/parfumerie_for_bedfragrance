'use client';

import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

interface User {
  id: string;
  phone: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ✅ FIX 2: AuthProvider har sahifaga o'tishda /users/me ga
// qayta so'rov yubormaslik uchun sessionStorage cache ishlatadi.
// Layout darajasida bo'lgani uchun aslida bir marta ishlaydi,
// lekin full page refresh bo'lganda ham cache tufayli tez bo'ladi.
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // hasLoaded — StrictMode double-invoke dan himoya
  const hasLoaded = useRef(false);

  useEffect(() => {
    // React StrictMode da ikki marta ishga tushishdan saqlash
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const loadUser = async () => {
      try {
        const token =
          localStorage.getItem('accessToken') || localStorage.getItem('token');

        if (!token) {
          setIsLoading(false);
          return;
        }

        // ✅ sessionStorage dan oldin tekshir — API call yo'q!
        // sessionStorage brauzer tab yopilguncha saqlanadi.
        // Foydalanuvchi tab ichida sahifalar orasida o'tsa — 0ms.
        const cached = sessionStorage.getItem('beb_auth_user');
        if (cached) {
          try {
            setUserState(JSON.parse(cached));
            setIsLoading(false);
            return;
          } catch {
            sessionStorage.removeItem('beb_auth_user');
          }
        }

        // Cache yo'q — API ga so'rov
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
            // ✅ next cache: 60 soniya brauzer HTTP cache
            next: { revalidate: 60 },
          }
        );

        if (!response.ok) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('token');
          sessionStorage.removeItem('beb_auth_user');
          setUserState(null);
        } else {
          const data = await response.json();
          const userData = data.data ?? data;
          setUserState(userData);
          // ✅ Keyingi sahifa o'tishlar uchun cache ga saqla
          sessionStorage.setItem('beb_auth_user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      sessionStorage.setItem('beb_auth_user', JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem('beb_auth_user');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    // ✅ logout da cache ham o'chiriladi
    sessionStorage.removeItem('beb_auth_user');
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


/*
'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  phone: string;
  fullName?: string;
  email?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from API on mount
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

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
*/
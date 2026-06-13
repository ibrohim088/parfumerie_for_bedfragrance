// apps/admin/components/hooks/useAdminAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'admin';
  isActive: boolean;
}

export function useAdminAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    const userStr = localStorage.getItem('admin_user');

    if (!token || !userStr) {
      setIsLoading(false);
      return;
    }

    try {
      const user: AdminUser = JSON.parse(userStr);
      if (user.role === 'admin' && user.isActive) {
        setAdmin(user);
      } else {
        localStorage.clear();
        router.replace('/login');
      }
    } catch (err) {
      console.error('Auth parse error:', err);
      localStorage.clear();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_user');
    router.push('/login');
  };

  return { admin, isLoading, logout };
}
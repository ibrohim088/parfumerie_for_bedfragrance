// apps/admin/components/hooks/useAdminAuth.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'admin';
  isActive: boolean;
}

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api').replace(/\/+$/, '');
const API_BASE = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

function clearAdminStorage() {
  localStorage.removeItem('admin_access_token');
  localStorage.removeItem('admin_refresh_token');
  localStorage.removeItem('admin_user');
}

export function useAdminAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const verify = useCallback(async () => {
    const token = localStorage.getItem('admin_access_token');

    if (!token) {
      setIsLoading(false);
      setAdmin(null);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        // Token yaroqsiz/muddati tugagan — tozalaymiz
        clearAdminStorage();
        setAdmin(null);
        return;
      }

      const body = await res.json();
      const user: AdminUser = body.data;

      if (user.role !== 'admin' || !user.isActive) {
        clearAdminStorage();
        setAdmin(null);
        return;
      }

      localStorage.setItem('admin_user', JSON.stringify(user));
      setAdmin(user);
    } catch (err) {
      console.error('Admin auth tekshirishda xato:', err);
      // Tarmoq xatosi — eski localStorage holatini majburan tozalamaymiz,
      // chunki backend vaqtincha mavjud bo'lmasligi mumkin.
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verify();
  }, [verify]);

  const logout = () => {
    clearAdminStorage();
    router.push('/login');
  };

  return { admin, isLoading, logout, refetch: verify };
}
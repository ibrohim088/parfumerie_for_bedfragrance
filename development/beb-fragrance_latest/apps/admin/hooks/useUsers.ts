// apps/admin/components/hooks/useUsers.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function useUsers(params: { search?: string; page?: number; limit?: number } = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ['users', params],
    queryFn: () => api.get('/users', { params }).then(res => res.data),
  });

  return {
    users: data?.items,
    pagination: data?.pagination,
    isLoading,
  };
}


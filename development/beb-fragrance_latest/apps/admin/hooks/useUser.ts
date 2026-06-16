// apps/admin/components/hooks/useUser.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function useUser(id: string) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => api.get(`/admin/users/${id}`).then(res => res.data),
    enabled: !!id,
  });

  const toggleActive = useMutation({
    mutationFn: (isActive: boolean) => 
      api.patch(`/admin/users/${id}/toggle-active`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    user: user?.data,
    isLoading,
    toggleActive: toggleActive.mutate,
    isUpdating: toggleActive.isPending,
  };
}
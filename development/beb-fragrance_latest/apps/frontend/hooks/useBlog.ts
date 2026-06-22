import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  views?: number;
}

export function useBlog() {
  return useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      // Fetch blog posts from API
      const response = await apiClient.get('/blog', { params: { limit: 100 } });
      return response;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await apiClient.get(`/blog/${slug}`);
      return response;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!slug,
  });
}
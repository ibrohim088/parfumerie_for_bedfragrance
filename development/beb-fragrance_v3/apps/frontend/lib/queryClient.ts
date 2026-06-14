import {
  QueryClient,
  DefaultOptions,
} from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  },
  mutations: {
    retry: 1,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export default queryClient;

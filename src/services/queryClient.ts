import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});

export default queryClient;

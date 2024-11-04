import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 100 * 60 * 60 * 4, // 4 hours
		},
	},
});

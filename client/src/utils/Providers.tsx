'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '../services/queryClient'; 

function Providers({ children }: React.PropsWithChildren) {
	const [client] = React.useState(queryClient);

	return (
			<QueryClientProvider client={client}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
				<ToastContainer />
			</QueryClientProvider>
	);
}

export default Providers;

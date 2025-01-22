"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';

const Queryclient = new QueryClient();

const ApiProviderWrapper = ({children}: {children: React.ReactNode}) => {
    return (
      <QueryClientProvider client={Queryclient}>
        {children}
      </QueryClientProvider>
    )
}

export {
    ApiProviderWrapper,
    Queryclient,
    useQuery,
    useMutation,
    useQueryClient,
}


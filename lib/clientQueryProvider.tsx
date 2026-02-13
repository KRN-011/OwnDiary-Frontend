'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type ClientQueryProviderProps = {
  children: ReactNode
}

const ClientQueryProvider = ({ children }: ClientQueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 1,
        staleTime: 1 * 60 * 1000
      },
      mutations: {
        retry: 0
      }
    }
  }))


  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ClientQueryProvider
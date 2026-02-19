import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            gcTime: 0
          }
        }
      })
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

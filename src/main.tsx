import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { Toaster } from "@/components/ui/toaster"
import './index.css'
import { PeriodProvider } from './contexts/PeriodContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
      <PeriodProvider>
          <AppRoutes />
          <Toaster />
        </PeriodProvider>
      </Router>
    </QueryClientProvider>
  </StrictMode>,
)

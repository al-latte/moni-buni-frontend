import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { Toaster } from "@/components/ui/toaster"
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 3,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
          <AppRoutes />
          <Toaster />
      </Router>
    </QueryClientProvider>
  </StrictMode>,
)

if('serviceWorker' in navigator){
  navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) =>
        console.log("Service Worker registered with scope:", registration.scope)
      )
      .catch((error) => console.error("Service Worker registration failed:", error));
}
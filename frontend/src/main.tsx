import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/ErrorPage.tsx'
import LoginScreen from './routes/LoginScreen.tsx'
import VisitorsPage from './routes/VisitorsPage.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <App canEdit={true} />
      </ProtectedRoute>
    )
  },
  {
    path: "/visitors",
    element: (
      <ProtectedRoute>
        <VisitorsPage canEdit={false} />
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/ErrorPage.tsx'
import LoginScreen from './routes/LoginScreen.tsx'
import VisitorsPage from './routes/VisitorsPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />
  },
  {
    path: "/home",
    element: <App canEdit={true}/>
  },
  {
    path: "/visitors",
    element: <VisitorsPage canEdit={false}/>
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

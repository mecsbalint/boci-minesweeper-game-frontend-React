import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { AuthContextProvider } from './contexts/AuthContext'
import { ErrorContextProvider } from './contexts/ErrorContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ErrorContextProvider>
  </StrictMode>
)

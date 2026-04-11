import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.scss'
import App from './App.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthProvider>
  </StrictMode>,
)

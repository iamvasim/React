import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Yeh block alag se close hoga
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

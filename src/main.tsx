import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

document.body.className = 'bg-surface text-on-surface font-body-md text-body-md antialiased selection:bg-primary selection:text-on-primary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

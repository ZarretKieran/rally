import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set onboarded to true for demo purposes
// In production, this would be managed through proper authentication
localStorage.setItem('rally_onboarded', 'true');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

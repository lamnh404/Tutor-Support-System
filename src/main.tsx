/* eslint-disable indent */
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/User/userContext.tsx'
// import { StrictMode } from "react";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  // </StrictMode>
)


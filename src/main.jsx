import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import 'reset-css'
import '@fontsource-variable/inter'
import '@fontsource-variable/montserrat'
import { BrowserRouter } from 'react-router-dom'
import { ProfileProvider } from './providers/ProfileProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </BrowserRouter>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'

// HashRouter — so the app runs equally well as static files (file://) and on GitHub Pages
// without server-side rewrites. Maximum portability out of the box.
const Router = HashRouter

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)

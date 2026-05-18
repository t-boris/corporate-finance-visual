import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'

// HashRouter — чтобы приложение могло запускаться и как статика (file://) и на GitHub Pages
// без серверного rewrites. Это даёт переносимость "из коробки".
const Router = HashRouter

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)

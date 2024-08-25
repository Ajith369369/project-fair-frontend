import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './bootstrap.min.css'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import Contextshare from "./context/Contextshare"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><Contextshare><App /></Contextshare></BrowserRouter>
  </React.StrictMode>,
)

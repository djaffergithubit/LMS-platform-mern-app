import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './App/Store.js'
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

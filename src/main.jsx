import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.scss'
import Routes from './routes/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)

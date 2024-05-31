import { Toaster } from 'react-hot-toast'
import { Outlet, ScrollRestoration } from 'react-router-dom'

function App() {
  return (
    <div id="app-page">
      <Outlet />
      <ScrollRestoration />
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            background: '#05273A',
            color: '#FFFFFF'
          },
        }}
      />
    </div>
  )
}

export default App

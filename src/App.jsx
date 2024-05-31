import { Outlet, ScrollRestoration } from 'react-router-dom'

function App() {
  return (
    <div id="app-page">
      <Outlet />
      <ScrollRestoration />
    </div>
  )
}

export default App

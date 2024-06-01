import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { checkIsLoggedIn } from '../hooks/useAuth'

import App from '../App'
import Error from './Error'
import Login from './Login'
import Home from './Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: checkIsLoggedIn() ? <Home /> : <Login /> },
      { path: '/Login', element: <Login /> },
      { path: '/SignUp', element: <Login SignUp={true} /> },
      { path: '/Home', element: <Home /> },
    ]
  },
])


function Routes() {
  return (
    <RouterProvider router={router} />
  )
}

export default Routes
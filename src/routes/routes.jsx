import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from '../App'
import Error from './Error'
import Login from './Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/Login', element: <Login /> },
      // { path: '/Home', element: <Home /> },
      // { path: '/Instituto', element: <Instituto /> },
      // { path: '/Exames', element: <Exames /> },
      // { path: '/AreaKids', element: <AreaKids /> },
      // { path: '/AreaKids/:exam', element: <AreaKids /> },
    ]
  },
])


function Routes() {
  return (
    <RouterProvider router={router} />
  )
}

export default Routes
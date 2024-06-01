import { Toaster } from 'react-hot-toast'
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import { checkIsLoggedIn } from './hooks/useAuth'
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    checkIsLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        navigate('/Home');
      }
      else {
        navigate('/Login');
      }
    });
  }, []);

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

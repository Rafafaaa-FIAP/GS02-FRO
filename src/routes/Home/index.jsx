import './styles.scss'

import { useNavigate } from 'react-router-dom';

import ButtonDefault from '../../components/ButtonDefault';

import { logOut } from '../../hooks/useAuth';

function Home() {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut().then(() => {
      navigate('/');
    });
  }

  return (
    <div id='home-page'>
      <ButtonDefault text='Sair' onClick={handleLogOut} />
    </div>
  )
}

export default Home;
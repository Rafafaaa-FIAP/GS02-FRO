import './styles.scss'

import TextField from '../../components/TextField';
import ButtonDefault from '../../components/ButtonDefault';

import ocean from '../../assets/images/ocean.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Login(props) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  function handleLoginData() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    setLoginData({ email, password });
  }

  function handleLogin() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    let invalid = false;

    if (email.checkValidity()) {
      email.classList.remove('invalid');
    }
    else {
      email.classList.add('invalid');
      invalid = true;
    }

    if (password.checkValidity()) {
      password.classList.remove('invalid');
    }
    else {
      password.classList.add('invalid');
      invalid = true;
    }

    if (!invalid) {
      toast.success('sucesso', {
        id: 'login',
      });
    }
    else {
      toast.error('Dados inválidos!', {
        id: 'login',
      });
    }
  }

  return (
    <div id="login-page">
      <div className='background-mask'>
        <div className='infos'>
          <img src={ocean} alt="Oceano" />
          <h1>Monitoramento dos Mares</h1>
          <p>Verifique a qualidade dos mares com gráficos de fácil utilização.</p>
        </div>
        <div className='login'>
          <div className='login-container'>
            <div className='login-fields'>
              <TextField id='email' placeholder='Email' type='email' onChange={handleLoginData} />
              <TextField id='password' placeholder='Senha' type='password' onChange={handleLoginData} />
            </div>
            {
              props.SignUp ? (
                <>
                  <ButtonDefault text="Cadastrar" onClick={handleLogin} />
                  <Link to='/Login'>Já possuo uma conta.</Link>
                </>
              ) : (
                <>
                  <ButtonDefault text="Entrar" onClick={handleLogin} />
                  <p>Crie uma conta clicando <Link to='/SignUp'>aqui</Link>.</p>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
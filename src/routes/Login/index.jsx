import './styles.scss'

import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkIsLoggedIn, createAccount, logIn } from '../../hooks/useAuth';

import TextField from '../../components/TextField';
import ButtonDefault from '../../components/ButtonDefault';

import ocean from '../../assets/images/ocean.svg';

function Login(props) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isSigned, setIsSigned] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSigned) {
      navigate('/Home');
    }
  }, [isSigned]);

  function callCheckIsLoggedIn() {
    checkIsLoggedIn().then((isLoggedIn) => {
      setIsSigned(isLoggedIn);
    });
  }

  function handleLoginData() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    setLoginData({ email, password });
  }

  function checkLoginDataIsInvalid() {
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

    if (invalid) {
      toast.error('Dados inválidos!', { id: 'login' });
    }

    return invalid;
  }

  function handleLogin() {
    if (!checkLoginDataIsInvalid()) {
      logIn(loginData.email, loginData.password).then((res) => {
        if (res === null) {
          toast.error('Login inválido!', { id: 'login' });
        }

        callCheckIsLoggedIn();
      });
    }
  }

  function handleSignUp() {
    if (!checkLoginDataIsInvalid()) {
      createAccount(loginData.email, loginData.password).then((res) => {
        if (res === 'auth/email-already-in-use') {
          document.querySelector('#email').classList.add('invalid');
          toast.error('Email já utilizado em uma conta!', { id: 'login' });
        }
        else if (res === 'auth/weak-password') {
          document.querySelector('#password').classList.add('invalid');
          toast.error('Senha deve ter mínimo de 6 caracteres!', { id: 'login' });
        }
        else if (res === null) {
          toast.error('Erro ao Cadastrar!', { id: 'login' });
        }

        callCheckIsLoggedIn();
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
                  <ButtonDefault text="Cadastrar" onClick={handleSignUp} />
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
import React, { useState } from 'react';
import {isEmailValid} from './../../helpers/EmailHelper';
import ValidationError from './../../components/ValidationError/ValidationError';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [form, setForm] = useState({
    email: {
      hasChanged: false,
      value: ""
    },
    password: {
      hasChanged: false,
      value: ""
    }
  })
  const navigate = useNavigate(); 
  const goToRegisterPage = () => {
        navigate('/register');
  }
  return (
    <main className='centralize'>
      <form>
        <input type="email" placeholder='Email' value={form.email.value} 
        onChange={event => setForm({...form, email: {
          hasChanged: true, value: event.target.value 
        }})}
        data-testid='email'
        />
        <ValidationError
          hasChanged={form.email.hasChanged}
          errorMessage='Email é obrigatório'
          testId='email-required'
          type='required'
          value={form.email.value}
           />
           <ValidationError
          hasChanged={form.email.hasChanged}
          errorMessage='Email é inválido'
          testId='email-invalid'
          type='email'
          value={form.email.value}
           />
         
        <input type="password" placeholder='Senha' value={form.password.value} 
        onChange={event => setForm({...form, password: {
          hasChanged: true, value: event.target.value 
        }})}
          data-testid="password"
          />
          <ValidationError
          hasChanged={form.password.hasChanged}
          errorMessage='Email é obrigatório'
          testId='password-required'
          type='required'
          value={form.password.value}
           />
        <button type='button' className='clear'
          data-testid = "recover-password-button"
          disabled = {!isEmailValid(form.email.value)}>
          Recuperar senha</button>
        <button type='button' className='solid'
          data-testid="login-button"
          disabled = {!isEmailValid(form.email.value) || !form.password.value}
          >Entrar
        </button>
        <button 
            type='button' 
            className='outline'
            data-testid="register-button"
            onClick={goToRegisterPage}>
            Registrar
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
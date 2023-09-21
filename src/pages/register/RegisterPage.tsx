import { useState } from 'react';
import ValidationError from '../../components/ValidationError/ValidationError';
import '../../global.css';
import AuthService from '../../services/AuthService';
import { useAuthContext } from '../../context/auth/AuthContext';

type RegisterPageProps = {
    authService: AuthService;
  }
function RegisterPage() {
    const {authService}: {authService: AuthService} = useAuthContext();
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

    const [error, setError] = useState(null as any);
    const [showLoading, setShowLoading] = useState(false);
    return (
        <main className='centralize'>
            <form className='form'>
                <input 
                    type="email" 
                    placeholder='Email' 
                    value={form.email.value} 
                    onChange={event => setForm({...form, email: {
                        hasChanged: true, value: event.target.value 
                    }})}
                    data-testid='email' />
                <ValidationError
                    hasChanged={form.email.hasChanged}
                    errorMessage='Email é obrigatório'
                    testId='email-required'
                    type='required'
                    value={form.email.value} />
                <ValidationError
                    hasChanged={form.email.hasChanged}
                    errorMessage='Email é inválido'
                    testId='email-invalid'
                    type='email'
                    value={form.email.value}/>
                <input 
                    type="password" 
                    placeholder='Senha' 
                    value={form.password.value} 
                    onChange={event => setForm({...form, password: {
                    hasChanged: true, value: event.target.value 
                    }})}
                    data-testid="password"
                />
                <ValidationError
                    hasChanged={form.password.hasChanged}
                    errorMessage='senha é obrigatória'
                    testId='password-required'
                    type='required'
                    value={form.password.value} />
                <input 
                    type="password" 
                    placeholder='Confirmar senha' 
                    /*value={form.password.value} 
                    onChange={event => setForm({...form, password: {
                    hasChanged: true, value: event.target.value 
                    }})}*/
                    data-testid="password"
                />
                
                {
                    error && 
                    <div 
                        className='error' 
                        data-testid="error">
                        {error.message}
                    </div>
                }
                <button type="button" className='solid'>Registrar</button>
                
                <button type="button" className='clear'>Login</button>
                    
            </form>
        </main>
    )
}

export default RegisterPage;
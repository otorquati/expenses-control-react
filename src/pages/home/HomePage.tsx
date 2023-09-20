import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import AuthService from '../../services/AuthService';
import './HomePage.css';
import { useAuthContext } from '../../context/auth/AuthContext';

type HomePageProps = {
    authService: AuthService;
}

function HomePage() {
    const {authService}: {authService: AuthService} = useAuthContext();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        setIsLoggingOut(true);
        authService.logout().then(() => {
        setIsLoggingOut(false);
        navigate('/');
       }) 
    }

    return(
        <>
            <header>
                <button className='clear' onClick={logout}>Sair</button>
            </header>
            { isLoggingOut && <Loading />}     
        </>
    )
}

export default HomePage;
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthService from './services/AuthService';
import Loading from './components/Loading/Loading';
import { useEffect, useState } from 'react';

type AppProps = {
  authService: AuthService;
}

function App(props: AppProps) {
  
  const [isLoadingLoggedUser, setIsLoadingLoggedUser] =useState(true);
  const [user, setUser] = useState(null as any);

  useEffect(() => {
    props.authService.getLoggedUser()
    .then(user => {
      setIsLoadingLoggedUser(false);
      setUser(user);
    })
    .catch(error => {
      setIsLoadingLoggedUser(false);
    })
  }, []);

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              !user ? <LoginPage authService={new AuthService()}/>
              :<Navigate to={'/home'} />
            } />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      {isLoadingLoggedUser && <Loading />}
    </>
  );
}

export default App;

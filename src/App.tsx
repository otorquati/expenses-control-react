import './App.css';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthService from './services/AuthService';
import Loading from './components/Loading/Loading';
import { useEffect, useState } from 'react';
import { useAuthContext } from './context/auth/AuthContext';

type AppProps = {
  authService: AuthService;
}

function App() {

  const { isLoadingLoggedUser, user } = useAuthContext();

  return(
    <>
    {
      !isLoadingLoggedUser &&
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              !user ? 
              <LoginPage />
              : <Navigate to={'/home'} />
            } />
          <Route 
            path='/register' 
            element={
              !user ? 
              <RegisterPage />
              : <Navigate to={'/home'} />
          } />
          <Route 
            path='/home' 
            element={
            !user ? <HomePage />
            : <Navigate to={'/'} />
          } />
        </Routes>
      </BrowserRouter>
      }
      { isLoadingLoggedUser && <Loading />}
    </>
  )
}

export default App;

import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthService from './services/AuthService';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage authService={new AuthService()}/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

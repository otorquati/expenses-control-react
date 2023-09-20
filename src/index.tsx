import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthService from './services/AuthService';


// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import * as firebaseAuth from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyY6OnqXGwElKwh6doBAvt9Wz-ot-1s5k",
  authDomain: "controle-de-gastos-ad36e.firebaseapp.com",
  projectId: "controle-de-gastos-ad36e",
  storageBucket: "controle-de-gastos-ad36e.appspot.com",
  messagingSenderId: "860377750344",
  appId: "1:860377750344:web:e0faec20e56f9f2b15b17d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebaseAuth.initializeAuth(app);
firebaseAuth.signInWithEmailAndPassword(auth, 'torquality.consulting@gmail.com', '123456'
).then(user => console.log(user))
.catch(error => console.log('error', error));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App authService={new AuthService()}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

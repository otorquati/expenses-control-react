import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth'; 
import { browserLocalPersistence } from 'firebase/auth';

// Import the functions you need from the SDKs you need
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

export const auth = firebaseAuth.initializeAuth(app, {
  persistence: browserLocalPersistence
});

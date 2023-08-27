// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD-t1F-yZSO84hBWE9WGC0Lp8EGK72YRPQ',
  authDomain: 'education-563dd.firebaseapp.com',
  projectId: 'education-563dd',
  storageBucket: 'education-563dd.appspot.com',
  messagingSenderId: '797710122911',
  appId: '1:797710122911:web:0a470b18dc64ffc43387aa',
  measurementId: 'G-YEZJ67LTCQ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

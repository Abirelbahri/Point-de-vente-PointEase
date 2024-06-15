// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth , GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCH7uq5rlsRpRuB_pyO7LzDJFiGWXM3_QY",
  authDomain: "pointease.firebaseapp.com",
  projectId: "pointease",
  storageBucket: "pointease.appspot.com",
  messagingSenderId: "850502151035",
  appId: "1:850502151035:web:f1b11ced8b605c05ad6bde",
  measurementId: "G-VVCLQ1N1WF"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const phoneAuth = new PhoneAuthProvider();
export const db = getFirestore(app); 
export const storage = getStorage(app);

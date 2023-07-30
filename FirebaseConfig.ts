// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACNIGA8twNSST2GDI_PSJKyS-PntuH8yU",
  authDomain: "fjell-vaskeri.firebaseapp.com",
  projectId: "fjell-vaskeri",
  storageBucket: "fjell-vaskeri.appspot.com",
  messagingSenderId: "74900872417",
  appId: "1:74900872417:web:b96bff8035ea016bb6aba0",
  measurementId: "G-F8VEZ5TD0P"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
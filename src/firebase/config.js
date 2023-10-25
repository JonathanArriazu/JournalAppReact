// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAde2gORpGT__kgef049dhVEUKs8olk-zI",
  authDomain: "reactjournalapp-1b0ce.firebaseapp.com",
  projectId: "reactjournalapp-1b0ce",
  storageBucket: "reactjournalapp-1b0ce.appspot.com",
  messagingSenderId: "692145101717",
  appId: "1:692145101717:web:a26be993ad63c1e7e0749c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth (FirebaseApp); // => aqui viene todas las funcionalidades de autenticación
export const FirebaseDB = getFirestore(FirebaseApp); // => configuracion de mi base de datos
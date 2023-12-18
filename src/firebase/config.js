// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG--N2ezbxpmvfVL9qcprLoO93TXxL-kg",
  authDomain: "react-cursos-985fa.firebaseapp.com",
  projectId: "react-cursos-985fa",
  storageBucket: "react-cursos-985fa.appspot.com",
  messagingSenderId: "604736879101",
  appId: "1:604736879101:web:d8918fbe15f4ae78904194",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

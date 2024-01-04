// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "habitatmern.firebaseapp.com",
  projectId: "habitatmern",
  storageBucket: "habitatmern.appspot.com",
  messagingSenderId: "595505298247",
  appId: "1:595505298247:web:0bd8e89a9996461aa16a62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
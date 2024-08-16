// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "flashcards-bbc9f.firebaseapp.com",
  projectId: "flashcards-bbc9f",
  storageBucket: "flashcards-bbc9f.appspot.com",
  messagingSenderId: "437755774611",
  appId: "1:437755774611:web:1b9359c26e49f8a73eef66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
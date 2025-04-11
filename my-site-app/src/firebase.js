// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlQlM0oKkeDWmeqCdBr7lO3rm4Y5loDxs",
  authDomain: "dkrf-ba7b9.firebaseapp.com",
  projectId: "dkrf-ba7b9",
  storageBucket: "dkrf-ba7b9.firebasestorage.app",
  messagingSenderId: "651969364595",
  appId: "1:651969364595:web:cd169fc0e4bdc9226da006",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

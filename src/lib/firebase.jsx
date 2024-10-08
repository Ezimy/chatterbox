// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZOehBkuBVDbBmSw6q7mWJn5ObzQWcMCY",
  authDomain: "chatterbox-fc597.firebaseapp.com",
  projectId: "chatterbox-fc597",
  storageBucket: "chatterbox-fc597.appspot.com",
  messagingSenderId: "108476134385",
  appId: "1:108476134385:web:894931221e776270c7ca50",
  measurementId: "G-LQN4B21X39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
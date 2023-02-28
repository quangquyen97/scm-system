// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: "scmsystem-a00f1.firebaseapp.com",
  projectId: "scmsystem-a00f1",
  storageBucket: "scmsystem-a00f1.appspot.com",
  messagingSenderId: "192345681404",
  appId: "1:192345681404:web:11c87c669036a46e7d9679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
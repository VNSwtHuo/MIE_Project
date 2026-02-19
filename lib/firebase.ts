// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth, signInAnonymously} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM2JiZG3q6oJzik3TOPps02WF5ytx-K_A",
  authDomain: "mie286-project.firebaseapp.com",
  projectId: "mie286-project",
  storageBucket: "mie286-project.firebasestorage.app",
  messagingSenderId: "440403940095",
  appId: "1:440403940095:web:201263b6a5fb35002bf2ca",
  measurementId: "G-XPZN8EEMYV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize analytics only on client side
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

export const db = getFirestore(app);
export const auth = getAuth(app);
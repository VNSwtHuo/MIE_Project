'use client';

// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Lazy initialize Firebase - only done on client when needed
let app: any = null;
let db: any = null;
let auth: any = null;

const initializeFirebase = () => {
  // Only initialize once
  if (app) return { app, db, auth };

  // Only initialize on client side
  if (typeof window === 'undefined') return { app: null, db: null, auth: null };

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  try {
    // Try to get existing app first (in case of hot reload)
    app = getApp();
  } catch {
    // Initialize Firebase if not already initialized
    app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }

  db = getFirestore(app);
  auth = getAuth(app);

  return { app, db, auth };
};

// Export getter functions that trigger lazy initialization
export const getFirebaseApp = () => {
  const { app } = initializeFirebase();
  return app;
};

export const getFirebaseDb = () => {
  const { db } = initializeFirebase();
  return db;
};

export const getFirebaseAuth = () => {
  const { auth } = initializeFirebase();
  return auth;
};

// For backward compatibility, also export direct references
export const getAppInstance = () => getFirebaseApp();
export const getDbInstance = () => getFirebaseDb();
export const getAuthInstance = () => getFirebaseAuth();
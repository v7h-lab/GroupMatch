import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debugging: Check if keys are loaded
console.log("Firebase Config Check:", {
  apiKeyPresent: !!firebaseConfig.apiKey,
  authDomainPresent: !!firebaseConfig.authDomain,
  projectIdPresent: !!firebaseConfig.projectId,
  projectId: firebaseConfig.projectId // Safe to log project ID usually
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY || "API_KEY",
    authDomain: import.meta.env.VITE_AUTH_DOMAIN || "PROJECT_ID.firebaseapp.com",
    projectId: import.meta.env.VITE_PROJECT_ID || "PROJECT_ID",
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "PROJECT_ID.appspot.com",
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "SENDER_ID",
    appId: import.meta.env.VITE_APP_ID || "APP_ID"
};

console.log("Firebase Config (Debug):", firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

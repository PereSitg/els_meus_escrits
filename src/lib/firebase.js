import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: (authDomain && authDomain.includes('.')) ? authDomain : "elsmeusescrits-714b8.firebaseapp.com",
    projectId: import.meta.env.VITE_PROJECT_ID || "elsmeusescrits-714b8",
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "elsmeusescrits-714b8.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only if supported
let analytics = null;
isSupported().then(yes => {
    if (yes) {
        analytics = getAnalytics(app);
        console.log('✅ Firebase Analytics initialized');
    }
});

export { analytics };

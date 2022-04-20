import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_DB_API_KEY,
    authDomain: process.env.REACT_APP_DB_AUTH_DOMAIN,// "idyllic-now-272519.firebaseapp.com",
    projectId: process.env.REACT_APP_DB_PROJECT_ID,//"idyllic-now-272519",
    storageBucket: process.env.REACT_APP_DB_STORAGE_BUCKET,// "idyllic-now-272519.appspot.com",
    messagingSenderId: process.env.REACT_APP_DB_MSG_SENDER_ID,//"443547498759",
    appId: process.env.REACT_APP_DB_APP_ID,//"1:443547498759:web:b0db0e19de2a4c5e1d6da2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
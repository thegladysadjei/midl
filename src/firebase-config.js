import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBzXty7sROTRdiGjO3NLiPHRHS0WDV27fg",
    authDomain: "idyllic-now-272519.firebaseapp.com",
    projectId: "idyllic-now-272519",
    storageBucket: "idyllic-now-272519.appspot.com",
    messagingSenderId: "443547498759",
    appId: "1:443547498759:web:b0db0e19de2a4c5e1d6da2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
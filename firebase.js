import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDGN-9cbsinObCPJJMPlbq1_8GgMdZlSOk",
  authDomain: "accessrater-dd7a6.firebaseapp.com",
  databaseURL: "https://accessrater-dd7a6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "accessrater-dd7a6",
  storageBucket: "accessrater-dd7a6.firebasestorage.app",
  messagingSenderId: "1050243255078",
  appId: "1:1050243255078:web:d8f5029e6eaa230f790fe7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
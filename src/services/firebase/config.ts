import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDl-KrBLV4ntqFGJ4DlLSWm38pVOzKWvTc",
  authDomain: "link-app-691a4.firebaseapp.com",
  projectId: "link-app-691a4",
  storageBucket: "link-app-691a4.firebasestorage.app",
  messagingSenderId: "634305394066",
  appId: "1:634305394066:web:e972cee4672cc936573d4b",
  measurementId: "G-9MFVQ4EPDB"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
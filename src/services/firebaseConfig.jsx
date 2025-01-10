import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA7UWOWQJTRP7408AGznzQW_pqdLqqGTH8",
  authDomain: "proj-anhembi.firebaseapp.com",
  projectId: "proj-anhembi",
  storageBucket: "proj-anhembi.firebasestorage.app",
  messagingSenderId: "126541981813",
  appId: "1:126541981813:web:e65c7ff615923c730db03c",
  measurementId: "G-MGZQX9LH3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportar Firestore
const db = getFirestore(app);

export default db;

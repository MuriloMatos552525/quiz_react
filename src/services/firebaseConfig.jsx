import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD4Wm0NSiS7P9biEzQ7t2TB_e-5bdwqhQ8",
  authDomain: "amoanhembi.firebaseapp.com",
  projectId: "amoanhembi",
  storageBucket: "amoanhembi.firebasestorage.app",
  messagingSenderId: "1031601725560",
  appId: "1:1031601725560:web:442780d506876cebd00d8d",
  measurementId: "G-X0PW0KX08L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportar Firestore
const db = getFirestore(app);

export default db;

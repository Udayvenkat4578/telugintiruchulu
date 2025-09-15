// src/components/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBowh2wWQqC5XvHlkjae6lRb1HV8i6Bjeo",
  authDomain: "telugintiruchulu-d5c0f.firebaseapp.com",
  projectId: "telugintiruchulu-d5c0f",
  storageBucket: "telugintiruchulu-d5c0f.appspot.com", // ✅ fix here
  messagingSenderId: "448692333070",
  appId: "1:448692333070:web:8b8a238b5617fae3936a5f"
};

const app = initializeApp(firebaseConfig);

// Firestore reference
const db = getFirestore(app);

export { db };

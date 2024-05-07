import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyDyAAd42DFZ4X-cB-WvJUu62w9YvTHMPOg",
  authDomain: "evofit-2024.firebaseapp.com",
  projectId: "evofit-2024",
  storageBucket: "evofit-2024.appspot.com",
  messagingSenderId: "602950927259",
  appId: "1:602950927259:web:84425eaaf261b5b570d73e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Importe os módulos necessários do Firebase e AsyncStorage
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyAAd42DFZ4X-cB-WvJUu62w9YvTHMPOg",
  authDomain: "evofit-2024.firebaseapp.com",
  projectId: "evofit-2024",
  storageBucket: "evofit-2024.appspot.com",
  messagingSenderId: "602950927259",
  appId: "1:602950927259:web:84425eaaf261b5b570d73e"
};

// Inicialização do app Firebase
const app = initializeApp(firebaseConfig);

// Inicialização do Firebase Auth com AsyncStorage para persistência
export const auth = getAuth(app, {
  persistence: 'local',
  dataLayerName: 'AuthState',
  emulatorConfig: undefined
}, AsyncStorage);

// Inicialização do Firestore
export const db = getFirestore(app);

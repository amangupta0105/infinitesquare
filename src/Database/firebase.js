import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9RqFMcnFqsWusx_m_cbR4__9nwMCPILw",
  authDomain: "infinite-square-45245.firebaseapp.com",
  projectId: "infinite-square-45245",
  storageBucket: "infinite-square-45245.appspot.com",
  messagingSenderId: "627172069767",
  appId: "1:627172069767:web:391a894630ea55a9490322",
  measurementId: "G-3ZHZ8RRFE2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {db,auth,provider};
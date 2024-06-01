import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, orderByChild, startAfter, get } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR5p_Wi1XpErHBcNDiL-aulHLNFdNeoRA",
  authDomain: "gs-ano1-sem2.firebaseapp.com",
  databaseURL: "https://gs-ano1-sem2-default-rtdb.firebaseio.com",
  projectId: "gs-ano1-sem2",
  storageBucket: "gs-ano1-sem2.appspot.com",
  messagingSenderId: "301128640619",
  appId: "1:301128640619:web:3565eda704caeaa6ae292e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {
  database,
  ref,
  query,
  orderByChild,
  startAfter,
  get,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}
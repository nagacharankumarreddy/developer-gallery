import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCBpbOqz1N4loNeEVdCd4A-IDmpRWo3KdQ",
  authDomain: "developer-gallery.firebaseapp.com",
  projectId: "developer-gallery",
  storageBucket: "developer-gallery.firebasestorage.app",
  messagingSenderId: "390636698578",
  appId: "1:390636698578:web:3541300f74a8ea2871e60b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  addDoc,
  auth,
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  provider,
  signInWithPopup,
  updateDoc,
};

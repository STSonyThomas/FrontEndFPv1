// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOanVyzOvWDM2k4Q6_qa57EmDYjhAaBmI",
  authDomain: "finalyear-679f6.firebaseapp.com",
  projectId: "finalyear-679f6",
  storageBucket: "finalyear-679f6.appspot.com",
  messagingSenderId: "567864222125",
  appId: "1:567864222125:web:d5bb22c82ded1d33d98124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

export {db,auth,storage};
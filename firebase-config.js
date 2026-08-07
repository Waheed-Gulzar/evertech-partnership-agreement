// Paste your Firebase project config here — copy this whole object from
// Firebase Console → Project Settings → Your apps → the web app you registered.
//
// This being visible in the public source code is completely normal and
// expected for Firebase web apps — it is NOT a secret key. Security is
// enforced entirely by the Firestore rules (firestore.rules), not by hiding
// this config. Do not worry about this being public on GitHub.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1tHWyZ131A5M-q-SRDr7y3sPwCdboWOM",
  authDomain: "evertech-partnership.firebaseapp.com",
  projectId: "evertech-partnership",
  storageBucket: "evertech-partnership.firebasestorage.app",
  messagingSenderId: "329079732138",
  appId: "1:329079732138:web:8d40259594fd69eceb1dd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

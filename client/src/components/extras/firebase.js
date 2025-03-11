// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzlmtmmFoe5CgdUSQO8n9AueHS-HBxUeA",
  authDomain: "iitdproj.firebaseapp.com",
  projectId: "iitdproj",
  storageBucket: "iitdproj.firebasestorage.app",
  messagingSenderId: "246672820410",
  appId: "1:246672820410:web:61c5d585485395d6031a83",
  measurementId: "G-JSGB5NKMVC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
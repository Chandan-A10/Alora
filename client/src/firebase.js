// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIg480CYgAUQzOq1UDdgWZSkvLqEUWWU4",
  authDomain: "e-com-985b2.firebaseapp.com",
  projectId: "e-com-985b2",
  storageBucket: "e-com-985b2.appspot.com",
  messagingSenderId: "269711176295",
  appId: "1:269711176295:web:abbc78d182b1d4c5d51ac2",
  measurementId: "G-T18XN9ZCM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
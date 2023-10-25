// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDlLqgjjFDt6uczgeat3ccyYEkjdSNOlM",
  authDomain: "code24-68c8c.firebaseapp.com",
  projectId: "code24-68c8c",
  storageBucket: "code24-68c8c.appspot.com",
  messagingSenderId: "284332773311",
  appId: "1:284332773311:web:802fc37986e1cc6241db0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
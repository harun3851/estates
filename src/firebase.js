// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDXMw0zf01mcpLu-KUgc8k3y1bEhrcShM",
  authDomain: "estate-b1509.firebaseapp.com",
  projectId: "estate-b1509",
  storageBucket: "estate-b1509.appspot.com",
  messagingSenderId: "944720662005",
  appId: "1:944720662005:web:c7fa8b540ba456090164bc"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore();
 // Import the functions you need from the SDKs you need


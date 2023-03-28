// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfah8j2eZQUVFXTdBMnW6JnuyNB25Y9LA",
  authDomain: "realtor-clone-react-62526.firebaseapp.com",
  projectId: "realtor-clone-react-62526",
  storageBucket: "realtor-clone-react-62526.appspot.com",
  messagingSenderId: "538301958990",
  appId: "1:538301958990:web:4f2baca274e286f8106c1f"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore();
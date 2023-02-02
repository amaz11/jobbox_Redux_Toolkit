// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA45f3LEXtIz7mK-3Kbi_FFySUdw-seU-Q",
  authDomain: "jobbox-93447.firebaseapp.com",
  projectId: "jobbox-93447",
  storageBucket: "jobbox-93447.appspot.com",
  messagingSenderId: "816976316355",
  appId: "1:816976316355:web:3626183397c713cdc61f76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
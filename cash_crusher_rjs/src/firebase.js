import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAE0-Is3VEJQjK0ysKmOv4c44XYxEA08oo",
  authDomain: "cashcrusherbudgetapp.firebaseapp.com",
  projectId: "cashcrusherbudgetapp",
  storageBucket: "cashcrusherbudgetapp.appspot.com",
  messagingSenderId: "966516487265",
  appId: "1:966516487265:web:c6e2378f2aeca561b52620",
  measurementId: "G-N6Y1CJ03Y1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;

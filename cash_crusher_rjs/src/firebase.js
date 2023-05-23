import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLq_1JSwkj1EI0d5u48fvKg0wBEHcBz5o",
  authDomain: "cashcrusher2.firebaseapp.com",
  projectId: "cashcrusher2",
  storageBucket: "cashcrusher2.appspot.com",
  messagingSenderId: "139936473493",
  appId: "1:139936473493:web:0c765e4ab82123a0ea169c",
  measurementId: "G-W3GWESNH1W"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;

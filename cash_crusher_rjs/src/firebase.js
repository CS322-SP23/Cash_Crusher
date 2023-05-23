import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPzZ2rN_s83GbzQQmh8O1I9B45Qd0df8Q",
  authDomain: "cashcrusher-894c1.firebaseapp.com",
  projectId: "cashcrusher-894c1",
  storageBucket: "cashcrusher-894c1.appspot.com",
  messagingSenderId: "429380298469",
  appId: "1:429380298469:web:9fc7394022791954ae960c",
  measurementId: "G-8CVJFVRT5R"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { REACT_APP_API_KEY, REACT_APP_BASE_URL } from "../.env"
// doc https://firebase.google.com/docs/database/web/read-and-write#web-modular-api_2

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "cocktales-23d15.firebaseapp.com",
  databaseURL: process.env.REACT_APP_BASE_URL,
  projectId: "cocktales-23d15",
  storageBucket: "cocktales-23d15.appspot.com",
  messagingSenderId: "681439086589",
  appId: "1:681439086589:web:9264243ca8339b1341fb94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
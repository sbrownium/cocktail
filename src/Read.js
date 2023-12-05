import { db } from "./firebase";
// import { onValue, ref } from "firebase/database";

// Read data from the database
export default function Read({db}) {
    // Reference to the root of the database
    // const dbRef = firebase.database().ref();
    fetch(process.env.REACT_APP_BASE_URL)
    .then(res => res.json())
    .then(data => (console.log(data.json())))
  };
 

  
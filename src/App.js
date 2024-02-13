import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "./firebase.js";
import SignIn from './SignIn.js';
import Bar from './Bar.js'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const drinkRef = ref(db);
     return onValue(drinkRef, (snapshot) => {
      const data = snapshot.val();
          setData(() => data);
          setLoading(() => false);
        }, (error) => {
          setError(() => error);
          setLoading(() => false);
        });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {data && (
        <>
          <SignIn users={data.users}/>
          <Bar drinks={data.drinks} comments={data.comments}/>
        </>
      )}
    </>
  )
}
export default App;


/* 
Login page
  • Username
  • password
  • Attempt to only make field for sign-up/login. Queries the database for username and
  if you can't find it then takes to new sign-up step

Restaurant page
  • Restaurant name
  • Drink list
    – Name
    - Description
  • Comments
    - Add new
    - Expand/read

Database
  • Needs to contain:
    - username
    - password
    - comments
      • date
      • thumbs up, down, the best emoji, and puke face
*/
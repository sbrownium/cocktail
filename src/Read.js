import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "./firebase.js";
import Bar from './Bar.js'

export default function Read() {
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
// TODO induce error by blocking URL request
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {/* Render your component using the fetched data */}
      {data && (
        <div>
          <Bar drinks={data[0]}/>
          {/* <Drink drinks={data[0]}/> */}
        </div>
      )}
    </div>
  );
}


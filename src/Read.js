import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "./firebase.js";

export default function Read() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const db = getDatabase();
  // const starCountRef = ref(db, 'posts/' + postId + '/starCount');
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });

  useEffect(() => {
    const fetchData = async () => {
      console.log(db);
      const drinkRef = ref(db);

      try {
        // Attach an asynchronous callback to read the data
        onValue(drinkRef, (snapshot) => {
          const data = snapshot.val();
          setData(data);
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Clean up the Firebase listener when the component unmounts
    return () => {
      const drinkRef = ref(db);
      // drinkRef.off('value'); // Detach the listener
      drinkRef.off(db);
    };
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

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
          {/* Display data here */}
        </div>
      )}
    </div>
  );
}


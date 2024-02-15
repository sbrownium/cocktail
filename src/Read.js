import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "./firebase.js";
import Bar from './Bar.js'
// import NewComment from './NewComment.js';

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
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {data && (
        <div>
          <Bar drinks={data.drinks} comments={data.comments}/>
        </div>
      )}
    </div>
  );
}

// https://react.dev/reference/react/createContext - not avoid pass {comments} so many times before being used
// https://react.dev/learn/passing-data-deeply-with-context

// with onDataChange
// export default function Read() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const drinkRef = ref(db);

//     const handleDataChange = (snapshot) => {
//       const newData = snapshot.val();
//       setData(newData);
//       setLoading(false);
//     };

//     const handleError = (err) => {
//       setError(err);
//       setLoading(false);
//     };

//     // Set up the listener for data changes
//     const unsubscribe = onValue(drinkRef, handleDataChange, handleError);

//     // Clean up the listener on component unmount
//     return () => unsubscribe();
//   }, []); // Dependency array is empty to run the effect only once during mount

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       {data && (
//         <div>
//           <Bar drinks={data.drinks} comments={data.comments} />
//           <NewComment />
//         </div>
//       )}
//     </div>
//   );
// }

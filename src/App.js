import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "./firebase.js";
import { UserProvider } from './UserContext';
import SignIn from './SignIn.js';
import Bar from './Bar.js'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import RootLayout from './RootLayout.js';
import Account from './Account.js';
import GitHub from './GitHub.js';
// import { UserContext } from './UserContext';



function App() {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [user] = useContext(UserContext);

  const [bars, setBars] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const [comments, setComments] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [users, setUsers] = useState(null);
  const [loadingBars, setLoadingBars] = useState(true);
  const [loadingDrinks, setLoadingDrinks] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingRatings, setLoadingRatings] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorBars, setErrorBars] = useState(null);
  const [errorDrinks, setErrorDrinks] = useState(null);
  const [errorComments, setErrorComments] = useState(null);
  const [errorRatings, setErrorRatings] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);
  

  // const db = getDatabase();
  // const starCountRef = ref(db, 'posts/' + postId + '/starCount');
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });


  // useEffect(() => {
  //   const barsRef = ref(db, 'bars');
  //   const drinksRef = ref(db, 'drinks');
  //    return onValue(barsRef, (snapshot) => {
  //     const bars = snapshot.val();
  //         setData(() => bars);
  //         setLoading(() => false);
  //       }, (error) => {
  //         setError(() => error);
  //         setLoading(() => false);
  //       });
  // }, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  useEffect(() => {
    const barsRef = ref(db, 'bars');
    const drinksRef = ref(db, 'drinks');
    const commentsRef = ref(db, 'comments');
    const ratingsRef = ref(db, 'ratings');
    const usersRef = ref(db, 'usersPublic');


    const unsubscribeBars = onValue(barsRef, (snapshot) => {
      const barsData = snapshot.val();
      setBars(barsData);
      setLoadingBars(false);
    }, (error) => {
      setErrorBars(error);
      setLoadingBars(false);
    });

    const unsubscribeDrinks = onValue(drinksRef, (snapshot) => {
      const drinksData = snapshot.val();
      setDrinks(drinksData);
      setLoadingDrinks(false);
    }, (error) => {
      setErrorDrinks(error);
      setLoadingDrinks(false);
    });

    const unsubscribeComments = onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      setComments(commentsData);
      setLoadingComments(false);
    }, (error) => {
      setErrorComments(error);
      setLoadingComments(false);
    });

    const unsubscribeRatings = onValue(ratingsRef, (snapshot) => {
      const ratingsData = snapshot.val();
      setRatings(ratingsData);
      setLoadingRatings(false);
    }, (error) => {
      setErrorRatings(error);
      setLoadingRatings(false);
    });

    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      setUsers(usersData);
      setLoadingUsers(false);
    }, (error) => {
      setErrorUsers(error);
      setLoadingUsers(false);
    });

    // Clean up the subscriptions on unmount
    return () => {
      unsubscribeBars();
      unsubscribeDrinks();
      unsubscribeComments();
      unsubscribeRatings();
      unsubscribeUsers();
    };
  }, []);

  if (loadingBars || loadingDrinks || loadingComments || loadingRatings || loadingUsers) {
    return <div>Loading...</div>;
  }
  if (errorBars) {
    return <div>Error loading bars: {errorBars.message}</div>;
  }
  if (errorDrinks) {
    return <div>Error loading drinks: {errorDrinks.message}</div>;
  }
  if (errorComments) {
    return <div>Error loading comments: {errorComments.message}</div>;
  }
  if (errorRatings) {
    return <div>Error loading ratings: {errorRatings.message}</div>;
  }
  if (errorUsers) {
    return <div>Error loading users: {errorUsers.message}</div>;
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
      <Route index element={
        <Bar
          bars={bars}  
          users={users}
          drinks={drinks}
          comments={comments}
          ratings={ratings}
         />} />
        <Route path="/Account" element={<Account />} />
      </Route>
      
    )
  );
  return (
    <>  
        <>
        <UserProvider>
          <SignIn users={users}/>
          <RouterProvider router={router} />
          <a href="https://github.com/sbrownium/cocktail">
            <GitHub width='24.5px' height='24px' fillColor='black'/>
          </a>
        </UserProvider>
        </>
    </>
  )
}
export default App;
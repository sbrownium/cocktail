import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "./firebase.js";
import { UserProvider } from './UserContext';
import SignIn from './SignIn.js';
import Bar from './Bar.js'
import NewContainer from './NewContainer.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Link
} from "react-router-dom";
import RootLayout from './RootLayout.js';
import Account from './Account.js';
import Edit from './Edit.js';
import ChangeBar from './ChangeBar.js';
import GitHub from './GitHub.js';



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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Bar bars={data.bars} users={data.users} drinks={data.drinks} comments={data.comments} ratings={data.ratings}/>} />
        <Route path="/Account" element={<Account />} />
      </Route>
      
    )
  );
  return (
    <>
      {data && (
        <>
        <UserProvider>
          <SignIn users={data.users}/>
          <RouterProvider router={router} />
          <a href="https://github.com/sbrownium/cocktail">
            <GitHub width='24.5px' height='24px' fillColor='black'/>
          </a>
        </UserProvider>
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
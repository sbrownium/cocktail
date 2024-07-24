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
import CocktalesLogo from './CocktalesLogo.js';
import LinkedIn from './LinkedIn.js';
import './App.css';
import EmojiLogo from './EmojiLogo.js';
import NewContainer from './NewContainer.js';
import Button from './Button.js';
import DrinkIcon from './DrinkIcon.js';

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
  const [beingEditted, setBeingEditted] = useState(false); //editing state
  const [selectedBar, setSelectedBar] = useState('');
  const [showNewDrink, setShowNewDrink] = useState(false);

  
  // turns editting state on or off
  function handleToggle () {
    setBeingEditted(beingEditted => !beingEditted); 
    }

    function handleNewDrinkToggle () {
      setShowNewDrink(showNewDrink => !showNewDrink)
    } 
    function handleClick (e) {
      e.preventDefault();
      handleNewDrinkToggle();
    } 

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
      <Route path="/"
      element={<RootLayout 
      users={users}
      handleToggle={handleToggle}
      />}>
      <Route index element={
        <Bar
          bars={bars}  
          users={users}
          drinks={drinks}
          comments={comments}
          ratings={ratings}
          handleToggle={handleToggle}
          beingEditted={beingEditted}
         />} />
        <Route path="/Account" element={<Account />} />
      </Route>
      
    )
  );
  return (
    
        <>
        <UserProvider>
        <body>
        <header>
          {/* <CocktalesLogo
          // use logo and text props to define how much of the logo is used
            logo='yes'
            text='yes'
            width='300px'
            liquidColor='#7A00FF'
            textColorStop1='#FF00FF'
            textColorStop2='#7A00FF'
            textColorStop3='#0000FF'
            tailColor='#FF00FF'
            tipColor='white'
            glassColor='#FF00FF'  
          /> */}
          <EmojiLogo
          // use logo and text props to define how much of the logo is used
            logo='yes'
            text='yes'
            width='300px'
            />
        </header>
          {/* <SignIn users={users}/> */}
          {/* <RouterProvider router={router} /> */}
          
            <main>
            <Bar
              bars={bars}  
              users={users}
              drinks={drinks}
              comments={comments}
              ratings={ratings}
              handleToggle={handleToggle}
              beingEditted={beingEditted}
              selectedBar={selectedBar}
              setSelectedBar={setSelectedBar}
              handleClick={handleClick}
          />
          {showNewDrink ? 
       <NewContainer
        users={users}
        bars={bars}
        drinks={drinks}
        comments={comments}
        handleNewDrinkToggle={handleNewDrinkToggle} 
        defaultBar={selectedBar}
        setSelectedBar={setSelectedBar}
      />
       :
      <Button handleClick={handleClick} className='icon'>
        +<DrinkIcon width='24' height='24' fill='grey'/>
      </Button>
      }
          </main>
         <footer>
            <nav>
              <SignIn
                users={users}
                handleToggle={handleToggle}
              />
              <a href="https://github.com/sbrownium/cocktail">
                <GitHub width='24.5px' height='24px' fillColor='black'/>
              </a>
              <a href="https://linkedin.com/in/sbrownium">
                <LinkedIn width='24.5px' height='24px' fillColor='#2867B2'/>
              </a>
            </nav>
         </footer>
         </body>
          {/* <a href="https://github.com/sbrownium/cocktail">
            <GitHub width='24.5px' height='24px' fillColor='black'/>
          </a>
          <a href="https://linkedin.com/in/sbrownium">
            <LinkedIn width='24.5px' height='24px' fillColor='#2867B2'/>
          </a> */}
        </UserProvider>
        </>
 
  )
}
export default App;
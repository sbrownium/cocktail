import React, { useState, useEffect, useRef } from 'react';
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
import LinkedIn from './LinkedIn.js';
import './App.css';
import EmojiLogo from './EmojiLogo.js';
import NewContainer from './NewContainer.js';
import Button from './Button.js';




function App() {
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
  const [showBars, setShowBars] = useState(false);
  const [showBarsOption, setShowBarsOption] = useState(true);
  const newDrinkRef = useRef(null);


function openModal (modal) {
    modal.current.showModal();
}
 
function closeModal (modal) {
  modal.current.close();
}
  // turns editting state on or off
  function handleToggle () {
    setBeingEditted(beingEditted => !beingEditted); 
  }

  function handleNewDrinkToggle () {
      if (!newDrinkRef.current.open) {
        openModal(newDrinkRef); // open modal
        setShowNewDrink(true); // hide button
      } 
      else {
        closeModal(newDrinkRef); // close modal
        setShowNewDrink(false); // show button
      }
    } 

    function handleClick (e) {
      e.preventDefault();
      handleNewDrinkToggle();
      setShowBarsOption(false);
    } 

    function handleReset (e) {
      e.preventDefault();
      setSelectedBar('');
      setBeingEditted(false);
      setShowNewDrink(false);
      setShowBars(false);
      setShowBarsOption(true);
    }

    function handleToGoBars () {
      setShowBars(showBars => !showBars);
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
          // showingBar={showingBar}
          // setShowingBar={setShowingBar}
         />} />
        <Route path="/Account" element={<Account />} />
      </Route>
      
    )
  );
  return (
    
        <>
        <UserProvider>
        <body>
          <div className='backgroundOverlay'></div>
        <header>
          <Button handleClick={handleReset} className='icon'>
          <EmojiLogo
          // use logo and text props to define how much of the logo is used
            logo='yes'
            text='yes'
            width='300px'
            />
            </Button>
        </header>
          
            <main>
              <div className='initialSelectionContainer'>
              {!showBars ?
            <Button handleClick={handleToGoBars} className={!showBars ? 'icon barButton initialSelect' : 'icon barButton'}>
            🪩
            </Button> :
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
          />}
       <NewContainer
       newDrinkRef={newDrinkRef}
       closeModal={closeModal}
        users={users}
        bars={bars}
        drinks={drinks}
        comments={comments}
        handleNewDrinkToggle={handleNewDrinkToggle} 
        defaultBar={selectedBar}
        setSelectedBar={setSelectedBar}
      />
       {!showNewDrink &&
      <Button handleClick={handleClick} className={!showBars ? 'icon drinkButton initialSelect' : 'icon drinkButton'}>
        +🍹
      </Button>
      }
      </div>
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
        </UserProvider>
        </>
 
  )
}
export default App;
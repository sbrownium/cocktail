import React, { useState, useEffect, useRef, useContext } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from "./UserContext.js";
import { BarContext } from './BarContext.js';
import SignIn from './SignIn.js';
import Bar from './Bar.js'
import './App.css';
import EmojiLogo from './EmojiLogo.js';
import NewContainer from './NewContainer.js';
import Button from './Button.js';
import Edit from './Edit.js';
import SelectionContainer from './SelectionContainer.js';
import MoreContainer from './MoreContainer.js';
import SignInModal from './SignInModal.js';

function App() {
  const [bars, setBars] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const [comments, setComments] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [users, setUsers] = useState(null);
  const [user] = useContext(UserContext); 
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
  // const [selectedBar, setSelectedBar] = useContext(BarContext);
  // const [barsArray, setBarsArray] = useContext(BarContext)
  const { barsArray, setBarsArray, selectedBar, setSelectedBar } = useContext(BarContext);
  const [showNewDrink, setShowNewDrink] = useState(false);
  const [showBars, setShowBars] = useState(false);
  const [showingBar, setShowingBar] = useState(false);
  const [showBarsOption, setShowBarsOption] = useState(true);
  const [pendingNewDrink, setPendingNewDrink] = useState(false); // set when user tries to add new drink without being logged in
  const [barAtPendingNewDrink, setBarAtPendingNewDrink] = useState('') // the bar the user is on when they try to add new drink without being logged in

  const newDrinkRef = useRef(null);
  const changeBarRef = useRef(null);
  const signInRef = useRef(null);

  useEffect(() => { // listens for a user trying to add a new drink without being signed in
    // after they are signed in will open the new drink modal
    // the bar is the user is at has to be the same as when they first tried to log in so 
    // the new drink modal does pop up unexpectedly way after the fact
    if (user && pendingNewDrink && (barAtPendingNewDrink === selectedBar.barID)) {
      handleNewDrinkToggle(); // open new drink modal
      setShowBarsOption(false); // do not show bars
      setPendingNewDrink(false); // handleNewDrinkToggle does not need to run after login
    }
  }, [user, pendingNewDrink, selectedBar.barID]);


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

function handleChangeBarToggle () {
  handleModalToggle(changeBarRef, setShowBars);
  if (changeBarRef.current.open) {
    setSelectedBar('');
  }
}

function handleNewDrinkToggle () {
  handleModalToggle(newDrinkRef, setShowNewDrink);
}

function handleSignModalToggle () {
    if (!signInRef.current.open) {
      openModal(signInRef); // open modal
    } 
    else {
      closeModal(signInRef); // close modal
    }
} 

function handleModalToggle (ref, setState) {
  if (!ref.current.open) {
    openModal(ref); // open modal
    setState(true); // hide button
  } 
  else {
    closeModal(ref); // close modal
    setState(false); // show button
  }
} 

  function handleClick (e) {
    e.preventDefault();
    if (user) {
      setPendingNewDrink(false); // handleNewDrinkToggle does not need to run after login
      setShowBarsOption(false); // do not show bars
      handleNewDrinkToggle(); // open new drink modal
    } else {
      setPendingNewDrink(true); // handleNewDrinkToggle needs to run after login
      setBarAtPendingNewDrink(selectedBar.barID); // the bar the user is on when they try to add new drink without being logged in
      handleSignModalToggle(); // open the Sign in modal
    }
  } 

    function handleReset (e) {
      e.preventDefault();
      setSelectedBar('');
      setBeingEditted(false);
      setShowNewDrink(false);
      setShowBars(false);
      setShowingBar(false);
      setShowBarsOption(true);
    }
    
    function handleToGoBars (e) {
      e.preventDefault();
      handleChangeBarToggle();
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
      setBarsArray(barsData);
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

  return (
    
        <>
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
             
            <Bar
              bars={bars}  
              users={users}
              drinks={drinks}
              comments={comments}
              ratings={ratings}
              handleToggle={handleToggle}
              beingEditted={beingEditted}
              handleClick={handleClick}
              changeBarRef={changeBarRef}
              handleChangeBarToggle={handleChangeBarToggle}
              showingBar={showingBar}
              setShowingBar={setShowingBar}
          />
           <SignInModal
            message='add a drink'
            reference={signInRef}
            handleToggle={handleSignModalToggle}
            users={users}
            handleCommentSubmit={handleClick}
        />
       <NewContainer
        newDrinkRef={newDrinkRef}
        users={users}
        bars={bars}
        drinks={drinks}
        comments={comments}
        handleNewDrinkToggle={handleNewDrinkToggle}
        setSelectedBar={setSelectedBar}
        setShowingBar={setShowingBar}
      />
      <SelectionContainer 
        showingBar={showingBar}
        handleToGoBars={handleToGoBars}
        handleClick={handleClick}
      />
   
          </main>
         <footer>
          <div className='footContainer'>
            <nav>
  
                <SignIn
                  users={users}
                  setBeingEditted={setBeingEditted}
                />
                <Button
                  handleClick={handleToGoBars}
                  className='emoji footerEmoji'
                  >
                    🪩
                  </Button>
                  <Button
                    handleClick={handleClick}
                    className='emoji footerEmoji'
                  >
                    🍹
                  </Button>
                  {/* <Edit
                    handleToggle={handleToggle} 
                    beingEditted={beingEditted}
                  /> */}
              <MoreContainer />
            </nav>
                <div className='background'> </div>
                </div>
         </footer>
         
         </body>
        </>
 
  )
}
export default App;
import React, {useContext, useState, useMemo} from 'react';
import { UserContext } from './UserContext';
import Order from './Order';
import Filter from './Filter';
import Button from './Button';
import Drink from './Drink';


export default function DrinkList({
    barID,
    beingEditted,
    comments,
    drinks,
    ratings,
    handleToggle,
    users
}){
  const [user] = useContext(UserContext);
  const {userID} = user;
  const [checked, setChecked] = useState('Date Added');
  const [showDrinkArchive, setShowDrinkArchive] = useState(false);
  
  const initialFilter = {
    topRated: null,
    withComments: null,
    myTop: null,
    myComments: null
  }
  const [ filterChecked, setFilterChecked ] = useState(initialFilter);
    
  const commentsArray = Object.values(comments);
  const filteredComments = commentsArray.filter(comment => comment.barID === barID);
  const myfilteredComments = filteredComments.filter(comment => comment.userID === userID);

  function handleChange (e) {
    setChecked(e.target.value)
  }

  function toggleShowDrinkArchive () {
    setShowDrinkArchive(showDrinkArchive => !showDrinkArchive)
  }

  function alphaSort (a,b) {
    const c = a.drinkName.toLowerCase();
    const d = b.drinkName.toLowerCase();
      if ( c < d ){
        return -1;
      }
      if ( c > d ){
        return 1;
      }
      return 0;
    }

  function dateSort (a,b) {
   return a.initialTimeStamp - b.initialTimeStamp;
  } 

  function findRating (x) {
    const ratingsArray = Object.values(ratings);
    let filteredRatings = []
      if (checked === 'My Highest Rating' || checked === 'My Lowest Rating' || filterChecked.myTop === 'My Top Rated') {
        filteredRatings = ratingsArray.filter(rating => rating.userID === user.userID).filter(drink => drink.drinkID === x.drinkID)
      } else {
        filteredRatings = ratingsArray.filter(drink => drink.drinkID === x.drinkID);
      }
    const drinkRatings = [];
// This logic can probably be simpler
    filteredRatings.forEach((e) => drinkRatings.push(e.rating));
    if (drinkRatings.length !== 0){
    const ratingTotal = drinkRatings.reduce((accum, current) => accum + current);
    return Math.round(ratingTotal / drinkRatings.length);
    }
    }
  function highAverageSort (a,b) {
    if ((findRating(a) !== undefined) && (findRating(b) !== undefined))
      return findRating(b) - findRating(a);
  }

  function lowAverageSort (a,b) {
    if ((findRating(a) !== undefined) && (findRating(b) !== undefined))
      return findRating(a) - findRating(b);
  }

  function handleFilterChange (e) {
    if (e.target.value === 'Only Top Rated') {
      if (filterChecked.topRated === 'Only Top Rated') {
        setFilterChecked({
          ...filterChecked,
            topRated: null
          });
      } else {
        setFilterChecked({
          ...filterChecked,
            topRated: e.target.value
          });
      }
  } else if (e.target.value === 'With Comments') {
    if (filterChecked.withComments === 'With Comments') {
      setFilterChecked({
        ...filterChecked,
        withComments: null
      });
    } else {
      setFilterChecked({
        ...filterChecked,
        withComments: e.target.value
      });
   }
} else if (e.target.value === 'My Top Rated') {
  if (filterChecked.myTop === 'My Top Rated') {
    setFilterChecked({
      ...filterChecked,
      myTop: null
    });
  } else {
    setFilterChecked({
      ...filterChecked,
      myTop: e.target.value
    });
 }
} else if (e.target.value === 'My Comments') {
  if (filterChecked.myComments === 'My Comments') {
    setFilterChecked({
      ...filterChecked,
      myComments: null
    });
  } else {
    setFilterChecked({
      ...filterChecked,
      myComments: e.target.value
    });
 }
}
}

const sortedDrinks = useMemo(() => {
  const drinksArray = () => {
  if (showDrinkArchive) {
    return Object.values(drinks);
  } else {
    return Object.values(drinks).filter(drink => drink.archived === false);
  }}
  const filteredDrinks = drinksArray().filter(drink => drink.barID === barID);

  function getSortedDrinks (){
    if (checked === 'Alphabetical') {
      return filteredDrinks.toSorted(alphaSort);
    } if (checked === 'Highest Average Rating') {
      return filteredDrinks.toSorted(highAverageSort);
    } if (checked === 'Lowest Average Rating') {
      return filteredDrinks.toSorted(lowAverageSort);
    } if (checked === 'My Highest Rating') {
      return filteredDrinks.toSorted(highAverageSort);
    } if (checked === 'My Lowest Rating') {
      return filteredDrinks.toSorted(lowAverageSort);
    }
      return filteredDrinks.toSorted(dateSort);
  }
  const sortedDrinks = getSortedDrinks();
  function onlyTopRated (drink) {
    return findRating(drink) === 4; 
  }
  function onlyWithComments (drink) {
    return (filteredComments.some(comment => comment.drinkID === drink.drinkID))
  }
  function onlyMyComments (drink) {
    return (myfilteredComments.some(comment => comment.drinkID === drink.drinkID))
  }
  if ((filterChecked.topRated !== null) && (filterChecked.withComments === null)) {
    return sortedDrinks.filter(onlyTopRated)
  } if ((filterChecked.withComments !== null) && (filterChecked.topRated === null)) {
    return sortedDrinks.filter(onlyWithComments)
  } if ((filterChecked.withComments !== null) && (filterChecked.topRated !== null)) {
    return sortedDrinks.filter(onlyTopRated).filter(onlyWithComments)
  } 
  if ((filterChecked.myTop !== null) && (filterChecked.myComments === null)) {
    return sortedDrinks.filter(onlyTopRated)
  } if ((filterChecked.myComments !== null) && (filterChecked.myTop === null)) {
    return sortedDrinks.filter(onlyMyComments) 
  } if ((filterChecked.myComments !== null) && (filterChecked.myTop !== null)) {
    return sortedDrinks.filter(onlyMyComments).filter(onlyTopRated)
  }
  return sortedDrinks;
}, [drinks, showDrinkArchive, checked, filterChecked, filteredComments, myfilteredComments]);
    return (
      <>
      <Order
        checked={checked}
        handleChange={handleChange}
        ratings={ratings}
        barID={barID}
      />
       <Filter
        filterChecked={filterChecked}
        handleFilterChange={handleFilterChange}
        comments={comments}
        barID={barID}
      />
        <ul>
          {sortedDrinks.map(({addedBy, archived, drinkName, drinkID, description, initialTimeStamp, price}, index) => ( 
          <li key={index}>
             <Drink
              addedBy={addedBy}
              archived={archived}
              barID={barID}
              beingEditted={beingEditted}
              comments={comments}
              drinkName={drinkName}
              drinkID={drinkID}
              drinks={drinks}
              description={description}
              handleToggle={handleToggle}
              initialTimeStamp={initialTimeStamp}
              price={price}
              ratings={ratings}
              users={users}
              />
          </li>
          ))}
        </ul> 
        {(Object.values(drinks).filter(drink => drink.barID === barID).some((drink) => drink.archived === true)) &&
        // Object.values... checks if there is an archived drink to determine to show button
        <Button handleClick={toggleShowDrinkArchive}>
        {!showDrinkArchive ? 'Show Archived Drinks' : 'Hide Archived Drinks'}
      </Button>}
        </>  
      )    
}

import React, {useContext, useState, useMemo} from 'react';
import CommentList from './CommentList';
import AverageRating from './AverageRating';
import UserRating from './UserRating';
import { UserContext } from './UserContext';
import Order from './Order';
import Filter from './Filter';
import ArchiveButton from './ArchiveButton';


export default function Drink({barID, drinks, comments, ratings, users, handleToggle, beingEditted }){
  const [user] = useContext(UserContext);
  const {userID} = user;
  const [checked, setChecked] = useState('Date Added');
  const initialFilter = {
    topRated: null,
    withComments: null,
    myTop: null,
    myComments: null
  }
  const [ filterChecked, setFilterChecked ] = useState(initialFilter);

  const emojiLookUp = {
    '🤢': 1,
    '🤷‍♀️': 2,
    '👍': 3,
    '🎉': 4
};
    
  const drinksArray = Object.values(drinks).filter(drink => drink.archived === false);
  const filteredDrinks = drinksArray.filter(drink => drink.barID === barID);

  const commentsArray = Object.values(comments);
  const filteredComments = commentsArray.filter(comment => comment.barID === barID);
  const myfilteredComments = filteredComments.filter(comment => comment.userID === userID);

  function handleChange (e) {
    setChecked(e.target.value)
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

// const sortedDrinks = useMemo(() => {
//   function getSortedDrinks (){
//     if (checked === 'Alphabetical') {
//       return filteredDrinks.toSorted(alphaSort);
//     } if (checked === 'Highest Average Rating') {
//       return filteredDrinks.toSorted(highAverageSort);
//     } if (checked === 'Lowest Average Rating') {
//       return filteredDrinks.toSorted(lowAverageSort);
//     } if (checked === 'My Highest Rating') {
//       return filteredDrinks.toSorted(highAverageSort);
//     } if (checked === 'My Lowest Rating') {
//       return filteredDrinks.toSorted(lowAverageSort);
//     }
//       return filteredDrinks.toSorted(dateSort);
//   }
//   const drinks = getSortedDrinks();

//   function onlyTopRated (drink) {
//     return findRating(drink) === 4; 
//   }
//   function onlyWithComments (drink) {
//     return (filteredComments.some(comment => comment.drinkID === drink.drinkID))
//   }
//   if ((filterChecked.topRated !== null) && (filterChecked.withComments === null)) {
//     return drinks.filter(onlyTopRated)
//   } if ((filterChecked.withComments !== null) && (filterChecked.topRated === null)) {
//     return drinks.filter(onlyWithComments)
//   } if ((filterChecked.withComments !== null) && (filterChecked.topRated !== null)) {
//     return drinks.filter(onlyTopRated).filter(onlyWithComments)
//   } 
//   return drinks;
// }, [checked, filterChecked, filteredDrinks, filteredComments]);

const sortedDrinks = useMemo(() => {
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
  const drinks = getSortedDrinks();

  // function getMySortedDrinks(drink) {
  //   return drink.filter(drink => drink.userID === userID)
  // }

  // const myDrinks = getSortedDrinks().filter(drink => drink.userID === userID);

  function onlyTopRated (drink) {
    return findRating(drink) === 4; 
  }
  // function myTopRated (drink) {
  //   return findRating(drink) === 4; 
  // }
  function onlyWithComments (drink) {
    return (filteredComments.some(comment => comment.drinkID === drink.drinkID))
  }
  function onlyMyComments (drink) {
    return (myfilteredComments.some(comment => comment.drinkID === drink.drinkID))
  }
  if ((filterChecked.topRated !== null) && (filterChecked.withComments === null)) {
    return drinks.filter(onlyTopRated)
  } if ((filterChecked.withComments !== null) && (filterChecked.topRated === null)) {
    return drinks.filter(onlyWithComments)
  } if ((filterChecked.withComments !== null) && (filterChecked.topRated !== null)) {
    return drinks.filter(onlyTopRated).filter(onlyWithComments)
  } 
  if ((filterChecked.myTop !== null) && (filterChecked.myComments === null)) {
    return drinks.filter(onlyTopRated)
  } if ((filterChecked.myComments !== null) && (filterChecked.myTop === null)) {
    return drinks.filter(onlyMyComments) 
  } if ((filterChecked.myComments !== null) && (filterChecked.myTop !== null)) {
    return drinks.filter(onlyMyComments).filter(onlyTopRated)
  }
  return drinks;
}, [checked, filterChecked, filteredDrinks, filteredComments, myfilteredComments]);

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
          {sortedDrinks.map(({drinkName, drinkID, description, price}, index) => (  
          <li key={index}>
            {drinkName} &mdash;&nbsp;
            {description} &mdash;
            ${Number(price).toFixed(2)}
            <AverageRating
              emojiLookUp={emojiLookUp}
              ratings={ratings}
              ratingDrinkID={drinkID}
            />
           {user && 
           <UserRating
                emojiLookUp={emojiLookUp}
                ratings={ratings}
                drinkName={drinkName}
                ratingDrinkID={drinkID}
                handleToggle={handleToggle}
                beingEditted={beingEditted}
                barID={barID} />}
            <ArchiveButton 
              path={'/drinks/'}
              nodeID={drinkID}
              drinks={drinksArray}
              nodeName='this drink'
              handleToggle={handleToggle}
              className={null}
              children='Archive Drink'
            />
            <CommentList
              comments={comments}
              users={users}
              commentDrinkID={drinkID}
              beingEditted={beingEditted}
              handleToggle={handleToggle}
              barID={barID}/>
          </li>
          ))}
        </ul> 
        </>  
      )
}

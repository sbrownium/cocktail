import React, {useContext, useState, useMemo} from 'react';
import CommentList from './CommentList';
import AverageRating from './AverageRating';
import UserRating from './UserRating';
import { UserContext } from './UserContext';
import Order from './Order';
import Filter from './Filter';


export default function Drink({barID, drinks, comments, ratings, users, handleToggle, beingEditted }){
  const [user, setUser] = useContext(UserContext);
  const [checked, setChecked] = useState('Date Added');
  // const [topRatedChecked, setTopRatedChecked] = useState(null);
  // const [withCommentsChecked, setWithCommentsChecked] = useState(null);
  // const [hasHighRating, setHasHighRating] = useState(false)
  const initialFilter = {
    topRated: null,
    withComments: null
  }
  const [ filterChecked, setFilterChecked ] = useState(initialFilter);
  // const ratingsArray = Object.values(ratings);
  // const filteredRatings = ratingsArray.filter(rating => rating.barID === barID);
  // const [hasRating, setHasRating] = useState(false);
  

  const emojiLookUp = {
    '🤢': 1,
    '🤷‍♀️': 2,
    '👍': 3,
    '🎉': 4
};
    
  const drinksArray = Object.values(drinks);
  const filteredBars = drinksArray.filter(bar => bar.barID === barID);

  function handleChange (e) {
    setChecked(e.target.value)
  }

    // function findChecked (ev) {
    //   let value = ev.target.value
    //   if (value === 'Only Top Rated') {
    //     return ([topRatedChecked, setTopRatedChecked])
    //   } if (value === 'With Comments') {
    //     return ([withCommentsChecked, setWithCommentsChecked])
    //   }
    // }

  //   function handleFilterChange(e) {
  //     if (e.target.value === 'Only Top Rated') {
  //       if (topRatedChecked === 'Only Top Rated') {
  //         setTopRatedChecked(null);
  //       } else {
  //         setTopRatedChecked(e.target.value);
  //         onlyTopRated();
  //       }
  //   } if (e.target.value === 'With Comments') {
  //     if (withCommentsChecked === 'With Comments') {
  //       setWithCommentsChecked(null);
  //     } else {
  //       setWithCommentsChecked(e.target.value);
  //    }
  // }
  // }

  // function onlyTopRated () {
  //     return filteredBars.filter((a) => findRating(a) === 4);
  // }
  

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
      if (checked === 'My Highest Rating' || checked === 'My Lowest Rating') {
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
}}

const userFiltered = useMemo(() => {
 if (filterChecked.topRated !== null) { // if topRated is checked
  return (a) => findRating(a) === 4; // return ratings of 4
 } return (a) => a; // filter by nothing as default
  }, [filterChecked, filteredBars]);

const sortedBars = useMemo(() => {
  if (checked === 'Alphabetical') {
    return filteredBars.toSorted(alphaSort);
  } if (checked === 'Highest Average Rating') {
    return filteredBars.toSorted(highAverageSort);
  } if (checked === 'Lowest Average Rating') {
    return filteredBars.toSorted(lowAverageSort);
  } if (checked === 'My Highest Rating') {
    return filteredBars.toSorted(highAverageSort);
  } if (checked === 'My Lowest Rating') {
    return filteredBars.toSorted(lowAverageSort);
  }
    return filteredBars.toSorted(dateSort);
}, [checked, filteredBars]);


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
      />
        <ul>
      {sortedBars.filter(userFiltered).map(({drinkName, drinkID, description, price}, index) => (    
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
                barID={barID}
              />
              }
            <CommentList
              comments={comments}
              users={users}
              commentDrinkID={drinkID}
              beingEditted={beingEditted}
              handleToggle={handleToggle}
              barID={barID}
            />
          </li>
          ))}
        </ul> 
        </>  
      )
}

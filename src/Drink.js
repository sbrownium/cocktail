import React, {useContext, useState, useMemo} from 'react';
import CommentList from './CommentList';
import AverageRating from './AverageRating';
import UserRating from './UserRating';
import { UserContext } from './UserContext';
import Order from './Order';


export default function Drink({barID, drinks, comments, ratings, users, handleToggle, beingEditted, handleClick}){
  const [user, setUser] = useContext(UserContext);
  const [checked, setChecked] = useState('Date Added');

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

const sortedBars = useMemo(() => {
  if (checked === 'Alphabetical') {
    return [...filteredBars].toSorted(alphaSort);
  } 
  if (checked === 'Date Added') {
    return [...filteredBars].toSorted(dateSort);
  }
  return filteredBars;
}, [checked, filteredBars]);

    return (
      <>
      <Order checked={checked} handleChange={handleChange}/>
        <ul>
      {sortedBars.map(({drinkName, drinkID, description, price}, index) => (    
          <li key={index}>
            {drinkName} &mdash;&nbsp;
            {description} &mdash;
            ${Number(price).toFixed(2)}
            <AverageRating
              emojiLookUp={emojiLookUp}
              ratings={ratings}
              ratingDrinkID={drinkID}
            />
            {user ?
              <UserRating
                emojiLookUp={emojiLookUp}
                ratings={ratings}
                drinkName={drinkName}
                ratingDrinkID={drinkID}
                handleToggle={handleToggle}
                beingEditted={beingEditted}
              />
              : null }
            <CommentList
              comments={comments}
              users={users}
              commentDrinkID={drinkID}
              beingEditted={beingEditted}
              handleToggle={handleToggle}
            />
          </li>
          ))}
        </ul> 
        </>  
      )
}

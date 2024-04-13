import React, {useContext, useState} from 'react';
import CommentList from './CommentList';
import AverageRating from './AverageRating';
import UserRating from './UserRating';
import { UserContext } from './UserContext';
import Order from './Order';


export default function Drink({barID, drinks, comments, ratings, users, handleToggle, beingEditted, handleClick}){
  const [user, setUser] = useContext(UserContext);
  const [checked, setChecked] = useState("Alphabetical");

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

  
    return (
      <>
      <Order checked={checked} handleChange={handleChange}/>
      {/* <Order handleAlpha={handleAlpha} alphaCheck={alphaCheck} handleDate={handleDate} dateCheck={dateCheck}/> */}
        <ul>
      {filteredBars.map(({drinkName, drinkID, description, price}, index) => (  
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

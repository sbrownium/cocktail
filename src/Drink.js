import React, {useContext} from 'react';
import CommentList from './CommentList';
import AverageRating from './AverageRating';
import NewRating from './NewRating';
import UserRating from './UserRating';
import { UserContext } from './UserContext';

export default function Drink({barID, drinks, comments, ratings, handleToggle, beingEditted, handleClick}){
  const [user, setUser] = useContext(UserContext);
  // const { userName, userID } = user 
  const emojiLookUp = {
    '🤢': 1,
    '🤷‍♀️': 2,
    '👍': 3,
    '🎉': 4
};
  const drinksArray = Object.values(drinks);
  const filteredBars = drinksArray.filter(bar => bar.barID === barID);
    return (
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
              : ''}
            <CommentList
              comments={comments}
              commentDrinkID={drinkID}
              beingEditted={beingEditted}
              handleToggle={handleToggle}
            />
          </li>
          ))}
        </ul>   
      )
}

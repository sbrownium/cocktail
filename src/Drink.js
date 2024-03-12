import React from 'react';
import CommentList from './CommentList';
import Rating from './Rating';
import NewRating from './NewRating';
// import NewComment from './NewComment';

export default function Drink({barID, drinks, comments, ratings}){
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
            <Rating emojiLookUp={emojiLookUp} ratings={ratings} ratingDrinkID={drinkID}/>
            <NewRating emojiLookUp={emojiLookUp} ratings={ratings} ratingDrinkID={drinkID}/>
            <CommentList comments={comments} commentDrinkID={drinkID}/>
          </li>
          ))}
           </ul>   
      )
}
// need something like uniqueBars for the drink to know what
// drink to attach comments to

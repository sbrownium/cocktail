import React, { useState, useContext } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import Submit from './Submit.js';


export default function NewRating({emojiLookUp, ratings, drinkName, ratingDrinkID}) {
    
    const [rating, setRating] = useState('');
    const [count, setCount] = useState(0)
    const [user, setUser] = useContext(UserContext);
    const { userName, userID } = user 
    

    function handleRating (e) {
        setRating({
            rating: Number(e.target.value)
        })
}
    function handleClick(e) {
    // const ratingsArray = Object.values(ratings);
    // const filterRatings = ratingsArray.filter(rating => rating.userID === userID).filter(rating => rating.drinkID === ratingDrinkID);
    // const emojiKeys = Object.keys(emojiLookUp);
    // const oldRatingToEmoji = emojiKeys.find(key => emojiLookUp[key] === filterRatings[0].rating);
    // const newRatingToEmoji = emojiKeys.find(key => emojiLookUp[key] === rating.rating);
    
      e.preventDefault();
      if (!user) { 
        return (
          alert('Please login to rate a drink')
        )
    } 
    // if (filterRatings.length != 0 && count < 1) {
    //         setCount(count + 1);
    //         return (
    //             alert('You already rated ' + drinkName + ' as ' + oldRatingToEmoji + '. Do you want to change the rating to ' + newRatingToEmoji + '?')
    //         )
    //     }
        // if user has already rated alert that will change rating (return what was already rated)
        else {
      const newRatingKey = push(child(ref(db), '/ratings/')).key;
      const updates = {};
      const newRating = {
        ratingID: newRatingKey,
        userName: userName,
        userID: userID,
        drinkID: ratingDrinkID,
        originalTimeStamp: performance.timeOrigin,
        lastTimeStamp: performance.timeOrigin,
        rating: rating.rating
      };
    setRating('');
    setCount(0);
    updates['/ratings/' + newRatingKey] = newRating;
   
    return (
        update(ref(db), updates).then(() => {
            console.log('Data saved successfully!')
      })
      .catch((error) => {
        console.log('problem writing')
      })
    ) }
}
    return (  
      <>
        <form>
          <label>Rating
          <select name='ratingSelect'
          value={rating.rating} 
          onChange={handleRating}
          >
            <option>Rate</option>
            {Object.entries(emojiLookUp).map(([key, value], index) => (
    <option key={index} value={value}>{key}</option>
)).reverse()}
          </select>
          </label>
          <Submit handleClick={handleClick} value='add'/>
        </form>
      </>
    );
  }
import React, { useState, useContext } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import Submit from './Submit.js';


export default function NewRating({emojiLookUp, ratingDrinkID}) {

    const [rating, setRating] = useState('');
    const [user, setUser] = useContext(UserContext);
    const { userName, userID } = user 

    function handleRating (e) {
        setRating({
            rating: e.target.value
        })
}

    function handleClick(e) {
      e.preventDefault();
      if (!user) { 
        return (
          alert('Please login to rate a drink')
        )}
        // if user has already rated alert that will change rating (return what was already rated)
        else {
      const newRatingKey = push(child(ref(db), '/ratings/')).key;
      const updates = {};
      const newRating = {
        ratingID: newRatingKey,
        userName: userName,
        userID: userID,
        drinkID: ratingDrinkID,
        timeStamp: performance.timeOrigin,
        rating: Number(rating.rating)
      };
    setRating('');
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
))}
          </select>
          </label>
          <Submit handleClick={handleClick} value='add'/>
        </form>
      </>
    );
  }
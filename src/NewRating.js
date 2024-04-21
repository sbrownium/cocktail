import React, { useState, useContext } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import Submit from './Submit.js';


export default function NewRating({emojiLookUp, handleToggle, filterRatings, barID, ratingDrinkID, text, beingEditted}) {
    
    const [rating, setRating] = useState('');
    const [user, setUser] = useContext(UserContext);
    const { userName, userID } = user 
    

    function handleRating (e) {
        setRating({
            rating: Number(e.target.value)
        })
}
    function handleClick(e) {
      e.preventDefault();
      if (!user) { 
        return (
          alert('Please login to rate a drink')
        )
    } 
    if (filterRatings.length != 0) {
      const updates = {};
      const updatedRating = {
        barID: filterRatings[0].barID,
        ratingID: filterRatings[0].ratingID,
        userID: filterRatings[0].userID,
        drinkID: filterRatings[0].drinkID,
        initialTimeStamp: filterRatings[0].originalTimeStamp,
        lastTimeStamp: Date.now(),
        rating: rating.rating
      };
    setRating('');
    handleToggle();
    updates['/ratings/' + filterRatings[0].ratingID] = updatedRating;
   
    return (
        update(ref(db), updates).then(() => {
            console.log('Data saved successfully!')
      })
      .catch((error) => {
        console.log('problem writing')
      })
    ) 
  }
if (filterRatings.length === 0)  
   {
      const newRatingKey = push(child(ref(db), '/ratings/')).key;
      const updates = {};
      const newRating = {
        barID: barID,
        ratingID: newRatingKey,
        userID: userID,
        drinkID: ratingDrinkID,
        initialTimeStamp: Date.now(),
        lastTimeStamp: Date.now(),
        rating: rating.rating
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
    )
  }
}
    return (  
      <>
        <form>
          <label>{text}
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
          {beingEditted ?
          <Submit handleClick={handleClick} value='save'/>
          :
          <Submit handleClick={handleClick} value='add'/>}
        </form>
      </>
    );
  }
import React, { useState } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";

export default function NewComment({commentDrinkID}) {
    const [comment, setComment] = useState('');
  
    function handleClick(e) {
      e.preventDefault();
      const newCommentKey = push(child(ref(db), '/comments/')).key;
      const updates = {};
      const newComment = {
        commentID: newCommentKey,
        userName: 'Scott',
        userID: 'ifdshoiadklsf90239vnkc92',
        drinkID: commentDrinkID,
        timeStamp: performance.timeOrigin,
        text: comment,
      };
    setComment('');
      
    updates['/comments/' + newCommentKey] = newComment;
    return (
        update(ref(db), updates).then(() => {
            console.log('Data saved successfully!')
      })
      .catch((error) => {
        console.log('problem writing')
      })
    )
}
    return (
      <>
        <form>
          <label>New:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <input
            type="submit"
            value="add"
            onClick={handleClick}
            onKeyDown={(e) =>
              e.key === 'Enter' ? handleClick(e) : ''
            }
          />
        </form>
      </>
    );
  }

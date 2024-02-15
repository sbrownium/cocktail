import React, { useState, useContext } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';

export default function NewComment({commentDrinkID}) {
    const [comment, setComment] = useState('');
    const [user, setUser] = useContext(UserContext);
    const { userName, userID } = user 

    function handleClick(e) {
      e.preventDefault();
      if (!user) { 
        return (
          alert('Please login to add a comment')
        )}
        else {
      const newCommentKey = push(child(ref(db), '/comments/')).key;
      const updates = {};
      const newComment = {
        commentID: newCommentKey,
        userName: userName,
        userID: userID,
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
    ) }
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

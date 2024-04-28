import React, { useState, useContext } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import Submit from './Submit.js';


export default function NewComment({commentDrinkID, barID}) {
    const [comment, setComment] = useState('');
    const [user, setUser] = useContext(UserContext);
    const { userName, userID } = user 

    function handleClick(e) {
      e.preventDefault();
      if (!user) { 
        return (
          alert('Please login to add a comment')
        )}
        if (comment.length < 1) {
          alert ('Please add your comment before submitting')
        }
        else {
      const newCommentKey = push(child(ref(db), '/comments/')).key;
      const updates = {};
      const newComment = {
        commentID: newCommentKey,
        // userName: userName,
        userID: userID,
        drinkID: commentDrinkID,
        barID: barID,
        initialTimeStamp: Date.now(),
        lastTimeStamp: Date.now(),
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
          <Submit handleClick={handleClick} value='add'/>
        </form>
      </>
    );
  }

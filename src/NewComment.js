import React, { useState, useContext } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import { BarContext } from './BarContext.js';
import Submit from './Submit.js';
import Button from './Button.js';



export default function NewComment({
  drinkID
}) {
    const [comment, setComment] = useState('');
    const [commentAlert, setCommentAlert] = useState(false);
    const [user] = useContext(UserContext);
    const { userName, userID } = user;
    const { selectedBar } = useContext(BarContext);
    const [ showAdd, setShowAdd ] = useState(false);

  function handleToggle () {
    setShowAdd(showAdd => !showAdd);
  }

    function handleClick(e) {
      e.preventDefault();
        if (comment.length < 1) {
          return setCommentAlert(true);
        }
        else {
      const newCommentKey = push(child(ref(db), '/comments/')).key;
      const updates = {};
      const newComment = {
        commentID: newCommentKey,
        userID: userID,
        drinkID: drinkID,
        barID: selectedBar.barID,
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
      {!showAdd ?
       <Button className='icon' handleClick={handleToggle}>
       New Comment
     </Button>
      :
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
        <Button handleClick={handleToggle}>
          Nah
        </Button>
        </>
        }
        {commentAlert &&
            <>
            <p>Please add your comment before submitting</p>
            <Button className={null} handleClick={() => setCommentAlert(false)} >
             OK
            </Button> 
            </>
          }
      </>
    );
  }

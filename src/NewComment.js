import React, { useState, useContext, useRef } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import { BarContext } from './BarContext.js';
import Submit from './Submit.js';
import Button from './Button.js';
import SignInModule from './SignInModule.js';



export default function NewComment({
  drinkID,
  users
}) {
    const [comment, setComment] = useState('');
    const [commentAlert, setCommentAlert] = useState(false);
    const [user] = useContext(UserContext);
    const { userName, userID } = user;
    const { selectedBar } = useContext(BarContext);
    const [ showAdd, setShowAdd ] = useState(false);
    const newCommentRef = useRef(null);

  function handleToggle () {
    setShowAdd(showAdd => !showAdd);
  }

  function handleSignInModule () {
    if (!newCommentRef.current.open) {
      newCommentRef.current.showModal(); // open modal
      // setState(true); // hide button
    } 
    else {
      newCommentRef.current.close(); // close modal
      // setState(false); // show button
    }
  }

    function handleClick(e) {
      e.preventDefault();
      if (!user) {
        handleSignInModule ()
      }
        else if (comment.length < 1) {
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
          <SignInModule
            message='Please signin to leave a comment'
            reference={newCommentRef}
            handleModuleToggle={handleSignInModule}
            users={users}
          />
      </>
    );
  }

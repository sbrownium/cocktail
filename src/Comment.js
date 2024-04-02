import React, {useState} from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import EditBox from './EditBox';
import DeleteComment from './DeleteComment.js';


export default function Comment ({ commentDrinkID, index, commentID, timeStamp, text, userName, date, userID, handleToggle, beingEditted}) {
    const [edit, setEdit] = useState(text);
 
    function handleEdit (e) {
        e.preventDefault();
        setEdit(e.target.value);
    }

    function handleClick(e){
      
      const updates = {};
      const newEdit = {
        commentID: commentID,
        userName: userName,
        userID: userID,
        drinkID: commentDrinkID,
        initialTimeStamp: timeStamp,
        lastTimeStamp: performance.timeOrigin,
        text: edit
      };
    e.preventDefault();
    handleToggle(); 
    updates['/comments/' + commentID] = newEdit;
   
    return (
        update(ref(db), updates).then(() => {
            console.log('Data saved successfully!')
      })
      .catch((error) => {
        console.log('problem writing')
      })
    )

    };
return (
        <li key={index} id={commentID}>
            {beingEditted ? 
              <EditBox
                text={text}
                edit={edit}
                handleEdit={handleEdit}
                handleToggle={handleToggle}
                handleClick={handleClick}
              />
              : text }
             &nbsp;
            {beingEditted ? '' : <> ({userName} &mdash; {date})</>}
            <DeleteComment commentID={commentID} handleToggle={handleToggle} beingEditted={beingEditted} />
        </li>
)
};

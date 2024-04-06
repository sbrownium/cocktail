import React, {useState} from 'react';
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import EditBox from './EditBox';
import DeleteButton from './DeleteButton.js';
import Time from './Time.js';


export default function Comment ({ commentDrinkID, index, commentID, initialTimeStamp, text, users, userID, handleToggle, beingEditted}) {
    const [edit, setEdit] = useState(text);
    // const [time, setTime] = useState('');
    const usersArray = Object.values(users);
    const filteredUsers = usersArray.filter(u => u.userID === userID);
    const preferredName = filteredUsers[0].giveName

    function handleEdit (e) {
        e.preventDefault();
        setEdit(e.target.value);
    }
  
    function handleClick(e){
      
      const updates = {};
      const newEdit = {
        commentID: commentID,
        userID: userID,
        drinkID: commentDrinkID,
        initialTimeStamp: initialTimeStamp,
        lastTimeStamp: Date.now(),
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
            <>
              <EditBox
                text={text}
                edit={edit}
                handleEdit={handleEdit}
                handleToggle={handleToggle}
                handleClick={handleClick}
              />
              <DeleteButton
              path='/comments/'
              nodeID={commentID}
              nodeName='your comment'
              handleToggle={handleToggle}
              value='Delete Comment'
            />
            </>
              : text }
             &nbsp;
            {beingEditted ? '' : <> ({preferredName} &mdash; <Time initialTimeStamp={initialTimeStamp}/>)</>}  
        </li>
)
};


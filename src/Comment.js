import React, {useState, useContext} from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import EditIcon from './EditIcon';
import EditBox from './EditBox';
import { UserContext } from './UserContext.js';


export default function Comment ({ commentDrinkID, index, commentID, timeStamp, text, userName, date, userID}) {
    const [user, setUser] = useContext(UserContext);
    const [edit, setEdit] = useState(text);
    const [ beingEditted, setBeingEditted ] = useState(false)
 
    function handleToggle() {
        setBeingEditted(beingEditted => !beingEditted); 
    }

    function handleEdit (e) {
        e.preventDefault();
        setEdit(e.target.value);
    }

    function handleClick(e){
      const newVersionKey = push(child(ref(db), '/commentVersions/')).key;
      const updates = {};
      const newEdit = {
        commentID: commentID,
        userName: userName,
        userID: userID,
        drinkID: commentDrinkID,
        timeStamp: timeStamp,
        text: edit
      };
      const newVersion = {
        commentID: commentID,
        versionID: newVersionKey,
        timeStamp: performance.timeOrigin,
        text: edit
      }
    e.preventDefault();
    handleToggle(); 
    updates['/comments/' + commentID] = newEdit;
    updates['/commentVersions/' + newVersionKey] = newVersion;
   
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
            {beingEditted ? <EditBox text={text} edit={edit} handleEdit={handleEdit} handleToggle={handleToggle} handleClick={handleClick}/> : text }
             &nbsp;
            {beingEditted ? '' : <> ({userName} &mdash; {date})</>}
            {user.userID === userID ? <EditIcon beingEditted={beingEditted} handleToggle={handleToggle}/> : '' }
        </li>
)
};

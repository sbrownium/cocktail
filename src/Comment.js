import React, {useState, useContext} from 'react';
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import EditBox from './EditBox';
import DeleteButton from './DeleteButton.js';
import Time from './Time.js';
import Button from './Button.js';
import { UserContext } from './UserContext.js';

export default function Comment ({
  commentDrinkID,
  filteredComments,
  index,
  // commentID,
  // initialTimeStamp,
  // text,
  userID,
  handleToggle,
  beingEditted,
}) {
    const usersComment = filteredComments.filter(comment => comment.userID === userID)[0]
    const [user] = useContext(UserContext);
    const {barID, commentID, drinkID, initialTimeStamp, lastTimeStamp, text } = usersComment;
    const [edit, setEdit] = useState(text);


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
            {(beingEditted && userID === user.userID) ? 
            <>
                <form>
                  <EditBox
                      id='commentEdit'
                      edit={edit}
                      handleEdit={handleEdit}
                  />
                  <Button
                    handleClick={handleClick}
                    children='Save'
                    className={null}
                  />
                </form>            
              <DeleteButton
              path='/comments/'
              nodeID={commentID}
              nodeName='your comment'
              handleToggle={handleToggle}
              className={null}
              children='Delete Comment'
            />
            </>
              : text }
             &nbsp;
            {!beingEditted && <> (<Time initialTimeStamp={initialTimeStamp}/>)</>}  
        </li>
)
};


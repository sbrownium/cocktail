import React, {useState, useContext, useRef, useEffect} from 'react';
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
    const textareaRef = useRef(null);


    function handleEdit (e) {
        e.preventDefault();
        setEdit(e.target.value);
    }

    useEffect(() => {
     if (textareaRef.current){
        // Reset height to auto to correctly calculate scrollHeight
        textareaRef.current.style.height = 'auto';
        // Set height to scrollHeight to fit content
       textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
     }
    }, [edit]);
  
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
                      className='textEdit'
                      textareaRef={textareaRef}
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


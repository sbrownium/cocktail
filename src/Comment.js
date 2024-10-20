import React, {useState, useContext, useRef, useEffect} from 'react';
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import EditBox from './EditBox';
import DeleteButton from './DeleteButton.js';
import Time from './Time.js';
import Button from './Button.js';
import { UserContext } from './UserContext.js';
import './Comment.css';
import MoreEditMenu from './MoreEditMenu.js';

export default function Comment ({
  commentID,
  drinkID,
  initialTimeStamp,
  text,
  userID,
  index,
  handleToggle,
  beingEditted,
  users
}) {
  const [user] = useContext(UserContext);  
  const usersArray = Object.values(users);
  const filteredUsers = usersArray.filter(u => u.userID === userID);
  const preferredName = filteredUsers[0].preferredName
  const [commentsBeingEditted, setCommentsBeingEditted] = useState(false);
  const [edit, setEdit] = useState(text);
  const textareaRef = useRef(null);


    function handleEdit (e) {
        e.preventDefault();
        setEdit(e.target.value);
    }

    function toggleCommentsBeingEditted (){
      setCommentsBeingEditted(commentsBeingEditted => !commentsBeingEditted)
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
        drinkID: drinkID,
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
            {(commentsBeingEditted && userID === user.userID) ? 
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
              : 
              <div className='commentContainer'>
                <div className='textContainer'>
                  {text}
                </div>
                <div className='timeContainer'>
                  {!beingEditted &&
                    <>
                      {preferredName}
                      <Time initialTimeStamp={initialTimeStamp}/>
                    </>
                  }
                  <MoreEditMenu 
                    deletePath='/comments/'
                    deleteNodeID={commentID}
                    deleteNodeName='your comment'
                    deleteHandleToggle={handleToggle}
                    deleteClassName={null}
                    deleteButtonText='Delete'
                    toggleCommentsBeingEditted={toggleCommentsBeingEditted}
                  />
                </div>
                
            </div>}  
        </li>
       
)
};


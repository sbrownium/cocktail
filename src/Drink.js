import React, {useContext, useState, useEffect} from 'react';
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import CommentList from './CommentList';
import AverageRating from './AverageRating';
import UserRating from './UserRating';
import { UserContext } from './UserContext';
import ArchiveButton from './ArchiveButton';
import Button from './Button';
import EditBox from './EditBox';
import ArchiveOrDeletePopOver from './ArchiveOrDeletePopOver.js'; 


export default function Drink({
  addedBy,
  archived,
  barID,
  beingEditted,
  comments,
  drinkName,
  drinkID,
  drinks,
  description,
  handleToggle,
  initialTimeStamp,
  price,
  ratings,
  users 
 }) {
  
  const [user] = useContext(UserContext);
  const [editDrinkName, setEditDrinkName] = useState(drinkName);
  const [editDrinkDescription, setEditDrinkDescription] = useState(description)
  const [editDrinkPrice, setEditDrinkPrice] = useState(price);
  
  useEffect(() => {
    setEditDrinkName(drinkName);
  }, [drinkName]);

  useEffect(() => {
    setEditDrinkDescription(description);
  }, [description]);

  useEffect(() => {
    setEditDrinkPrice(price);
  }, [price]);

  const emojiLookUp = {
    '🤢': 1,
    '🤷‍♀️': 2,
    '👍': 3,
    '🎉': 4
};
    
function handleDrinkNameEdit (e) {
    e.preventDefault();  
    setEditDrinkName(e.target.value);
}

function handleDrinkDescriptionEdit (e) {
  e.preventDefault();
  setEditDrinkDescription(e.target.value);
}

function handleDrinkPriceEdit (e) {
  e.preventDefault();
  setEditDrinkPrice(e.target.value);
}

function handleNeverMind (e) {
  e.preventDefault();
  resetDrinks();
  handleToggle();
}

function resetDrinks () {
  setEditDrinkName(drinkName);
  setEditDrinkDescription(description);
  setEditDrinkPrice(price);
}

function handleClick(e){
  e.preventDefault();
  const updates = {};
  const newEdit = {
    addedBy,
    archived,
    barID,
    description: editDrinkDescription,
    drinkID,
    drinkName: editDrinkName,
    initialTimeStamp,
    lastTimeStamp: Date.now(),
    price: editDrinkPrice
  };
  resetDrinks();
  handleToggle();
  updates['/drinks/' + drinkID] = newEdit;
return (
    update(ref(db), updates).then(() => {
        console.log('Data saved successfully!')
  })
  .catch((error) => {
    console.log('problem writing')
  })
)
}
    return (
      <>
        {beingEditted ? 
            <>
                <form>
                  <EditBox
                      className={(editDrinkName === '') && 'missing'}
                      id='drinkNameEdit'
                      edit={editDrinkName}
                      handleEdit={handleDrinkNameEdit}
                  />
                  &nbsp;&mdash;&nbsp;
                  <EditBox
                      className={(editDrinkDescription === '') && 'missing'}
                      id='drinkDescriptionEdit'
                      edit={editDrinkDescription}
                      handleEdit={handleDrinkDescriptionEdit}
                  />
                  &nbsp;&mdash;&nbsp;$
                   <EditBox
                      className={(editDrinkPrice === '') && 'missing'}
                      id='drinkPriceEdit'
                      edit={editDrinkPrice}
                      handleEdit={handleDrinkPriceEdit}
                  />
                  {((editDrinkName === '') && (editDrinkDescription === '') && (editDrinkPrice === '')) ? 
                  <ArchiveOrDeletePopOver
                  drinks={drinks}
                  path='/drinks/'
                  nodeID={drinkID}
                  nodeName={drinkName}
                  handleToggle={handleToggle}
                  resetDrinks={resetDrinks}
                  />:
                  <>
                   {((editDrinkName === '') || (editDrinkDescription === '') || (editDrinkPrice === '')) ? 
                    //.missing from NewDrink.css
                    <p className='missing'>Please fill out all the fields to save</p> 
                    :
                 <Button
                    handleClick={handleClick}
                    children='Save'
                    className={null}
                 />
                   }
                   </>}
                   {((editDrinkName !== drinkName) || (editDrinkDescription !== description) || (editDrinkPrice !== price)) &&
                   <button onClick={handleNeverMind}>Never Mind</button>
                  }
               </form> 
             </>   
            :
            <>    
            {drinkName} &mdash;&nbsp;
            {description} &mdash;
            ${Number(price).toFixed(2)}
            </>
            }
            {(user && !{archived}) && // checks for logged in user and that drink is not archived
            <AverageRating
              emojiLookUp={emojiLookUp}
              ratings={ratings}
              ratingDrinkID={drinkID}
            />
          }
           <UserRating 
                emojiLookUp={emojiLookUp}
                ratings={ratings}
                drinkName={drinkName}
                ratingDrinkID={drinkID}
                handleToggle={handleToggle}
                beingEditted={beingEditted}
                barID={barID} 
                />
              {(user && !{archived}) && // checks for logged in user and that drink is not archived
            <>   
            {beingEditted && // checks that it is being editted in addition to user and archived
            <ArchiveButton 
              path={'/drinks/'}
              nodeID={drinkID}
              drinks={Object.values(drinks)}
              nodeName='this drink'
              handleToggle={handleToggle}
              className={null}
              children='Archive Drink'
            />
            }
            </>
           }
            <CommentList
              comments={comments}
              users={users}
              commentDrinkID={drinkID}
              beingEditted={beingEditted}
              handleToggle={handleToggle}
              barID={barID}
              archived={archived}
            />
          </>
      )    
}

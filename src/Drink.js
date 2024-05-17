import React, {useContext, useState} from 'react';
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import CommentList from './CommentList';
import AverageRating from './AverageRating';
import UserRating from './UserRating';
import { UserContext } from './UserContext';
import ArchiveButton from './ArchiveButton';
import Button from './Button';
import EditBox from './EditBox';

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

function handleClick(e){
  const updates = {};
  const newEdit = {
    addedBy: addedBy,
    archived: archived,
    barID: barID,
    description: editDrinkDescription,
    drinkID: drinkID,
    drinkName: editDrinkName,
    initialTimeStamp: initialTimeStamp,
    lastTimeStamp: Date.now(),
    price: editDrinkPrice
  };

if ((editDrinkName !== drinkName) ||
    (editDrinkDescription !== description) ||
    (editDrinkPrice !== price)) {
  e.preventDefault();
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
} else {
  handleToggle(); 
}
}

    return (
      <>
        {beingEditted ? 
            <>
                <form>
                  <EditBox
                      id='drinkNameEdit'
                      edit={editDrinkName}
                      handleEdit={handleDrinkNameEdit}
                  />
                  &nbsp;&mdash;&nbsp;
                  <EditBox
                      id='drinkDescriptionEdit'
                      edit={editDrinkDescription}
                      handleEdit={handleDrinkDescriptionEdit}
                  />
                  &nbsp;&mdash;&nbsp;$
                   <EditBox
                      id='drinkPriceEdit'
                      edit={editDrinkPrice}
                      handleEdit={handleDrinkPriceEdit}
                  />
                 <Button
                    handleClick={handleClick}
                    children='Save'
                    className={null}
                 />
               </form> 
             </>   
            :
            <>    
            {drinkName} &mdash;&nbsp;
            {description} &mdash;
            ${Number(price).toFixed(2)}
            </>
            }
            <AverageRating
              emojiLookUp={emojiLookUp}
              ratings={ratings}
              ratingDrinkID={drinkID}
            />
           {(user && !{archived}) && // checks for logged in user and that drink is not archived
           <>
           <UserRating 
                emojiLookUp={emojiLookUp}
                ratings={ratings}
                drinkName={drinkName}
                ratingDrinkID={drinkID}
                handleToggle={handleToggle}
                beingEditted={beingEditted}
                barID={barID} 
                />
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

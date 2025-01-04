import React, { useContext, useState } from 'react';
import NewComment from './NewComment';
import { UserContext } from './UserContext';
import UserContainer from './UserContainer';
import NewRating from './NewRating';
import Button from './Button';
import UserRating from './UserRating';
import './FeedBackList.css'

export default function FeedbackList({
  comments,
  users,
  drinkID,
  handleToggle,
  beingEditted,
  barID,
  archived,
  ratings,
  emojiLookUp
}) {
  const user = useContext(UserContext);  
  const commentsArray = Object.values(comments || {});
    const filteredComments = commentsArray.filter(comment => comment.drinkID === drinkID);
    const ratingsArray = Object.values(ratings || {});
    const filteredRatings = ratingsArray.filter(rating => rating.drinkID === drinkID);
    const commentAndRatingsArray = filteredComments.concat(filteredRatings);
    const usersArray = filteredComments.concat(filteredRatings);
    const userIDArray = usersArray.map(item => item.userID);
    const uniqueIDs = [...new Set(userIDArray)];
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleExpanded () {
      setIsExpanded(isExpanded => !isExpanded);
    }

  if ((comments === undefined) && (ratings === undefined)) { // checks in case there are no comments or ratings in the entire database
    return (
      <>
        {!beingEditted && 
        <>
            {/* <NewComment
              drinkID={drinkID}
              users={users}
              /> */}
            <NewRating
                emojiLookUp={emojiLookUp}
                handleToggle={handleToggle}
                filterRatings={filteredRatings}
                ratingDrinkID={drinkID}
                beingEditted={beingEditted}
                text='Rate Drink'
            />
        </>
        }
      </>
    );
  } else {
    return (
    <>
    <div className='ratingsView'>
    {uniqueIDs.map((userID, index) => (
     <UserRating
            userID={userID}
            drinkID={drinkID}
            ratingsArray={ratingsArray}
            emojiLookUp={emojiLookUp}
          />
    ))}
    {!isExpanded &&
    <Button className='buttonEmoji' handleClick={toggleExpanded}>
     💬
 </Button>}
    </div>
    
    {isExpanded &&
    <>
      <ul>
        {uniqueIDs.map((userID, index) => (
          <li key={index}>
            <UserContainer
                archived={archived}
                barID={barID}
              commentsArray={commentsArray}
              ratingsArray={ratingsArray}
              filteredComments={filteredComments}
              filteredRatings={filteredRatings}
              drinkID={drinkID}
              userID={userID}
              users={users}
              handleToggle={handleToggle}
              beingEditted={beingEditted}
              emojiLookUp={emojiLookUp}
              isExpanded={isExpanded}
            />
          </li>
        ))}
      </ul>
      <Button className='buttonEmoji' handleClick={toggleExpanded}>
     🙅💬
 </Button>
 </>}
 <NewComment
  drinkID={drinkID}
  users={users}
  setIsExpanded={setIsExpanded}
  />
 </>
    );
  }
};

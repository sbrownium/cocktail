import React, { useContext } from 'react';
import NewComment from './NewComment';
import { UserContext } from './UserContext';
import UserContainer from './UserContainer';

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
  const user = useContext(UserContext);  // Corrected destructuring

  if ((comments === undefined) && (ratings === undefined)) { // checks in case there are no comments or ratings in the entire database
    return (
      <>
        {!beingEditted && <NewComment drinkID={drinkID} />}
      </>
    );
  } else {
    const commentsArray = Object.values(comments || {});
    const filteredComments = commentsArray.filter(comment => comment.drinkID === drinkID);
    const ratingsArray = Object.values(ratings || {});
    const filteredRatings = ratingsArray.filter(rating => rating.drinkID === drinkID);
    const commentAndRatingsArray = filteredComments.concat(filteredRatings);
    const usersArray = filteredComments.concat(filteredRatings);
    const userIDArray = usersArray.map(item => item.userID);
    const uniqueIDs = [...new Set(userIDArray)];

    return (
      <ul>
        {uniqueIDs.map((userID, index) => (
          <li key={index}>
            <UserContainer
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
            />
            {(!beingEditted && user && !archived) && 
              <NewComment drinkID={drinkID} barID={barID} />
            }
          </li>
        ))}
      </ul>
    );
  }
};

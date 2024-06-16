import React, {useContext} from "react";
import Comment from "./Comment";
import UserRating from "./UserRating";
import { UserContext } from "./UserContext";
import NewComment from "./NewComment";

export default function UserContainer ({
    archived,
    barID,
    filteredComments,
    filteredRatings,
    drinkID,
    users,
    userID,
    commentID,
    initialTimeStamp,
    text,
    handleToggle,
    beingEditted,
    ratingsArray,
    emojiLookUp,
    index  
}) {
    const user = useContext(UserContext);  
    const usersArray = Object.values(users);
    const filteredUsers = usersArray.filter(u => u.userID === userID);
    const preferredName = filteredUsers[0].preferredName
    
    return (
        <>
        <div>
        {(filteredRatings.filter(rating => rating.userID === userID).length !== 0) &&    
        <UserRating
            userID={userID}
            drinkID={drinkID}
            ratingsArray={ratingsArray}
            emojiLookUp={emojiLookUp}
          />
        }
        {(filteredComments.filter(comment => comment.userID === userID).length !== 0)  &&    
        <Comment
            filteredComments={filteredComments}
            drinkID={drinkID}
            key={index}
            users={users}
            userID={userID}
            commentID={commentID}
            initialTimeStamp={initialTimeStamp}
            text={text}
            handleToggle={handleToggle}
            beingEditted={beingEditted}
        />
    }
        {(!beingEditted && user && !archived) && 
              <NewComment
                drinkID={drinkID}
                barID={barID}
            />
            }
        {preferredName}
        </div>
        </>   
    )
}
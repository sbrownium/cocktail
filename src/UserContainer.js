import React, {useContext} from "react";
import Comment from "./Comment";
import UserRating from "./UserRating";
import { UserContext } from "./UserContext";
import NewComment from "./NewComment";
import "./UserContainer.css";
import Button from "./Button";

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
    index,
    isExpanded 
}) {
    const [user] = useContext(UserContext);  
    const usersArray = Object.values(users);
    const filteredUsers = usersArray.filter(u => u.userID === userID);
    const preferredName = filteredUsers[0].preferredName
    
    return (
        <>
        {isExpanded ? 
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
        // currently only can only show one comment per user  
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
        {(!beingEditted && !archived && (user.userID === userID)) && 
              <NewComment
                drinkID={drinkID}
                barID={barID}
            />
            }
            {preferredName &&
        preferredName
            }
        </div> :
            <UserRating
            userID={userID}
            drinkID={drinkID}
            ratingsArray={ratingsArray}
            emojiLookUp={emojiLookUp}
        />
            }
            
        </>   
    )
}
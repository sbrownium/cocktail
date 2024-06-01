import React, {useContext} from 'react';
import Comment from './Comment';
import NewComment from './NewComment';
import { UserContext } from './UserContext';

export default function CommentList ({
    comments,
    users,
    commentDrinkID,
    handleToggle,
    beingEditted,
    barID,
    archived
}) {
    const [user] = useContext(UserContext)

    if (comments === undefined) { //checks in case there are no comments in the entire database
        return (
            <>
            {!beingEditted && <NewComment commentDrinkID={commentDrinkID}/>}
            </>
        )
    } else {
    const commentsArray = Object.values(comments);
    const filteredComments = commentsArray.filter(comment => comment.drinkID === commentDrinkID);
return (
    <ul>
        {filteredComments.map(({initialTimeStamp, text, commentID, userID}, index) => {
        // return (
        // <Comment
        //     commentDrinkID={commentDrinkID}
        //     key={index}
        //     users={users}
        //     userID={userID}
        //     commentID={commentID}
        //     initialTimeStamp={initialTimeStamp}
        //     text={text}
        //     handleToggle={handleToggle}
        //     beingEditted={beingEditted}
        // />   
        // )
    }
        )}
        {(!beingEditted && user && !archived) &&
        <NewComment commentDrinkID={commentDrinkID} barID={barID}/>
        }
    </ul>
)
    
}
};

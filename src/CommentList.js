import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';

export default function CommentList ({comments, users, commentDrinkID, handleToggle, beingEditted}) {
    if (comments === undefined) { //checks in case there are no comments in the entire database
        return (
            <>
            {beingEditted ? null : <NewComment commentDrinkID={commentDrinkID}/>}
            </>
        )
    } else {
    const commentsArray = Object.values(comments);
    const filteredComments = commentsArray.filter(comment => comment.drinkID === commentDrinkID);
return (
    <ul>
        {filteredComments.map(({initialTimeStamp, text, commentID, userID}, index) => {
        return (
        <Comment
            commentDrinkID={commentDrinkID}
            key={index}
            users={users}
            userID={userID}
            commentID={commentID}
            initialTimeStamp={initialTimeStamp}
            text={text}
            // time={time}
            // date={date}
            handleToggle={handleToggle}
            beingEditted={beingEditted}
        />   
        )
    }
        )}
        {beingEditted ? '' : <NewComment commentDrinkID={commentDrinkID}/>}
    </ul>
)
    
}
};

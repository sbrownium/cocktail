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
        {filteredComments.map(({timeStamp, text, commentID, userID}, index) => {
        const date = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium'
            // timeStyle: 'short'
          }).format(timeStamp)
        return (
        <Comment
            commentDrinkID={commentDrinkID}
            key={index}
            timeStamp={timeStamp}
            users={users}
            userID={userID}
            commentID={commentID}
            text={text}
            date={date}
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

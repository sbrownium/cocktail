import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';



export default function CommentList ({comments, commentDrinkID}) {
    const commentsArray = Object.values(comments);
    const filteredComments = commentsArray.filter(comment => comment.drinkID === commentDrinkID);
return (
    <ul>
        {filteredComments.map(({userName, timeStamp, text, commentID, userID}, index) => {
        const date = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium'
            // timeStyle: 'short'
          }).format(timeStamp)
        return (
        <Comment commentDrinkID={commentDrinkID} key={index} timeStamp={timeStamp} userID={userID} commentID={commentID} text={text} userName={userName} date={date}/>   
        )
    }
        )}
        <NewComment commentDrinkID={commentDrinkID}/>
    </ul>
)
};

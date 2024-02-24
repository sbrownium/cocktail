import React from 'react';
import NewComment from './NewComment';

export default function Comment ({comments, commentDrinkID}) {
    const commentsArray = Object.values(comments);
    const filteredComments = commentsArray.filter(comment => comment.drinkID === commentDrinkID);
return (
    <ul>
        {filteredComments.map(({userName, timeStamp, text}, index) => {
        const date = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          }).format(timeStamp);
        return (
        <li key={index}>
                {text} &nbsp;
                ({userName} &mdash;&nbsp;
                {date})
        </li>
        )}
        )}
        <NewComment commentDrinkID={commentDrinkID}/>
    </ul>
)
};

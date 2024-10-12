import React from "react";
import Comment from "./Comment";

export default function CommentList ({
        comments,
        drinkID,
        handleToggle,
        beingEditted
    }) {
    const commentsArray = Object.values(comments || {});
    const filteredComments = commentsArray.filter(comments => comments.drinkID === drinkID);

    return (
        <ul>
            {filteredComments.map(({commentID, initialTimeStamp, text, userID}, index) => (
                <Comment
                    commentID={commentID}
                    drinkID={drinkID}
                    initialTimeStamp={initialTimeStamp}
                    text={text}
                    userID={userID}
                    index={index}
                    handleToggle={handleToggle}
                    beingEditted={beingEditted}
                />
            ))}
    </ul>
    )
}
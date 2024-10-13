import React, { useState } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";
import Button from "./Button";
import "./CommentList.css";

export default function CommentList ({
        comments,
        drinkID,
        handleToggle,
        beingEditted,
        users
    }) {
    const commentsArray = Object.values(comments || {});
    const filteredComments = commentsArray.filter(comments => comments.drinkID === drinkID);
    const [ isExpanded, setIsExpanded ] = useState(false);

    function toggleExpanded () {
        setIsExpanded(isExpanded => !isExpanded);
    }

    return (
        <>
            {isExpanded ?
                <>
                <Button className='buttonEmoji' handleClick={toggleExpanded}>
                comments 🙈
                </Button>
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
                            users={users}
                        />
                    ))}
            </ul>
            <NewComment
                drinkID={drinkID}
                users={users}
                setIsExpanded={setIsExpanded}
            />
            </> :
            <Button className='buttonEmoji' handleClick={toggleExpanded}>
                comments 🐵
            </Button>
            }
            
    </>
    )
}
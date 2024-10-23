import React, { useState, useContext } from "react";
import Button from "./Button";
import XIcon from "./XIcon";
import DeleteButton from "./DeleteButton";
import { UserContext } from "./UserContext";
import "./MoreEditMenu.css";


export default function MoreEditMenu ({
    deletePath,
    deleteNodeID,
    deleteNodeName,
    deleteHandleToggle,
    deleteClassName,
    deleteButtonText,
    toggleCommentsBeingEditted,
    userID
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [user] = useContext(UserContext);

    function toggleExpand () {
        setIsExpanded(isExpanded => !isExpanded);
    }
    return (
        <div
            className='moreSelectionsContainer comments'
        > 
            {isExpanded &&
             <div
                className='commentsButtonsHolder expanded'
            > 
                {!user ? 
                    <>
                        <Button className='disabled' aria-disabled="true">Delete</Button>
                        <Button className='disabled' aria-disabled="true">Edit</Button>
                    </>
                :
                <>
                    <DeleteButton
                        path={deletePath}
                        nodeID={deleteNodeID}
                        nodeName={deleteNodeName}
                        handleToggle={deleteHandleToggle}
                        className={deleteClassName}
                        buttonText={deleteButtonText}
                    />
                    <Button 
                        handleClick={toggleCommentsBeingEditted}
                        className='textButton'
                    >
                        Edit
                    </Button>
                </> // End !user
                }
            </div> // End isExpanded
            } 

             <Button
                className={!isExpanded ? 'menuButtonContainer comments' : 'expanded menuButtonContainer comments'}
                // If there is a user logged in, but not the owner of the comment
                // disable click handler
                handleClick={(user && (userID !== user.userID)) ? null : toggleExpand}
                // update aria
                aria-disabled={(user && (userID !== user.userID)) && "true"}
            >
            {!isExpanded ?
                // add disabled class
                <div className={(user && (userID !== user.userID)) ? "disabled dotHolder" : "dotHolder"}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                :
                <XIcon
                    height='1.25em'
                    fillColor='#303030'
                />
            }
            </Button>
        </div> 
    )
}
import React, { useState, useContext } from "react";
import Button from "./Button";
import XIcon from "./XIcon";
import MoreEditButton from "./MoreEditButton";
import { UserContext } from "./UserContext";
import "./MoreEditMenu.css";


export default function MoreEditMenu ({
    path,
    nodeID,
    toggleCommentsBeingEditted,
    userID,
    reference,
    arrayOfThings
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
                        {(arrayOfThings !== null) &&
                        <Button className='disabled' aria-disabled="true">Archive</Button>
                        }
                    </>
                :
                <>
                    <MoreEditButton // Delete Button
                        path={path}
                        nodeID={nodeID}
                        toggleExpand={toggleExpand}
                        reference={reference}
                    />
                     {(arrayOfThings !== null) &&
                    <MoreEditButton // Archive Button
                        path={path}
                        nodeID={nodeID}
                        toggleExpand={toggleExpand}
                        reference={reference}
                        arrayOfThings={arrayOfThings} // only for Archive
                    />}
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
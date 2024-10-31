import React, { useState, useContext } from "react";
import Button from "./Button";
import XIcon from "./XIcon";
import MoreOptionsButton from "./MoreOptionsButton";
import { UserContext } from "./UserContext";
import "./MoreOptionsMenu.css";


export default function MoreOptionsMenu ({
    path,
    nodeID,
    toggleBeingEditted,
    userID,
    reference,
    categoryObject,
    className
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [user] = useContext(UserContext);

    function toggleExpand () {
        setIsExpanded(isExpanded => !isExpanded);
    }
    return (
        <div
            className={`${className} moreSelectionsContainer`}
        > 
            {isExpanded &&
             <div
                className='moreOptionsButtonHolder expanded'
            > 
                {!user ? 
                    <>
                        <Button className='disabled' aria-disabled="true">Delete</Button>
                        <Button className='disabled' aria-disabled="true">Edit</Button>
                        {(categoryObject !== null) &&
                        <Button className='disabled' aria-disabled="true">Archive</Button>
                        }
                    </>
                :
                <>
                    <MoreOptionsButton // Delete Button
                        path={path}
                        nodeID={nodeID}
                        toggleExpand={toggleExpand}
                        reference={reference}
                    />
                     {(categoryObject !== null) &&
                    <MoreOptionsButton // Archive Button
                        path={path}
                        nodeID={nodeID}
                        toggleExpand={toggleExpand}
                        reference={reference}
                        categoryObject={categoryObject} // only for Archive
                    />}
                    <Button 
                        handleClick={toggleBeingEditted}
                        className='textButton'
                    >
                        Edit
                    </Button>
                </> // End !user
                }
            </div> // End isExpanded
            } 

             <Button
                className={!isExpanded ? `menuButtonContainer ${className}` : `menuButtonContainer expanded ${className}`}
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
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
    className,
    archived
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [user] = useContext(UserContext);

   const anothersComment = () => {
        if ((path === '/comments/') && user && (userID !== user.userID)) {
            return true;
        } else {
            return false;
        }
    };
       
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
                        {(path !== '/bars/') && // no delete button on bars
                            <Button className='disabled' aria-disabled="true">Delete</Button>
                        }
                        <Button className='disabled' aria-disabled="true">Edit</Button>
                        {(categoryObject !== null) && // no archive button on comments
                            <Button className='disabled' aria-disabled="true">{archived ? 'Unarchive':'Archive'}</Button>
                        }
                    </>
                :
                <>
                {(path !== '/bars/') && // no delete button on bars
                    <MoreOptionsButton // Delete Button
                        path={path}
                        nodeID={nodeID}
                        toggleExpand={toggleExpand}
                        reference={reference}
                    /> }
                     {(categoryObject !== null) && // no archive button on comments
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
            //  ${className} is a prop, .expanded from state, .unarchived from database
             className={`menuButtonContainer ${className} ${isExpanded && 'expanded'} ${archived && 'unarchived'}`}
                // If there is a user logged in, but not the owner of the comment:
                // disable click handler and
                handleClick={anothersComment() ? null : toggleExpand}
                // update aria
                aria-disabled={anothersComment() && "true"}
            >
            {!isExpanded ?
                // add disabled class when there is a user, but not the owner 
                <div className={`${anothersComment() && 'disabled'} dotHolder`}>
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
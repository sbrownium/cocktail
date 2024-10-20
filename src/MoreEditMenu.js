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
    toggleCommentsBeingEditted
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
                    <Button handleClick={toggleCommentsBeingEditted}>
                        Edit
                    </Button>
                </> // End !user
                }
            </div> // End isExpanded
            } 
             <Button
                className={!isExpanded ? 'menuButtonContainer comments' : 'expanded menuButtonContainer comments'}
                handleClick={toggleExpand}
            >
            {!isExpanded ?
                <div className="dotHolder">
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

{/* <>
<div
    className='moreSelectionsContainer'
>  

    <div className={!moreSelected ? "moreButtonsHolder": "moreButtonsHolder expanded"}>
        <a href="https://github.com/sbrownium/cocktail">
            <GitHub width='24.5px' height='24px' fillColor='black'/>
        </a>
        <a href="https://linkedin.com/in/sbrownium">
            <LinkedIn width='24.5px' height='24px' fillColor='#2867B2'/>
        </a>
    </div>
    <Button
    handleClick={handleMoreSelectedToggle}
    className="menuButtonContainer"
>
    {!moreSelected ? 
    <div className="dotHolder">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
    </div> :
    <XIcon
        height='1.25em'
        fillColor='#303030'
    />}
</Button>
</div>
</> */}
import React, { useContext, useState } from "react";
import { UserContext } from './UserContext.js';
import './UserRating.css'
import Button from "./Button.js";


export default function UserRating ({
    userID,
    rating,
    emojiLookUp,
    index,
    users
}) {
    const [user] = useContext(UserContext);
    const usersArray = Object.values(users);
    const filteredUsers = usersArray.filter(u => u.userID === userID);
    const preferredName = filteredUsers[0].preferredName
    const [ showName, setShowName ] = useState(false)
    const emojiKeys = Object.keys(emojiLookUp);
    const ratingToEmoji = emojiKeys.find(key => emojiLookUp[key] === rating);

    function toggleShowName () {
        setShowName(showName => !showName);
    }
    
    return (
        <li key={index} className='emoji'>
            <Button className='remove' handleClick={toggleShowName}>
                {showName ?
                    <p>{preferredName}</p>
                    :
                    <p>&nbsp;</p>
                }
                <p className={(user.userID === userID) ? 'myRating emojiRating' : 'emojiRating'}>{ratingToEmoji}</p>
            </Button>
        </li>
    ) 
}
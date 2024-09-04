import React, {useContext} from "react";
import { UserContext } from './UserContext.js';
import './UserRating.css'


export default function UserRating ({
    userID,
    drinkID,
    ratingsArray,
    emojiLookUp
}) {
    const [user] = useContext(UserContext);
    // const { userID } = user; 
    const filterRatings = ratingsArray.filter(rating => rating.userID === userID).filter(rating => rating.drinkID === drinkID);
    
    if (filterRatings.length !== 0) {
    // const ratingID = filterRatings[0].ratingID;
    const emojiKeys = Object.keys(emojiLookUp);
    const ratingToEmoji = emojiKeys.find(key => emojiLookUp[key] === filterRatings[0].rating);
    
    return (
        <span className={filterRatings[0].userID === user.userID ? 'emoji myRating' : 'emoji'}>{ratingToEmoji}</span>
    ) 
    }
}
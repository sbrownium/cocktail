import React from "react";

export default function UserRating ({
    userID,
    drinkID,
    ratingsArray,
    emojiLookUp
}) {

    const filterRatings = ratingsArray.filter(rating => rating.userID === userID).filter(rating => rating.drinkID === drinkID);
    
    if (filterRatings.length !== 0) {
    // const ratingID = filterRatings[0].ratingID;
    const emojiKeys = Object.keys(emojiLookUp);
    const ratingToEmoji = emojiKeys.find(key => emojiLookUp[key] === filterRatings[0].rating);
    return (
        <span className='emoji'>{ratingToEmoji}</span>
    )
    }
}
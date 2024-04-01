import React, {useContext, useState} from "react";
import { UserContext } from './UserContext.js';
import NewRating from "./NewRating.js";
import PencilIcon from "./PencilIcon.js";


export default function UserRating ({emojiLookUp, ratings, drinkName, ratingDrinkID, handleToggle, beingEditted}) {
    
    const [user, setUser] = useContext(UserContext);
    const { userName, userID } = user 
    const ratingsArray = Object.values(ratings);
    const filterRatings = ratingsArray.filter(rating => rating.userID === userID).filter(rating => rating.drinkID === ratingDrinkID);

    
    if (filterRatings.length != 0) {
    const emojiKeys = Object.keys(emojiLookUp);
    const ratingToEmoji = emojiKeys.find(key => emojiLookUp[key] === filterRatings[0].rating);
    return (
        <>
            {beingEditted ?
            <>
             <NewRating
                emojiLookUp={emojiLookUp}
                handleToggle={handleToggle}
                filterRatings={filterRatings}
                ratingDrinkID={ratingDrinkID}
                beingEditted={beingEditted}
                text='Change Rating '
            />
            </> :
            <>
            Your Rating: <span className='emoji'>{ratingToEmoji}</span>
            {/* <button className='edit' onClick={handleToggle}>
                <PencilIcon fillColor='black' width='16' heigth='16'/>
            </button> */}
            {/* <button onClick={handleToggle}>Never Mind</button> */}
            </> }
        </>
    )
}
    else {
        return(
            <>
            <NewRating
                emojiLookUp={emojiLookUp}
                ratings={ratings}
                drinkName={drinkName}
                filterRatings={filterRatings}
                ratingDrinkID={ratingDrinkID}
                beingEditted={beingEditted}
                text='New Rating '
            />
            </>
        )
    }
}
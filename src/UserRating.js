import React, {useContext} from "react";
import { UserContext } from './UserContext.js';
import NewRating from "./NewRating.js";


export default function UserRating ({emojiLookUp, ratings, drinkName, ratingDrinkID}) {
    const [user, setUser] = useContext(UserContext);
    const { userName, userID } = user 
    const ratingsArray = Object.values(ratings);
    const filterRatings = ratingsArray.filter(rating => rating.userID === userID).filter(rating => rating.drinkID === ratingDrinkID);
    
    if (filterRatings.length != 0) {
    const emojiKeys = Object.keys(emojiLookUp);
    const ratingToEmoji = emojiKeys.find(key => emojiLookUp[key] === filterRatings[0].rating);
    return (
        <>
            <p>Your Rating: <span className='emoji'>{ratingToEmoji}</span></p>
        </>
    )
}
    else {
        return(
            <>
            <NewRating emojiLookUp={emojiLookUp} ratings={ratings} drinkName={drinkName} ratingDrinkID={ratingDrinkID}/>
            </>
        )
    }
}
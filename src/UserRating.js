import React, { useContext } from "react";
import { UserContext } from './UserContext.js';
import NewRating from "./NewRating.js";
import DeleteButton from "./DeleteButton.js";


export default function UserRating ({
    emojiLookUp,
    ratings,
    drinkName,
    ratingDrinkID,
    handleToggle,
    beingEditted,
    barID
}) {
    const [user] = useContext(UserContext);
    const { userID } = user 
    const ratingsArray = Object.values(ratings);
    const filterRatings = ratingsArray.filter(rating => rating.userID === userID).filter(rating => rating.drinkID === ratingDrinkID);
    
    if (filterRatings.length != 0) {
    const ratingID = filterRatings[0].ratingID;
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
                <DeleteButton
                    path='/ratings/'
                    nodeID={ratingID}
                    nodeName={ratingToEmoji}
                    handleToggle={handleToggle}
                    children='Delete Rating'
                />
            </>
             :
            <>
            Your Rating: <span className='emoji'>{ratingToEmoji}</span>
            </> }
        </>
    )
}
    else {
        return(
            <>
            {user &&
            <NewRating
                emojiLookUp={emojiLookUp}
                ratings={ratings}
                drinkName={drinkName}
                filterRatings={filterRatings}
                ratingDrinkID={ratingDrinkID}
                beingEditted={beingEditted}
                barID={barID}
                text='New Rating'
            />}
            </>
        )
    }
}
import React from "react";
import UserRating from "./UserRating";
import "./RatingsList.css";

export default function RatingsList ({
    drinkID,
    emojiLookUp,
    ratings,
    users
}) {
    const ratingsArray = Object.values(ratings || {});
    const filteredRatings = ratingsArray.filter(rating => rating.drinkID === drinkID)

    return (
        <ul className="ratingsList">
            {filteredRatings.map(({userID, rating}, index) => (
                <UserRating
                    userID={userID}
                    drinkID={drinkID}
                    rating={rating}
                    ratingsArray={ratingsArray}
                    emojiLookUp={emojiLookUp}
                    users={users}
                    index={index}
                    />
                ))}
        </ul>
    )
}
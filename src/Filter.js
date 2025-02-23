import React, {useContext} from "react";
import Input from "./Input";
import { UserContext } from "./app/UserContext";

export default function Filter ({
    filterChecked,
    handleFilterChange,
    comments,
    barID
    }) {
    const [user] = useContext(UserContext);
    const { userID } = user 
    const commentsArray = Object.values(comments);
    const filteredComments = commentsArray.filter(comment => comment.barID === barID).filter(comment => comment.userID === userID); 
    
    // const ratingsArray = Object.values(ratings);
    // const filteredRatings = ratingsArray.filter(rating => rating.barID === barID).filter(rating => rating.userID === userID);
    return (
        <form>
            <fieldset>
                <legend>Filter by:</legend>
                <Input
                    inputName='filter'
                    type='checkbox'
                    value='Only Top Rated'
                    handleChange={handleFilterChange}
                    checked={filterChecked.topRated}
                />
                <Input
                    inputName='filter'
                    type='checkbox'
                    value='With Comments'
                    handleChange={handleFilterChange}
                    checked={filterChecked.withComments}
                />
                {user && // determines if a user is logged in
                <>
                <Input
                    inputName='filter'
                    type='checkbox'
                    value='My Top Rated'
                    handleChange={handleFilterChange}
                    checked={filterChecked.myTop}
                />
                {(filteredComments.length > 0) &&
                <Input
                    inputName='filter'
                    type='checkbox'
                    value='My Comments'
                    handleChange={handleFilterChange}
                    checked={filterChecked.myComments}
                />
                }
                </>
                }
            </fieldset>
        </form>
    )
}
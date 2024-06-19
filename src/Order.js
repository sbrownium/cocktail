import React, {useContext} from "react";
import Input from "./Input";
import { UserContext } from "./UserContext";

export default function Order ({checked, handleChange, ratings, barID}) {
    const [user] = useContext(UserContext);
    const ratingsArray = Object.values(ratings);
    const filteredRatings = ratingsArray.filter(rating => rating.barID === barID);

    return (
        <form>
            <fieldset>
                <legend>Arrange drinks by:</legend>
                <Input
                    inputName='arrange'
                    type='radio'
                    value='Date Added'
                    handleChange={handleChange}
                    checked={checked}
                />
                   <Input
                    inputName='arrange'
                    type='radio'
                    value='Alphabetical'
                    handleChange={handleChange}
                    checked={checked}
                />
                {(filteredRatings.length > 0) && // determines if there are any drink ratings for this bar
                <>
                 <Input
                    inputName='arrange'
                    type='radio'
                    value='Highest Average Rating'
                    handleChange={handleChange}
                    checked={checked}
                />
                <Input
                    inputName='arrange'
                    type='radio'
                    value='Lowest Average Rating'
                    handleChange={handleChange}
                    checked={checked}
                />
                {user && // determines if a user is logged in
                <>
                <Input
                    inputName='arrange'
                    type='radio'
                    value='My Highest Rating'
                    handleChange={handleChange}
                    checked={checked}
                /> 
                <Input
                    inputName='arrange'
                    type='radio'
                    value='My Lowest Rating'
                    handleChange={handleChange}
                    checked={checked}
                />
                </>}
                </>
                }
            </fieldset>
        </form>
    )
}



import React, {useContext, useState} from "react";
import Input from "./Input";
import { UserContext } from "./UserContext";

export default function Order ({checked, handleChange, ratings, barID, thisBarsDrinks}) {
    const [user] = useContext(UserContext);
    const [ hasRatings, setHasRatings ] = useState(false);
    const ratingsArray = Object.values(ratings);
//   const filteredRatings = ratingsArray.filter(rating => rating.drinkID === filteredBars.includes(barID).includes(rating.drinkID));
// const logicTest = filteredBars.includes(barID).includes(drinkID);    
// if (thisBarsDrinks)
// const filteredRatings = ratingsArray.filter(drink => drink.drinkID === ratingDrinkID);
// const filteredRatings = ratingsArray.filter(rating => rating.drinkID === barID)
// const filteredRatings = ratingsArray.filter(drink => drink.drinkID === thisBarsDrinks.filter(drink => drink.drinkID)); 
// const filteredRatings = ratingsArray.filter(drink => drink.drinkID === thisBarsDrinks.includes(drinkID)); 
    
// thisBarsDrinks.filter(b => b.drinkID === 
//     "f07f465a-520b-4bb6-b509-3ca83e66f95e")
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
                {/* {hasRating && */}
                {/* {(filteredRatings.length !== 0) && */}
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
                {user && 
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
                {/* } */}
            </fieldset>
        </form>
    )
}



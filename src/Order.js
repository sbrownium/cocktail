import React, {useContext} from "react";
import Input from "./Input";
import { UserContext } from "./UserContext";

export default function Order ({checked, handleChange, hasRating}) {
    const [user, setUser] = useContext(UserContext);
    
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
                {hasRating &&
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
                </>}
            </fieldset>
        </form>
    )
}



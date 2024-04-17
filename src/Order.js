import React, {useContext} from "react";
import RadioButton from "./RadioButton";
import { UserContext } from "./UserContext";

export default function Order ({checked, handleChange}) {
    const [user, setUser] = useContext(UserContext);
    return (
        <form>
            <fieldset>
                <legend>Arrange drinks by:</legend>
                <RadioButton
                    radioName='arrange'
                    value='Date Added'
                    handleChange={handleChange}
                    checked={checked}
                />
                  <RadioButton
                    radioName='arrange'
                    value='Alphabetical'
                    handleChange={handleChange}
                    checked={checked}
                />
                <RadioButton
                    radioName='arrange'
                    value='Highest Average Rating'
                    handleChange={handleChange}
                    checked={checked}
                />
                <RadioButton
                    radioName='arrange'
                    value='Lowest Average Rating'
                    handleChange={handleChange}
                    checked={checked}
                />
                {user && 
                <>
                <RadioButton
                    radioName='arrange'
                    value='My Highest Rating'
                    handleChange={handleChange}
                    checked={checked}
                /> 
                <RadioButton
                    radioName='arrange'
                    value='My Lowest Rating'
                    handleChange={handleChange}
                    checked={checked}
                />
                </>}
            </fieldset>
        </form>
    )
}



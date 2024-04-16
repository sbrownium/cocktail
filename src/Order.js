import React from "react";
import RadioButton from "./RadioButton";

export default function Order ({checked, handleChange}) {
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
            </fieldset>
        </form>
    )
}



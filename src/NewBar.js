import React, {useState} from "react";

export default function NewBar ({newDrink, handleNewBar}) {
    if (newDrink.barID === 'new') {
    return (
        <>
            <label for='newBar'>New Bar Name</label>
            <input
              id='newBar'
              type="text"
              value={newDrink.barName}
              onChange={handleNewBar}
            />
        </>
    )
}};
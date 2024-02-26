import React, {useState} from "react";

export default function NewBar ({bars, newDrink, handleNewBar, isNew}) {
    // const barsArray = Object.values(bars);
    // const findBar = barsArray.find(ID => ID.barID === newDrink.barID);
    // const filteredBars = barsArray.filter(ID => ID.barID === newDrink.barID)
    // if (isNew) {
    if (newDrink.isNewBar) {    
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
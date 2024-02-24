import React, { useState } from 'react';


export default function BarSelector({bars, newDrink, handleExistingBar}) {
    const barsArray = Object.values(bars);
    const uniqueBars = new Set();
    // const findBarName = barsArray.find(({barID}) => barID === selectedBar)
    // const barIDToBarName = barIDToObject.barName
      return (
        <>
          <label for='barSelect'>Bar</label>
          <select name='barSelect' 
          value={newDrink.barID} 
          onChange={handleExistingBar}>
            <option value=''>Please choose a bar</option> 
            {barsArray.map(({ barName, barID }, index) => {
              if (!uniqueBars.has(barID)) {
                uniqueBars.add(barID);
                return (
                  <option key={index} dataID={barID} value={barID}>{barName}</option>
                )
              }})}
            <option value='new'>New</option>
            </select>
            </>
      )
};
import React from 'react';
import './BarSelector.css';

export default function BarSelector({bars, newDrink, handleExistingBar}) {
    const barsArray = Object.values(bars);
    const uniqueBars = new Set();
      return (
        <>
          <label>Bar
          <select name='barSelect' 
          value={newDrink.barID} 
          onChange={handleExistingBar}>
            <option value='Please choose a bar'>Please choose a bar</option> 
            {barsArray.map(({ barName, barID }, index) => {
              if (!uniqueBars.has(barID)) {
                uniqueBars.add(barID);
                return (
                  <option key={index} data-value={barID} value={barID}>{barName}</option>
                )
              }})}
            <option isNew={true} className='new' value='new'>New</option>
            </select>
            </label>
            </>
      )
};
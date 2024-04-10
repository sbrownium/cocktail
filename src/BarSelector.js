import React from 'react';
import './BarSelector.css';

export default function BarSelector({bars, newDrink, validation, handleExistingBar, focusSelector, defaultBar}) {
    const barsArray = Object.values(bars);
    const uniqueBars = new Set();
      return (
        <>
          <label>Bar
          <select name='barSelect'
          defaultValue={defaultBar} 
          className={validation.needsBarID ? 'missing' : null }
          value={newDrink.barID} 
          onChange={handleExistingBar}
          onFocus={focusSelector}>
            {/* <option value='Please choose a bar'>Please choose a bar</option>  */}
            {barsArray.map(({ barName, barID }, index) => {
              if (!uniqueBars.has(barID)) {
                uniqueBars.add(barID);
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }})}
            <option isNew={true} className='new' value='new'>New</option>
            {/* not sure what isNew does <option isNew={true} className='new' value='new'>New</option> */} 
            </select>
            </label>
            </>
      )
};
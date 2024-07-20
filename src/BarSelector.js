import React from 'react';
import './BarSelector.css';

export default function BarSelector({
  bars,
  newDrink,
  validation,
  handleExistingBar,
  focusSelector,
  defaultBarID,
  defaultBarName
}) {
    const barsArray = Object.values(bars);
    const uniqueBars = new Set();
    uniqueBars.add(defaultBarID);
      return (
        <>
          <label>Bar
          <select name='barSelect'
          defaultValue={defaultBarID} 
          className={validation.needsBarID ? 'missing' : null }
          value={newDrink.barID} 
          onChange={handleExistingBar}
          onFocus={focusSelector}>
            <option key='0' value={defaultBarID}>{defaultBarName}</option>
            {barsArray.map(({ barName, barID }, index) => {
              if (!uniqueBars.has(barID)) {
                uniqueBars.add(barID);  
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
              })}
            <option isNew={true} className='new' value='new'>New</option>
            </select>
            </label>
            </>
      )
};

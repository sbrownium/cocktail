import React from 'react';
import './BarSelector.css';

export default function BarSelector({bars, newDrink, validation, handleExistingBar, focusSelector, defaultBar}) {
    const barsArray = Object.values(bars);
    const defaultBarObj = barsArray.filter((ID) => ID.barID === defaultBar);
    const defaultBarName = defaultBarObj[0].barName;
    const uniqueBars = new Set();
    uniqueBars.add(defaultBar);
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
            <option key='0' value={defaultBar}>{defaultBarName}</option>
            {barsArray.map(({ barName, barID }, index) => {
              if (!uniqueBars.has(barID)) {
                uniqueBars.add(barID);  
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
              })}
            <option isNew={true} className='new' value='new'>New</option>
            {/* not sure what isNew does <option isNew={true} className='new' value='new'>New</option> */} 
            </select>
            </label>
            </>
      )
};
// else if (defaultBar === uniqueBars.has(barID)) {
//   return (
//     <option key={index} defaultValue={barID}>{barName}</option>
//   )
// }

// {barsArray.map(({ barName, barID }, index) => {
//   if (!uniqueBars.has(barID) && barID === defaultBar) {
//     uniqueBars.add(barID);  
//     return (
//       <option key={index}  value={barID} defaultValue={barID}>'Default'</option>
//     )
//   }
//   if (!uniqueBars.has(barID) && barID !== defaultBar) {
//     uniqueBars.add(barID);  
//     return (
//       <option key={index} value={barID}>{barName}</option>
//     )
//   }
//   })}
import React from "react";



export default function ChangeBar ({bars, handleSelect}) {
   
    const barsArray = Object.values(bars);
    // const uniqueBars = new Set();
    
      return (
        <>
          <label>Bar
          <select name='barSelect'
          onChange={handleSelect}
          >
            <option value='Please choose a bar'>Please choose a bar</option> 
            {barsArray.map(({ barName, barID }, index) => {
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
            )
              }
            </select>
            </label>
         </>
      )
};

    
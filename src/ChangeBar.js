import React from "react";



export default function ChangeBar ({bars, handleSelect}) {
   
    const barsArray = Object.values(bars);
    // const uniqueBars = new Set();
    
      return (
        <>
          <label>Pick a bar, any bar
          <select name='barSelect'
          onChange={handleSelect}
          >
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

    
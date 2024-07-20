import React, { useMemo } from "react";

export default function ChangeBar ({
  barsArray,
  handleSelect,
  selectedBar,
  showingBar
}) {
  
  if(showingBar){ // once a bar has been selected
      return (
        <>
          <select name='barSelect'
            onChange={handleSelect}
            value={selectedBar}
          >
            <option value='Pick a bar, any bar'>Pick a bar, any bar</option>
            {barsArray.map(({ barName, barID }, index) => {
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
            )
              }
            </select>
         </>
      )
    } else { // before a bar has been selected or if an archived bar is selected and toggling archive
      return (
        <>
          <select name='barSelect'
            onChange={handleSelect}
          >
            <option value='Pick a bar, any bar'>Pick a bar, any bar</option>
            {barsArray.map(({ barName, barID }, index) => {
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
            )
              }
            </select>
         </>
      )
    }
};

    
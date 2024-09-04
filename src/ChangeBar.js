import React from "react";
import './ChangeBar.css'

export default function ChangeBar ({
  barsArray,
  handleSelect,
  selectedBar,
  showingBar,
  showBarArchive
}) {
  
  if(showingBar){ // once a bar has been selected
      return (
          <select name='barSelect'
             // className={showBarArchive ? 'changeBars border-3' : 'changeBars'}
            className={showBarArchive && 'border-3'}
            onChange={handleSelect}
            value={selectedBar}
          >
            <option value={!showBarArchive ? 'Current Bars' : 'All Bars'}>{!showBarArchive ? 'Current Bars' : 'All Bars'}</option> 
            {/* <option value='Pick a bar, any bar'>Pick a bar, any bar</option> */}
            {barsArray.map(({ barName, barID }, index) => {
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
            )
              }
            </select>
      )
    } else { // before a bar has been selected or if an archived bar is selected and toggling archive
      return (
          <select name='barSelect'
          // className={showBarArchive ? 'changeBars border-3' : 'changeBars'}
          className={showBarArchive && 'border-3'}
            onChange={handleSelect}
          >
            <option value={!showBarArchive ? 'Current Bars' : 'All Bars'}>{!showBarArchive ? 'Current Bars' : 'All Bars'}</option>  
            {barsArray.map(({ barName, barID }, index) => {
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
            )
              }
            </select>  
      )
    }
};

    
import React, {useContext} from "react";
import './ChangeBar.css'
import { BarContext } from "./BarContext";

export default function ChangeBar ({
  barsArray,
  handleSelect,
  showingBar,
  showBarArchive
}) {
  const { selectedBar } = useContext(BarContext)
  
  // once a bar has been selected
      return (
          <select name='barSelect'
            className={showBarArchive && 'border-3'}
            onChange={handleSelect}
            defaultValue={showingBar && selectedBar.barID}
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
};

    
import React from "react";

export default function ChangeBar ({barsArray, handleSelect}) {
      return (
        <>
          <select name='barSelect'
          onChange={handleSelect}
          >
            <option value="Pick a bar, any bar">Pick a bar, any bar</option>
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
};

    
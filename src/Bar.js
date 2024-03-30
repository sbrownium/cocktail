import React from 'react';
import Drink from './Drink.js'

export default function Bar({bars, drinks, comments, ratings}) {
  const barsArray = Object.values(bars);
  
    return (
      <ul>
        {barsArray.map(({ barName, barID }, index) => {
            return (
              <li key={index}>
                 <h1>{barName}</h1>
                <Drink barID={barID} barsArray={barsArray} drinks={drinks} comments={comments} ratings={ratings}/>
              </li>
            );
          })}
      </ul>
    );
  }
  
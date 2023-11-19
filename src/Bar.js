import React from 'react';
import drinks from './Data.js';
import Drink from './Drink.js'

export default function Bar() {
    const uniqueBars = new Set();
    return (
      <ul>
        {drinks.map(({ bar }, index) => {
          if (!uniqueBars.has(bar)) {
            uniqueBars.add(bar);
            return (
              <li key={index}>
                {bar}
              </li>
            );
          }
        })}
      </ul>
    );
  }
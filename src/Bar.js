import React from 'react';
// import drinks from './Data.js';
import Drink from './Drink.js'

export default function Bar({drinks}) {
  const uniqueBars = new Set();

  return (
    <ul>
      {drinks.map(({ bar }, index) => {
        if (!uniqueBars.has(bar)) {
          uniqueBars.add(bar);
          const drinksAtBar = drinks.filter(drink => drink.bar === bar);

          return (
            <li key={index}>
              {bar}
              <Drink drinksAtBar={drinksAtBar} />
            </li>
          );
        }
      })}
    </ul>
  );
}

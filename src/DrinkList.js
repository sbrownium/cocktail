import React from 'react';
import drinks from './Data.js';

export default function DrinkList({}){
    return (
        <ul>
      {drinks.map((bar) => (
          <Drink 
            
          />
             ))}
           </ul> 
      )
}
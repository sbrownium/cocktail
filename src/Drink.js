import React from 'react';
import drinks from './Data.js';

export default function Drink(){
    return (
        <ul>
      {drinks.map(({name, description, price}, index) => (
          <li key={index}>
            {name} &mdash; &nbsp;
            {description} &mdash; &nbsp;
            ${price.toFixed(2)}
          </li>
             ))}
           </ul> 
      )
}
import React from 'react';


export default function Drink({drinks}){
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
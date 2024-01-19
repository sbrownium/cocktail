import React from 'react';
import Comment from './Comment';

export default function Drink({drinksAtBar}){
    return (
        <ul>
      {drinksAtBar.map(({name, description, price}, index) => (
          <li key={index}>
            {name} &mdash;&nbsp;
            {description} &mdash;
            ${price.toFixed(2)}
            <Comment/>
          </li>
             ))}
           </ul> 
      )
}
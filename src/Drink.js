import React from 'react';
import CommentList from './CommentList';

export default function Drink({drinksAtBar, comments}){
    return (
        <ul>
      {drinksAtBar.map(({drinkName, drinkID, description, price}, index) => (
          <li key={index} drinkID={drinkID}>
            {drinkName} &mdash;&nbsp;
            {description} &mdash;
            ${price.toFixed(2)}
            <CommentList drinkID={drinkID} comments={comments}/>
          </li>
             ))}
           </ul> 
      )
}
// need something like uniqueBars for the drink to know what
// drink to attach comments to

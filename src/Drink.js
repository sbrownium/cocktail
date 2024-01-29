import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';

export default function Drink({drinksAtBar, comments}){
    return (
        <ul>
      {drinksAtBar.map(({drinkName, drinkID, description, price}, index) => (
          <li key={index}>
            {drinkName} &mdash;&nbsp;
            {description} &mdash;
            ${price.toFixed(2)}
            {/* <Comment comments={comments} commentDrinkID={drinkID}/> */}
            <NewComment commentDrinkID={drinkID}/>
          </li>
             ))}
           </ul>   
      )
}
// need something like uniqueBars for the drink to know what
// drink to attach comments to

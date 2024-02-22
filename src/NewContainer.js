import React, { useContext } from 'react';
import { UserContext } from './UserContext.js';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import BarSelector from './BarSelector.js';
import NewBar from './NewBar.js';
import NewDrinkName from './NewDrinkName.js';
import NewDescription from './NewDescription.js';
import NewPrice from './NewPrice.js';
import Submit from './Submit.js';

export default function NewContainer ({bars}) {
    const [user, setUser] = useContext(UserContext);
    const { userID } = user

    function handleClick(e){
        e.preventDefault();
          if (!user) { 
              return (
                alert('Please login to add a drink')
              )
          }
          else {
              const newDrinkKey = push(child(ref(db), '/drinks/')).key;
              const updates = {};
              const newDrink = {
                // barID: selectedBar,
                // barName: barName,
                // drinkID: newDrinkKey,
                // drinkName: drinkName,
                // description: description,
                // price: Number(price),
                // userID: userID,
                // timeStamp: performance.timeOrigin
              };
            updates['/drinks/' + newDrinkKey] = newDrink;
            return (
                 update(ref(db), updates).then(() => {
                console.log('Data saved successfully!')
                })
        .catch((error) => {
          console.log('problem writing')
        }))}}
    return (
        <>
            <form>
                <BarSelector bars={bars}/>
                <NewBar />
                <NewDrinkName />
                <NewDescription />
                <NewPrice />
                <Submit handleClick={handleClick}/>
            </form>
       </>
    )         
}
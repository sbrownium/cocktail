import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import BarSelector from './BarSelector.js';
import NewBar from './NewBar.js';
import NewDrink from './NewDrink.js';
import Submit from './Submit.js';

export default function NewContainer ({bars}) {
    const [user, setUser] = useContext(UserContext);
    const { userID } = user
    const initialNewDrink = {
        barID: '',
        barName: '',
        drinkID: '',
        drinkName: '',
        description: '',
        price: '',
        price: '',
        userID: '',
        timeStamp: ''
    }
    const [newDrink, setNewDrink] = useState(initialNewDrink)

    function handleExistingBar (e) {
        if (e.target.value != 'new') {
            const barsArray = Object.values(bars);
            const findBar = barsArray.find(ID => ID.barID === e.target.value);
            const barIDToBarName = findBar.barName 
            setNewDrink({
                ...newDrink,
                barID: e.target.value,
                barName: barIDToBarName});
        } else {
            setNewDrink({
                ...newDrink,
                barID: e.target.value});
        }};

    function handleNewBar (e) {
        setNewDrink({
            ...newDrink,
            barName: e.target.value
        })
    }
        
    function handleName (e) {
        setNewDrink({
            ...newDrink,
            drinkName: e.target.value
        })
    }
   
    function handleDescription (e) {
        setNewDrink({
            ...newDrink,
            description: e.target.value
        })
    }

    function handlePrice (e) {
        setNewDrink({
            ...newDrink,
            price: e.target.value
        })
    }
   
    function handleClick(e){
        e.preventDefault();
          if (!user) { 
              return (
                alert('Please login to add a drink')
              )
          }
          else {
              const newDrinkKey = push(child(ref(db), '/drinks/')).key;
            //   const newBarKey = push(child(ref(db), '/bars/')).key;
              const updates = {};
              setNewDrink({
                ...newDrink,
                drinkID: newDrinkKey,
                userID: {userID},
                timeStamp: performance.timeOrigin
                })
            //   const newDrink = {
            //     barID: newDrink.barID,
            //     barName: barName,
            //     drinkID: newDrinkKey,
            //     drinkName: newDrink.drinkName,
            //     description: newDrink.description,
            //     price: Number(newDrink.price),
            //     userID: userID,
            //     timeStamp: performance.timeOrigin
            //   };
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
                <BarSelector bars={bars} newDrink={newDrink} handleExistingBar={handleExistingBar}/>
                <NewBar newDrink={newDrink} handleNewBar={handleNewBar}/>
                <NewDrink newDrink={newDrink} handleName={handleName} handleDescription={handleDescription} handlePrice={handlePrice}/>
                <Submit handleClick={handleClick}/>
            </form>
       </>
    )         
}
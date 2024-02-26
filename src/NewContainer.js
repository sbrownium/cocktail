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
        addedBy: '',
        timeStamp: '',
        isNewBar: false
    }
    const [newDrink, setNewDrink] = useState(initialNewDrink);
    const [isNew, setIsNew] = useState(false);
    const newDrinkKey = push(child(ref(db), '/drinks/')).key;
    const newBarKey = push(child(ref(db), '/bars/')).key;

    function handleExistingBar (e) {
            
        // const barsArray = Object.values(bars);
        // const findBar = barsArray.find(ID => ID.barID === e.target.value);
        if (e.target.value === 'new') {
            // setIsNew(true);
            setNewDrink({
                ...newDrink,
                isNewBar: true,
                barName: ''
            });   
        } 
        else {
            const barsArray = Object.values(bars);
            const findBar = barsArray.find(ID => ID.barID === e.target.value);
            const barIDToBarName = findBar.barName 
            setNewDrink({
                ...newDrink,
                barID: e.target.value,
                isNewBar: false,
                barName: barIDToBarName});     
        } 
    };

    function handleNewBar (e) {
        setNewDrink({
            ...newDrink,
            barName: e.target.value,
            barID: newBarKey
        })
    }
        
    function handleName (e) {
        setNewDrink({
            ...newDrink,
            drinkName: e.target.value,
            drinkID: newDrinkKey,
            addedBy: userID,
            timeStamp: performance.timeOrigin
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
        // const newDrinkKey = push(child(ref(db), '/drinks/')).key;
        // const newBarKey = push(child(ref(db), '/bars/')).key;
        e.preventDefault();
        
        // setNewDrink({
        //     ...newDrink,
        //     // barID: newBarKey,
        //     // drinkID: newDrinkKey,
        //     addedBy: userID,
        //     timeStamp: performance.timeOrigin
        // })
          if (!user) { 
              return (
                alert('Please login to add a drink')
              )
          }
          else {
            const updates = {};   
            const {barID, barName, addedBy, timeStamp, drinkID, drinkName, description, price} = newDrink
            const newDrinkObj = {barID, barName, addedBy, timeStamp, drinkID, drinkName, description, price};
            const newBarObj = {barID, barName, addedBy, timeStamp};
            updates['/drinks/' + newDrinkKey] = newDrinkObj;
            updates['/bars/' + newBarKey] = newBarObj;
            // allUpdates['/drinks/' + newDrinkKey, '/bars/' + newBarKey ] = newUpdates;
            return (
                // update(ref(db), barUpdates, drinkUpdates, ).then(() => {
                update(ref(db), updates).then(() => {
                console.log('Drink Data saved successfully!')
                })
                // update(ref(db), barUpdates).then(() => {
                //     console.log('Bar Data saved successfully!')
                // })
        .catch((error) => {
          console.log('problem writing')
        }))}
        setNewDrink(initialNewDrink)
    }
        
    return (
        <>
            <form>
                <BarSelector bars={bars} newDrink={newDrink} handleExistingBar={handleExistingBar}/>
                <NewBar bars={bars} newDrink={newDrink} handleNewBar={handleNewBar}/>
                <NewDrink newDrink={newDrink} handleName={handleName} handleDescription={handleDescription} handlePrice={handlePrice}/>
                <Submit handleClick={handleClick}/>
            </form>
       </>
    )         
}
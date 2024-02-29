import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import BarSelector from './BarSelector.js';
import NewBar from './NewBar.js';
import NewDrink from './NewDrink.js';
import Submit from './Submit.js';


export default function NewContainer ({bars, drinks, commets}) {
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
        isNewBar: false,
        needsName: false,
        needsBar: false,
        needsDescription: false,
        needsPrice: false,
    }
    const [newDrink, setNewDrink] = useState(initialNewDrink);
    const newDrinkKey = push(child(ref(db), '/drinks/')).key;
    const newBarKey = push(child(ref(db), '/bars/')).key;
    const barsArray = Object.values(bars);
    

    function handleExistingBar (e) {
        if (e.target.value === 'new') {
            setNewDrink({
                ...newDrink,
                isNewBar: true,
                barName: ''
            });   
        } 
        else {
            const findBar = barsArray.find((ID) => ID.barID === e.target.value);
            const barIDToBarName = findBar.barName 
            setNewDrink({
                ...newDrink,
                barID: e.target.value,
                isNewBar: false,
                barName: barIDToBarName});     
        } 
    };

    function handleNewBar (e) {
        const findBarName = barsArray.find((bar) => bar.barName.toLowerCase() === e.target.value.toLowerCase());
        if (findBarName) {
            setNewDrink({
                ...newDrink,
                barName: findBarName.barName,
                barID: findBarName.barID
            })
        } else {
        setNewDrink({
            ...newDrink,
            barName: e.target.value,
            barID: newBarKey
        })
    }}
        
    function handleName (e) {
        setNewDrink({
            ...newDrink,
            drinkName: e.target.value,
            drinkID: newDrinkKey,
            addedBy: userID,
            timeStamp: performance.timeOrigin,
            needsName: false
        })
    }

    function handleNameFocus () {
        if (newDrink.needsName === true) {
        setNewDrink({
            ...newDrink,
            drinkName: '',
            needsName: false
        })
    }}
   
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
        const drinksArray = Object.values(drinks);
        const matchDrink = drinksArray.filter((drink) => drink.barID === newDrink.barID).find((drink) => drink.drinkName.toLowerCase() === newDrink.drinkName.toLowerCase());
       
        e.preventDefault();
          if (!user) { 
              return (
                alert('Please login to add a drink')
              )
          } else if (matchDrink) {
            return (
                alert('It looks like ' + newDrink.barName + ' already has a drink called ' + newDrink.drinkName)
            )} else if (newDrink.drinkName === '') {
                setNewDrink({
                    ...newDrink,
                    needsName: true
                });
            }
           else {
            const updates = {};   
            const {barID, barName, addedBy, timeStamp, drinkID, drinkName, description, price} = newDrink
            const newDrinkObj = {barID, barName, addedBy, timeStamp, drinkID, drinkName, description, price};
            const newBarObj = {barID, barName, addedBy, timeStamp};
            
            updates['/drinks/' + newDrinkKey] = newDrinkObj;
            const matchBar = barsArray.find(ID => ID.barID === newDrink.barID);
        
            if (!matchBar) {
            updates['/bars/' + newBarKey] = newBarObj;
        }
            setNewDrink(initialNewDrink)
            return (
                update(ref(db), updates).then(() => {
                console.log('Data saved successfully!')
                })
        .catch((error) => {
          console.log('problem writing')
        }))
    }
    }    
    return (
        <>
            <form>
                <BarSelector bars={bars} newDrink={newDrink} handleExistingBar={handleExistingBar}/>
                <NewBar bars={bars} newDrink={newDrink} handleNewBar={handleNewBar}/>
                <NewDrink newDrink={newDrink} handleName={handleName} handleNameFocus={handleNameFocus} handleDescription={handleDescription} handlePrice={handlePrice}/>
                {/* <NewComment commentDrinkID={newDrinkKey}/> */}
                <Submit handleClick={handleClick}/>
              
            </form>
       </>
    )         
}
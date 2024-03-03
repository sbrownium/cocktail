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
    const initialValidation = {
        needsDrinkName: false,
        needsBarName: false,
        needsBarID: false,
        needsDescription: false,
        needsPrice: false,
    }
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
    const [validation, setValidation] = useState(initialValidation);
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

    function focusSelector () {
        if (validation.needsBarID === true) {
            setNewDrink({
                ...newDrink,
                barID: ''
            })
            setValidation({
                ...validation,
                needsBarID: false
            })
        }
    }

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

    function focusNewBar () {
        if (validation.needsBarName === true) {
            setNewDrink({
                ...newDrink,
                barName: ''
            })
            setValidation({
                ...validation,
                needsBarName: false
            })
        }}
        
    function handleName (e) {
        setNewDrink({
            ...newDrink,
            drinkName: e.target.value,
            drinkID: newDrinkKey,
            addedBy: userID,
            timeStamp: performance.timeOrigin
        })
        setValidation({
            ...validation,
            needsDrinkName: false
        })
    }

    function focusName () {
        if (validation.needsDrinkName === true) {
        setNewDrink({
            ...newDrink,
            drinkName: ''
        })
        setValidation({
            ...validation,
            needsDrinkName: false
        })
    }}
   
    function handleDescription (e) {
        setNewDrink({
            ...newDrink,
            description: e.target.value   
        })
        setValidation({
            ...validation,
            needsDescription: false
        })
    }

    function focusDescription () {
        if (validation.needsDescription === true) {
        setNewDrink({
            ...newDrink,
            description: '',
        })
        setValidation({
            ...validation,
            needsDescription: false
        })
    }}

    function handlePrice (e) {
        setNewDrink({
            ...newDrink,
            price: e.target.value
        })
        setValidation({
            ...validation,
            needsPrice: false
        })
    }

    function focusPrice () {
        if (validation.needsPrice === true) {
        setNewDrink({
            ...newDrink,
            price: ''
        })
        setValidation({
            ...validation,
            needsPrice: false
        })
    }}
   
    function handleClick(e){
        const drinksArray = Object.values(drinks);
        const matchDrink = drinksArray.filter((drink) => drink.barID === newDrink.barID).find((drink) => drink.drinkName.toLowerCase() === newDrink.drinkName.toLowerCase());
       
        e.preventDefault();
          if (!user) { 
              return (
                alert('Please login to add a drink')
              )
          } if (matchDrink) {
            return (
                alert('It looks like ' + newDrink.barName + ' already has a drink called ' + newDrink.drinkName)
            );
        } 
        if (newDrink.drinkName === '' || newDrink.description === '' || newDrink.price === '' || newDrink.barID === '' || newDrink.barName === '') {
            if (newDrink.barName === '') {
                setValidation({
                    ...validation,
                    needsBarName: true
                });
            }
            if (newDrink.drinkName === '') {
                setValidation({
                    ...validation,
                    needsDrinkName: true
                });
            }
            if (newDrink.description === '') {
                setValidation({
                    ...validation,
                    needsDescription: true
                });
            }
            if (newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsPrice: true
                });
            }
            if (newDrink.barID === '' && newDrink.barName === '') {
                setValidation({
                    ...validation,
                    needsBarID: true,
                    needsBarName: true
                });
            }
            if (newDrink.description === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsDescription: true,
                    needsPrice: true
                });
            }
            if (newDrink.drinkName === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsDrinkName: true,
                    needsPrice: true
                });
            }
            if (newDrink.drinkName === '' && newDrink.description === '') {
                setValidation({
                    ...validation,
                    needsDrinkName: true,
                    needsDescription: true
                });
            }
            if (newDrink.barName === '' && newDrink.drinkName === '') {
                setValidation({
                    ...validation,
                    needsBarName: true,
                    needsDrinkName: true,
                });
            }
            if (newDrink.barName === '' && newDrink.description === '') {
                setValidation({
                    ...validation,
                    needsBarName: true,
                    needsDescription: true
                });
            }
            if (newDrink.barName === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsBarName: true,
                    needsPrice: true
                });
            }
            if (newDrink.drinkName === '' && newDrink.description === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsDrinkName: true,
                    needsDescription: true,
                    needsPrice: true
                });
            }
            if (newDrink.barName === '' && newDrink.description === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsBarName: true,
                    needsDescription: true,
                    needsPrice: true
                });
            }
            if (newDrink.barName === '' && newDrink.drinkName === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsPrice: true
                });
            }
            if (newDrink.barName === '' && newDrink.drinkName === '' && newDrink.description === '') {
                setValidation({
                    ...validation,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsDescription: true
                });
            }
            if (newDrink.barID === '' && newDrink.barName === '' && newDrink.drinkName === '') {
                setValidation({
                    ...validation,
                    needsBarID: true,
                    needsBarName: true,
                    needsDrinkName: true
                });
            }
            if (newDrink.barID === '' && newDrink.barName === '' && newDrink.description === '') {
                setValidation({
                    ...validation,
                    needsBarID: true,
                    needsBarName: true,
                    needsDescription: true
                });
            }
            if (newDrink.barID === '' && newDrink.barName === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsBarID: true,
                    needsBarName: true,
                    needsPrice: true
                });
            }
            if (newDrink.barName === '' && newDrink.drinkName === '' && newDrink.description === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsDescription: true,
                    needsPrice: true
                });
            }
            if (newDrink.barID === '' && newDrink.barName === '' && newDrink.description === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsBarID: true,
                    needsDrinkName: true,
                    needsDescription: true,
                    needsPrice: true
                });
            }
            if (newDrink.barID === '' && newDrink.barName === '' && newDrink.drinkName === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsBarID: true,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsPrice: true
                });
            }
            if (newDrink.barID === '' && newDrink.barName === '' && newDrink.drinkName === '' && newDrink.description === '') {
                setValidation({
                    ...validation,
                    needsBarID: true,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsDescription: true
                });
            }
            if (newDrink.barID === '' && newDrink.barName === '' && newDrink.drinkName === '' && newDrink.description === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    needsBarID: true,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsDescription: true,
                    needsPrice: true
                });
            }
            return (
                alert('Missing Stuff')
            )
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
            setNewDrink(initialNewDrink);
            validation(initialValidation);
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
                <BarSelector bars={bars} newDrink={newDrink} validation={validation} handleExistingBar={handleExistingBar} focusSelector={focusSelector}/>
                <NewBar newDrink={newDrink} validation={validation} handleNewBar={handleNewBar} focusNewBar={focusNewBar}/>
                <NewDrink newDrink={newDrink} validation={validation} handleName={handleName} focusName={focusName} handleDescription={handleDescription} focusDescription={focusDescription} handlePrice={handlePrice} focusPrice={focusPrice}/>
                {/* <NewComment commentDrinkID={newDrinkKey}/> */}
                <Submit handleClick={handleClick}/>
              
            </form>
       </>
    )         
}
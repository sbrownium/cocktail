import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import BarSelector from './BarSelector.js';
import NewBar from './NewBar.js';
import NewDrink from './NewDrink.js';
import Submit from './Submit.js';
import Button from './Button.js';
// import Alert from './Alert.js';
import SignIn from './SignIn.js';


export default function NewContainer (
    {bars,
    drinks,
    users,
    handleNewDrinkToggle,
    defaultBar,
    setSelectedBar
}) {
    const [user] = useContext(UserContext);
    const { userID } = user
    const [logInAlert, setLogInAlert] = useState(false);
    const [repeatAlert, setRepeatAlert] = useState(false);
    const [missingAlert, setMissingAlert] = useState(false);
    const barsArray = Object.values(bars);
    const defaultBarObj = barsArray.filter((ID) => ID.barID === defaultBar);
    const defaultBarName = defaultBarObj[0].barName;
    const initialValidation = {
        needsDrinkName: false,
        needsBarName: false,
        // needsBarID: false,
        needsDescription: false,
        needsPrice: false,
    }
    const initialNewDrink = {
        archived: false,
        barID: defaultBar,
        barName: defaultBarName,
        // drinkID: '',
        drinkName: '',
        description: '',
        price: '',
        initialTimeStamp: '',
        lastTimeStamp: '',
        isNewBar: false
    }
    const [newDrink, setNewDrink] = useState(initialNewDrink);
    const [validation, setValidation] = useState(initialValidation);
    


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

    // function focusSelector () {
    //     if (validation.needsBarID === true) {
    //         setNewDrink({
    //             ...newDrink,
    //             barID: ''
    //         })
    //         setValidation({
    //             ...validation,
    //             needs: false
    //         })
    //     }
    // }

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
            isNewBar: true
            // barID: ''
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
            // drinkID: newDrinkKey
        });
        setValidation({
            ...validation,
            needsDrinkName: false
        });
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
            return setLogInAlert(true)
          }
           if (matchDrink) {
            return setRepeatAlert(true)
        } 
        // if (newDrink.drinkName === '' || newDrink.description === '' || newDrink.price === '' || newDrink.barID === '' || newDrink.barName === '') {
            if (newDrink.drinkName === '' || newDrink.description === '' || newDrink.price === '' || newDrink.barName === '') {
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
            // if (newDrink.barID === '' && newDrink.barName === '') {
                if (newDrink.barName === '') {
                setValidation({
                    ...validation,
                    // needsBarID: true,
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
            // if (newDrink.barID === '' && newDrink.barName === '' && newDrink.drinkName === '') {
                if ( newDrink.barName === '' && newDrink.drinkName === '') {
                setValidation({
                    ...validation,
                    // needsBarID: true,
                    needsBarName: true,
                    needsDrinkName: true
                });
            }
            // if (newDrink.barID === '' && newDrink.barName === '' && newDrink.description === '') {
                if (newDrink.barName === '' && newDrink.description === '') {
                setValidation({
                    ...validation,
                    // needsBarID: true,
                    needsBarName: true,
                    needsDescription: true
                });
            }
            // if (newDrink.barID === '' && newDrink.barName === '' && newDrink.price === '') {
                if (newDrink.barName === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    // needsBarID: true,
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
            // if (newDrink.barID === '' && newDrink.barName === '' && newDrink.description === '' && newDrink.price === '') {
                if (newDrink.barName === '' && newDrink.description === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    // needsBarID: true,
                    needsDrinkName: true,
                    needsDescription: true,
                    needsPrice: true
                });
            }
            // if (newDrink.barID === '' && newDrink.barName === '' && newDrink.drinkName === '' && newDrink.price === '') {
                if (newDrink.barName === '' && newDrink.drinkName === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    // needsBarID: true,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsPrice: true
                });
            }
            // if (newDrink.barID === '' && newDrink.barName === '' && newDrink.drinkName === '' && newDrink.description === '') {
                if (newDrink.barName === '' && newDrink.drinkName === '' && newDrink.description === '') {
                setValidation({
                    ...validation,
                    // needsBarID: true,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsDescription: true
                });
            }
            // if (newDrink.barID === '' && newDrink.barName === '' && newDrink.drinkName === '' && newDrink.description === '' && newDrink.price === '') {
                if (newDrink.barName === '' && newDrink.drinkName === '' && newDrink.description === '' && newDrink.price === '') {
                setValidation({
                    ...validation,
                    // needsBarID: true,
                    needsBarName: true,
                    needsDrinkName: true,
                    needsDescription: true,
                    needsPrice: true
                });
            }
            return setMissingAlert(true)
        }
           else {
            const newDrinkKey = push(child(ref(db), '/drinks/')).key;
            const newBarKey = push(child(ref(db), '/bars/')).key;
            const updates = {};   
            const {archived, barID, barName, drinkName, description, price, isNewBar} = newDrink
            // const matchBar = barsArray.find(ID => ID.barID === newDrink.barID);
            // if (!matchBar) {
                if (isNewBar) {
                const newBarObj = {archived, barID: newBarKey, barName, addedBy: userID, initialTimeStamp: Date.now(), lastTimeStamp: Date.now()};
                const newDrinkObj = {archived, barID: newBarKey, addedBy: userID, initialTimeStamp: Date.now(), lastTimeStamp: Date.now(), drinkID:newDrinkKey, drinkName, description, price};
                updates['/bars/' + newBarKey] = newBarObj;
                updates['/drinks/' + newDrinkKey] = newDrinkObj;
                setSelectedBar(newBarKey);
                
            } else {
                const newDrinkObj = {archived, barID, addedBy: userID, initialTimeStamp: Date.now(), lastTimeStamp: Date.now(), drinkID:newDrinkKey, drinkName, description, price};
                updates['/drinks/' + newDrinkKey] = newDrinkObj; 
                setSelectedBar(barID);
    
            }
            
            setNewDrink(initialNewDrink);
            setValidation(initialValidation);
            handleNewDrinkToggle();
            
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
                <BarSelector
                    bars={bars}
                    newDrink={newDrink}
                    validation={validation}
                    handleExistingBar={handleExistingBar}
                    // focusSelector={focusSelector}
                    defaultBarID={defaultBar}
                    defaultBarName={defaultBarName}
                />
                <NewBar
                    newDrink={newDrink}
                    validation={validation}
                    handleNewBar={handleNewBar}
                    focusNewBar={focusNewBar}
                />
                <NewDrink
                    newDrink={newDrink}
                    validation={validation}
                    handleName={handleName}
                    focusName={focusName}
                    handleDescription={handleDescription}
                    focusDescription={focusDescription}
                    handlePrice={handlePrice}
                    focusPrice={focusPrice}
                />
                {/* <NewComment commentDrinkID={newDrinkKey}/> */}
                <Submit handleClick={handleClick} value='add'/>
              
            </form>
            <Button className={null} handleClick={handleNewDrinkToggle}>
                Never Mind
            </Button>

            {(logInAlert && !user) && // user conditional removes alert after signin 
            <>
            <p>Please sign in to add a drink</p>
            <SignIn users={users} />
            <Button className={null} handleClick={() => setLogInAlert(false)} >
            Got it, but I don't want to sign in
            </Button> 
            </>
            }

            {repeatAlert &&
            <>
            <p>It looks like {newDrink.barName} already has a drink called {newDrink.drinkName}</p>
            <Button className={null} handleClick={() => setRepeatAlert(false)} >
             OK
            </Button> 
            </>
            }

            {missingAlert &&
            <>
            <p>Missing stuff</p>
            <Button className={null} handleClick={() => setMissingAlert(false)} >
             OK
            </Button> 
            </>
            }
            
       </>
    )         
}
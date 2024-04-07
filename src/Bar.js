import React, {useContext, useState} from "react";
import { UserContext } from "./UserContext.js";
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import Drink from './Drink.js'
import ChangeBar from './ChangeBar.js';
import Edit from "./Edit.js";
import DrinkIcon from "./DrinkIcon.js";
import Button from "./Button.js";
import NewContainer from "./NewContainer.js";


export default function Bar({bars, drinks, comments, ratings, users}) {
  const [ user, setUser] = useContext(UserContext);
  const [beingEditted, setBeingEditted] = useState(false);
  const [selectedBar, setSelectedBar] = useState('');
  const [showNewDrink, setShowNewDrink] = useState(false);
  const barsArray = Object.values(bars);
  const filteredBars = barsArray.filter(bar => bar.barID === selectedBar);

  function handleToggle () {
    setBeingEditted(beingEditted => !beingEditted);
    }

  function handleNewDrinkToggle () {
    setShowNewDrink(showNewDrink => !showNewDrink)
  }

  function handleSelect (e) {
    e.preventDefault();
    setSelectedBar(e.target.value);
    }; 
    
  function handleClick (e) {
    e.preventDefault();
    handleNewDrinkToggle();
  }  
    
    return (
      <>
      <ul>
        {filteredBars.map(({ barName, barID }, index) => {
            return (
              <li key={index}>
                 <h1>{barName}</h1>
                <Drink
                  barID={barID}
                  barsArray={barsArray}
                  drinks={drinks}
                  comments={comments}
                  ratings={ratings}
                  users={users}
                  handleToggle={handleToggle}
                  beingEditted={beingEditted}
                />
              </li>
            );
          })}
      </ul>
      <ChangeBar
        bars={bars}
        handleSelect={handleSelect}
      /> 
      <Edit
        handleToggle={handleToggle} 
        beingEditted={beingEditted}
        selectedBar={selectedBar}
        filteredBars={filteredBars}
      />
      {showNewDrink ? 
       <NewContainer bars={bars} drinks={drinks} comments={comments} handleNewDrinkToggle={handleNewDrinkToggle}/>
       :
      <Button handleClick={handleClick} className='icon'>
        +<DrinkIcon width='24' height='24' fill='grey'/>
      </Button>
      }
      </>
    );
  }
  
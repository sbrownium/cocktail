import React, {useContext, useState} from "react";
import { UserContext } from "./UserContext.js";
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import Drink from './Drink.js'
import ChangeBar from './ChangeBar.js';
import Edit from "./Edit.js";


export default function Bar({bars, drinks, comments, ratings}) {
  const [ user, setUser] = useContext(UserContext);
  const [beingEditted, setBeingEditted] = useState(false);
  const [selectedBar, setSelectedBar] = useState('');
  const barsArray = Object.values(bars);
  const filteredBars = barsArray.filter(bar => bar.barID === selectedBar);

  function handleToggle () {
    setBeingEditted(beingEditted => !beingEditted);
    }

  function handleSelect (e) {
    e.preventDefault();
    setSelectedBar(e.target.value);
    };  
    
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
      </>
    );
  }
  
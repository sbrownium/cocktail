import React, {useContext, useState} from "react";
import { UserContext } from "./UserContext.js";
import Drink from './Drink.js'
import ChangeBar from './ChangeBar.js';
import Edit from "./Edit.js";


export default function Bar({bars, drinks, comments, ratings}) {
  const [ user, setUser] = useContext(UserContext);
  const [beingEdittedTest, setBeingEdittedTest] = useState(false);
  const [selectedBar, setSelectedBar] = useState('');
  const barsArray = Object.values(bars);
  const filteredBars = barsArray.filter(bar => bar.barID === selectedBar);

  function handleToggleTest (e) {
    e.preventDefault();
    setBeingEdittedTest(beingEdittedTest => !beingEdittedTest);
    console.log('toggle handled');
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
                <Drink barID={barID} barsArray={barsArray} drinks={drinks} comments={comments} ratings={ratings} />
              </li>
            );
          })}
      </ul>
      
      <ChangeBar bars={bars} handleSelect={handleSelect}/> 
      <Edit handleToggleTest={handleToggleTest} beingEdittedTest={beingEdittedTest} selectedBar={selectedBar}/>
     
      </>
    );
  }
  
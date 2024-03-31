import React, {useState} from "react";
import Drink from './Drink.js'
import ChangeBar from './ChangeBar.js';


export default function Bar({bars, drinks, comments, ratings}) {
  const [selectedBar, setSelectedBar] = useState('');
  const barsArray = Object.values(bars);
  const filteredBars = barsArray.filter(bar => bar.barID === selectedBar);

  function handleSelect (e) {
    e.preventDefault();
      setSelectedBar(
        e.target.value
    )};      
    
    return (
      <>
      <ul>
        {filteredBars.map(({ barName, barID }, index) => {
            return (
              <li key={index}>
                 <h1>{barName}</h1>
                <Drink barID={barID} barsArray={barsArray} drinks={drinks} comments={comments} ratings={ratings}/>
              </li>
            );
          })}
      </ul>
      <form>
      <ChangeBar bars={bars} handleSelect={handleSelect}/> 
      </form>
      </>
    );
  }
  
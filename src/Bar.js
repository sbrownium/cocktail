import React, {useContext, useState} from "react";
import { UserContext } from "./UserContext";
import Drink from './Drink.js'
import ChangeBar from './ChangeBar.js';


export default function Bar({bars, drinks, comments, ratings}) {
  const [user, setUser] = useContext(UserContext);
  const initialSelectedBar = '-Nr7lOhIhP11igBsjqOp';
  const [selectedBar, setSelectedBar] = useState(initialSelectedBar);
  const barsArray = Object.values(bars);
  const filteredBars = barsArray.filter(bar => bar.barID === selectedBar);

  function handleSelect (e) {
    e.preventDefault();
    if (!user) {
      setSelectedBar(
        e.target.value
    );      
    } else {
            setUser({
                ...user,
                lastBar: e.target.value
            });
            setSelectedBar(
              e.target.value
          );      
        } }
  
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
  
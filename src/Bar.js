import React, {useContext} from "react";
import { UserContext } from "./UserContext";
import Drink from './Drink.js'
import ChangeBar from './ChangeBar.js';
import Submit from './Submit.js';

export default function Bar({bars, drinks, comments, ratings}) {
  const [user, setUser] = useContext(UserContext);
  const barsArray = Object.values(bars);

  function handleSelect (e) {
    e.preventDefault();
            setUser({
                ...user,
                lastBar: e.target.value
            });   
        } 

  function handleClick () {
    console.log('click handled')
  }
  
    return (
      <>
      <ul>
        {barsArray.map(({ barName, barID }, index) => {
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
      <Submit handleClick={handleClick} value='change'/>
      </form>
      </>
    );
  }
  
import React, {useState, useMemo} from "react";
import Drink from './Drink.js'
import ChangeBar from './ChangeBar.js';
import Edit from "./Edit.js";
import DrinkIcon from "./DrinkIcon.js";
import Button from "./Button.js";
import NewContainer from "./NewContainer.js";


export default function Bar({bars, drinks, comments, ratings, users}) {
  const [beingEditted, setBeingEditted] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [selectedBar, setSelectedBar] = useState('');
  const [showNewDrink, setShowNewDrink] = useState(false);
  const [showingBar, setShowingBar] = useState(false);


  function toggleShowArchive () {
    setShowArchive(showArchive => !showArchive)
  }
  function handleToggle () {
    setBeingEditted(beingEditted => !beingEditted);
    }

  function handleNewDrinkToggle () {
    setShowNewDrink(showNewDrink => !showNewDrink)
  }

  function handleSelect (e) {
    e.preventDefault();
    setSelectedBar(e.target.value);
    if (e.target.value === "Pick a bar, any bar") {
      setShowingBar(false);
    } else {
      setShowingBar(true);
    }
    }; 
    
  function handleClick (e) {
    e.preventDefault();
    handleNewDrinkToggle();
  } 
  const barsArray = useMemo(() => {
  if (showArchive === true) {
    return Object.values(bars)
  } 
    return Object.values(bars).filter(bar => bar.archived === false);
  
  }, [showArchive, bars])
  const filteredBars = barsArray.filter(bar => bar.barID === selectedBar);
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
        barsArray={barsArray}
        handleSelect={handleSelect}
      /> 
      
      {showingBar &&
      <>
      <Edit
        handleToggle={handleToggle} 
        beingEditted={beingEditted}
        selectedBar={selectedBar}
        filteredBars={filteredBars}
      />
      {showNewDrink ? 
       <NewContainer
        users={users}
        bars={bars}
        drinks={drinks}
        comments={comments}
        handleNewDrinkToggle={handleNewDrinkToggle} 
        defaultBar={selectedBar}
        setSelectedBar={setSelectedBar}
      />
       :
      <Button handleClick={handleClick} className='icon'>
        +<DrinkIcon width='24' height='24' fill='grey'/>
      </Button>
      }
      </>
      }
      <Button handleClick={toggleShowArchive}>
        Show Bars Archive
      </Button>
      </>
    );
  }
  
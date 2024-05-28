import React, {useState, useMemo} from "react";
import DrinkList from './DrinkList.js'
import ChangeBar from './ChangeBar.js';
import Edit from "./Edit.js";
import DrinkIcon from "./DrinkIcon.js";
import Button from "./Button.js";
import NewContainer from "./NewContainer.js";
import ArchiveButton from "./ArchiveButton.js";
import Unarchive from "./Unarchive.js";


export default function Bar({bars, drinks, comments, ratings, users}) {
  const [beingEditted, setBeingEditted] = useState(false);
  const [showBarArchive, setShowBarArchive] = useState(false);
  const [selectedBar, setSelectedBar] = useState('');
  const [showNewDrink, setShowNewDrink] = useState(false);
  const [showingBar, setShowingBar] = useState(false);


  function toggleShowBarArchive () {
    setShowBarArchive(showBarArchive => !showBarArchive)
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
  if (showBarArchive) {
    return Object.values(bars)
  } 
    return Object.values(bars).filter(bar => bar.archived === false);
  
  }, [showBarArchive, bars])
  const filteredBar = barsArray.filter(bar => bar.barID === selectedBar);
  const barsDrinks = Object.values(drinks).filter(drink => drink.barID === selectedBar)
    return (
      <>
      <ul>
        {filteredBar.map(({ archived, barName, barID }, index) => {
            return (
              <li key={index}>
                 <h1>{barName}</h1>
                 {beingEditted &&
                 <>
                 {!archived ?
                 <ArchiveButton
                    path={'/bars/'}
                    nodeID={barID}
                    IDType='barID'
                    arrayOfThings={Object.values(bars)}
                    nodeName={barName}
                    handleToggle={handleToggle}
                    className={null}
                    buttonText='Archive Bar'
                 /> :
                 <Unarchive
                  path={'/bars/'}
                  nodeID={barID}
                  IDType='barID'
                  arrayOfThings={Object.values(bars)}
                  handleToggle={handleToggle}
                />}
                </>
                }
                <DrinkList
                  barID={barID}
                  // barsArray={barsArray}
                  barsDrinks={barsDrinks}
                  // drinks={drinks}
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
        filteredBar={filteredBar}
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
      {(Object.values(bars).some(bar => bar.archived === true)) &&
      <Button handleClick={toggleShowBarArchive}>
        {!showBarArchive ? 'Show Bars Archive' : 'Hide Bars Archive'}
      </Button>}
      </>
    );
  }
  
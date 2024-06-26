import React, {useState, useMemo, useContext} from "react";
import DrinkList from './DrinkList.js'
import ChangeBar from './ChangeBar.js';
import Edit from "./Edit.js";
import DrinkIcon from "./DrinkIcon.js";
import Button from "./Button.js";
import NewContainer from "./NewContainer.js";
import ArchiveButton from "./ArchiveButton.js";
import DeleteButton from "./DeleteButton.js";
import Unarchive from "./Unarchive.js";
import { UserContext } from "./UserContext.js";
import EditBox from "./EditBox.js";



export default function Bar({
  bars,
  drinks,
  comments,
  ratings,
  users,
  beingEditted,
  handleToggle
}) {
  const [user] = useContext(UserContext);
  
  const [showBarArchive, setShowBarArchive] = useState(false);
  const [selectedBar, setSelectedBar] = useState('');
  const [showNewDrink, setShowNewDrink] = useState(false);
  const [showingBar, setShowingBar] = useState(false);
  const [editBarName, setEditBarName] = useState('');

  function toggleShowBarArchive () {
    setShowBarArchive(showBarArchive => !showBarArchive)
  }

  function handleNewDrinkToggle () {
    setShowNewDrink(showNewDrink => !showNewDrink)
  }

  function handleBarNameEdit (e) {
    e.preventDefault();
    setEditBarName(e.target.value);
  }

  function resetBarName () {
    setEditBarName((Object.values(bars).filter(bar => bar.barID === selectedBar)[0].barName))
  }

  function handleNeverMind (e) {
    e.preventDefault();
    resetBarName();
    handleToggle(); 
  }

  function handleSelect (e) {
    e.preventDefault();
    setSelectedBar(e.target.value);
    if (e.target.value === "Pick a bar, any bar") {
      setShowingBar(false);
    } else {
      setShowingBar(true);
      setEditBarName(Object.values(bars).filter(bar => bar.barID === e.target.value)[0].barName); // sets the bar name for the edit state
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
        {filteredBar.map(({ addedBy, archived, barName, barID }, index) => {
      
            return (
              <li key={index}>
                {beingEditted ?
                <>
                {!archived ? 
                 <>
                 <form>
                  <EditBox
                    className={(editBarName === '') && 'missing'}
                    id='barNameEdit'
                    edit={editBarName}
                    handleEdit={handleBarNameEdit}
                  />
                  {(editBarName !== '') ? 
                  <Button
                  handleClick={handleClick}
                  children='Save'
                  className={null}
                  /> 
                  : 
               <p className='missing'>Please give the bar a name to save</p>
                }
                </form>
                  <ArchiveButton 
                    path='/bars/'
                    nodeID={barID}
                    IDType='barID'
                    arrayOfThings={Object.values(bars)}
                    nodeName={barName}
                    handleToggle={handleToggle}
                    className={null}
                    reset={resetBarName}
                    buttonText='Archive Bar'
                  />
                  {(addedBy === user.userID) &&
                  <DeleteButton 
                    path='/bars/'
                    nodeID={barID}
                    nodeName={barName}
                    handleToggle={handleToggle}
                    className={null}
                    reset={resetBarName}
                    buttonText='Delete Bar'
                  />
                  } 
                 </> :
                 <Unarchive
                  path='/bars/'
                  nodeID={barID}
                  IDType='barID'
                  arrayOfThings={Object.values(bars)}
                  handleToggle={handleToggle}
                /> }
                </> :
                <h1>{barName}</h1>
                }
                <DrinkList
                  barID={barID}
                  barsDrinks={barsDrinks}
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
  
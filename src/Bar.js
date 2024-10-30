import React, {useState, useMemo, useContext, useRef} from "react";
import DrinkList from './DrinkList.js'
import ChangeBar from './ChangeBar.js';
import Edit from "./Edit.js";
import DrinkIcon from "./DrinkIcon.js";
import Button from "./Button.js";
import NewContainer from "./NewContainer.js";
import ArchiveButton from "./ArchiveButton.js";
import MoreOptionsButton from "./MoreOptionsButton.js";
import MoreOptionsMenu from "./MoreOptionsMenu.js";
import Unarchive from "./Unarchive.js";
import { UserContext } from "./UserContext.js";
import { BarContext } from "./BarContext.js";
import EditBox from "./EditBox.js";
import './Bar.css';
import OliveXIcon from "./OliveXIcon.js";
import OliveFilterIcon from "./OliveFilterIcon.js";
import TimeOfDay from "./TimeOfDay.js";
import XIcon from "./XIcon";



export default function Bar({
  bars,
  drinks,
  comments,
  ratings,
  users,
  beingEditted,
  handleToggle,
  handleClick,
  changeBarRef,
  handleChangeBarToggle,
  showingBar,
  setShowingBar
}) {
  const [user] = useContext(UserContext);
  const { selectedBar, setSelectedBar } = useContext(BarContext)
  const [barBeingEditted, setBarBeingEditted] = useState(false);
  const [showBarArchive, setShowBarArchive] = useState(false);
  const [editBarName, setEditBarName] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const barRef = useRef(null);

  function toggleShowBarArchive () {
    setShowBarArchive(showBarArchive => !showBarArchive);
    // resets if an archived bar is selected when hide archived bars is fired
    // checks to make sure a bar is showing before checking if it is archived
    if (showingBar && (Object.values(bars).filter(bar => bar.barID === selectedBar.barID)[0].archived === true)) {
      setShowingBar(false);
    }
  }

  function toggleFilter () {
    setShowFilter(showFilter => !showFilter)
  }

  function toggleBarEdit () {
    setBarBeingEditted(barBeingEditted => !barBeingEditted);
  }

  function handleBarNameEdit (e) {
    e.preventDefault();
    setEditBarName(e.target.value);
  }

  function handleSelect (e) {
    e.preventDefault();
    setSelectedBar(e.target.value); 
    if ((e.target.value === 'Current Bars') || (e.target.value === 'All Bars')) {
    // if (e.target.value === "Pick a bar, any bar") {
      setShowingBar(false);
    } else {
      setShowingBar(true);
      setEditBarName(selectedBar.barName)
      // setEditBarName(Object.values(bars).filter(bar => bar.barID === e.target.value)[0].barName); // sets the bar name for the edit state
    }
    handleChangeBarToggle();
    }; 
    

  const barsArray = useMemo(() => {
  if (showBarArchive) {
    return Object.values(bars)
  } 
    return Object.values(bars).filter(bar => bar.archived === false);
  
  }, [showBarArchive, bars])
  const filteredBar = barsArray.filter(bar => bar.barID === selectedBar.barID);
  const barsDrinks = Object.values(drinks).filter(drink => drink.barID === selectedBar.barID);
    return (
      <div className="barContainer">   
      <ul>
        <li>
         <>
        {showingBar &&
        <div className="controlsContainer"> 
        <>  
        {showFilter ?
          <Button className='edit icon' handleClick={toggleFilter}>
            <OliveXIcon
              width='35px'
            />
          </Button>
          : 
          <Button className='edit icon' handleClick={toggleFilter}>
            <OliveFilterIcon
              width='45px'
            />
          </Button>
          }
          </>
          </div>
    
        }
    
         <dialog ref={changeBarRef} className='overlay changeBars'>
        <div className='buttonHolder'>
            <Button className='modalBtn' handleClick={handleChangeBarToggle}>
                <XIcon
                height='1.25em'
                fillColor='#303030'
                />
            </Button>
            {(Object.values(bars).some(bar => bar.archived === true)) &&
          <Button
            className='archiveBtn'
            handleClick={toggleShowBarArchive}>
              {!showBarArchive ? '🗄️' : '🗃️' }
          </Button>} 
        </div>
        <div className="formContainer">
           {!showingBar && <TimeOfDay/>}
           <form>
        <ChangeBar
          barsArray={barsArray}
          handleSelect={handleSelect}
          showingBar={showingBar}
          showBarArchive={showBarArchive}
          changeBarRef={changeBarRef}
          className='negative'
        />
        </form>
        </div>
      </dialog>
      </>
        </li>
        {filteredBar.map(({ addedBy, archived, barName, barID }, index) => {
            return (
              <li key={index}>
                {barBeingEditted &&
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
                </form> }
                <MoreOptionsMenu 
                    path='/bars/'
                    nodeID={barID}
                    toggleBeingEditted={toggleBarEdit}
                    userID={addedBy}
                    reference={barRef}
                    arrayOfThings={bars} // for archiving
                    className='bars'
                  />
                <DrinkList
                  barName={barName}
                  barID={barID}
                  barsDrinks={barsDrinks}
                  comments={comments}
                  ratings={ratings}
                  users={users}
                  handleToggle={handleToggle}
                  beingEditted={beingEditted}
                  showFilter={showFilter}
                />
              </li>
            );
          })}
      </ul>
    </div>
    );
  }
  
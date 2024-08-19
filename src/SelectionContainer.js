import React from "react";
import Button from "./Button";
import Edit from "./Edit";
import XIcon from "./XIcon";

export default function SelectionContainer ({
    selectionRef,
    showingBar,
    handleToGoBars,
    handleToggle, 
    beingEditted,
    handleClick,
    handleSelectionContainer,
    showSelectionModal
}) {
    return (
        <>
        {!showingBar ?
            <div
             className="initialSelect selectionContainer"
             >
             <Button
             handleClick={handleToGoBars}
             className='barButton'
             >
          <p>See</p>
          <p className='startEmoji'>🪩</p>
          <p>Bars</p>
        </Button>
        <Button
            handleClick={handleClick}
            className='drinkButton'
        >
        <p>Add</p>
        <p className='startEmoji'>🍹</p>
        <p>Drinks</p>
      </Button>
        </div>
            :
            <>
            {!showSelectionModal &&
                    <div className="bottomSheet">
                        <div className='buttonHolder'>
                            <Button className='modalBtn'
                            handleClick={handleSelectionContainer}>
                                <div className="tabTopContainer">
                                    <div className="tabTop color-3">
                                        <div className="bar"></div>
                                    </div>
                                </div>
                                <div className="tabBottom color-3"></div>
                            </Button>
                    </div>
                    </div>  
}
    <dialog
        ref={selectionRef}
        // className={showSelectionModal ? 'selectionOverlay overlay' : 'selectionOverlay overlay closing'}
        className="selectionOverlay overlay"
    >
    <div className='buttonHolder'>
        <Button className='modalBtn'
        handleClick={handleSelectionContainer}>
            <XIcon
            height='1.25em'
            fillColor='#303030'
            />
        </Button>
    </div>
<Button
handleClick={handleToGoBars}
className='selectionBtn barButton color-1'
>
  Change Bars <span className='emoji'>🪩</span>
</Button>
{/* {!showNewDrink && */}
<Button
handleClick={handleClick}
className='selectionBtn drinkButton color-2'
>
Add Drinks <span className='emoji'>🍹</span>
</Button>
{/* } */}
<Edit
handleToggle={handleToggle} 
beingEditted={beingEditted}
// filteredBar={filteredBar}
/>
</dialog>
</>}
    </>
    ) 
}
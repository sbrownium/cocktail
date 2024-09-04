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
    handleSelectionContainer
}) {
    return (
        <>
        {!showingBar &&
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
        </div>}
    {/* <dialog
        ref={selectionRef}
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
<Button
handleClick={handleClick}
className='selectionBtn drinkButton color-2'
>
Add Drinks <span className='emoji'>🍹</span>
</Button>
<Edit
handleToggle={handleToggle} 
beingEditted={beingEditted}
/>
</dialog> */}
</>

    ) 
}
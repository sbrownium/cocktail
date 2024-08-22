import React, { useState } from "react";
import GitHub from "./GitHub";
import LinkedIn from "./LinkedIn";
import Button from "./Button";
import './MoreContainer.css';
import XIcon from "./XIcon";

export default function MoreContainer () {
    const [moreSelected, setMoreSelected] = useState(false);

        function handleMoreSelectedToggle () {
        setMoreSelected(moreSelected => !moreSelected);
    }

    return (
        <>
            <div
                className='moreSelectionsContainer'
            >  
            {moreSelected &&
                <>
                    <a href="https://github.com/sbrownium/cocktail">
                        <GitHub width='24.5px' height='24px' fillColor='black'/>
                    </a>
                    <a href="https://linkedin.com/in/sbrownium">
                        <LinkedIn width='24.5px' height='24px' fillColor='#2867B2'/>
                    </a>
                </>
                }
                <Button
                handleClick={handleMoreSelectedToggle}
                className="dotContainer"
            >
                {!moreSelected ? 
                <>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </> :
                <XIcon
                height='1.25em'
                fillColor='#303030'
                />}
            </Button>
            </div>
        </>
    )
}
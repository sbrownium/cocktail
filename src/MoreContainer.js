import React, { useState, useRef } from "react";
import GitHub from "./GitHub";
import LinkedIn from "./LinkedIn";
import Button from "./Button";
import './MoreContainer.css';

export default function MoreContainer ({
    handleModalToggle
}) {
    const [moreSelected, setMoreSelected] = useState(false);
    const moreSelectionsRef = useRef();

    function handleMoreSelectedToggle (e) {
        e.preventDefault();
        moreSelectionsRef.current.togglePopover();
    }

    return (
        <>
            {!moreSelected &&
            <Button
                handleClick={handleMoreSelectedToggle}
                className="dotContainer"
            >
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </Button>
            }
            <div
                popover="auto"
                ref={moreSelectionsRef}
                className="overlay"
            >
                <a href="https://github.com/sbrownium/cocktail">
                    <GitHub width='24.5px' height='24px' fillColor='black'/>
                </a>
                <a href="https://linkedin.com/in/sbrownium">
                    <LinkedIn width='24.5px' height='24px' fillColor='#2867B2'/>
                </a>
            </div>
        </>
    )
}
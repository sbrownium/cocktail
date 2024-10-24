import React from "react";
import Button from "./Button";
import XIcon from "./XIcon";
import "./Modal.css";

export default function Modal ({
    reference,
    message,
    affirm
}){
    
    return (
        <dialog ref={reference} className='overlay'>
            <div className='buttonHolder'>
                <Button className='modalBtn' handleClick={handleModuleToggle}>
                    <XIcon
                    height='1.25em'
                    fillColor='#303030'
                    />
                </Button>
            </div>
            {message}
            <div className="actionBtnHolder">
                <Button className='actionBtn' handleClick={handleModuleToggle}>
                    {affirm}
                </Button>
                <Button className='actionBtn' handleClick={handleModuleToggle}>
                    Never Mind
                </Button>
            </div>
        </dialog>
    )
}
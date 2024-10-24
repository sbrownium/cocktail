import React from "react";
import Button from "./Button";
import XIcon from "./XIcon";
import Delete from "./Delete";
import "./Modal.css";

export default function Modal ({
    reference,
    className,
    deletePath,
    deleteNodeID,
    handleModalToggle
    
}) {
     const typeOfThing = deletePath.replaceAll('/', '')
    return (
        <dialog ref={reference} className='overlay'>
            <div className='buttonHolder'>
                <Button className='modalBtn' handleClick={handleModalToggle}>
                    <XIcon
                    height='1.25em'
                    fillColor='#303030'
                    />
                </Button>
            </div>
            <p>Are you sure you want to delete your {typeOfThing}?</p>
            <div className="actionBtnHolder">
                <Delete
                    deletePath={deletePath}
                    deleteNodeID={deleteNodeID}
                    className={className}
                    handleModalToggle={handleModalToggle}
                />
                <Button className='actionBtn' handleClick={handleModalToggle}>
                    Never Mind
                </Button>
            </div>
        </dialog>
    )
}
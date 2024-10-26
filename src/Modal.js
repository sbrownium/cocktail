import React from "react";
import Button from "./Button";
import XIcon from "./XIcon";
import Delete from "./Delete";
import Archive from "./Archive";
import "./Modal.css";

export default function Modal ({
    reference,
    path,
    nodeID,
    handleModalToggle,
    toggleExpand,
    type,
    action,
    arrayOfThings
}) {
    
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
            <p>Are you sure you want to {action()} your {type}?</p>
            <div className="actionBtnHolder">
                {(action() === 'delete') &&
                <Delete
                    path={path}
                    nodeID={nodeID}
                    className='color-1'
                    handleModalToggle={handleModalToggle}
                    toggleExpand={toggleExpand}
                />}
                  {(action() === 'archive') &&
                <Archive
                    path={path}
                    nodeID={nodeID}
                    className='color-1'
                    handleModalToggle={handleModalToggle}
                    toggleExpand={toggleExpand}
                    arrayOfThings={arrayOfThings}
                />}
                <Button className='actionBtn color-4' handleClick={handleModalToggle}>
                    Never Mind
                </Button>
            </div>
        </dialog>
    )
}
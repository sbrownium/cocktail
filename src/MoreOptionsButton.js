import React, { useState } from "react";
import Delete from "./Delete";
import Button from "./Button";
import Modal from "./Modal";

export default function MoreEditButton ({
    path,
    nodeID,
    reference,
    toggleExpand,
    arrayOfThings
}) {
    const type = path.replaceAll('/', '').slice(0,-1);

    const action = () => {
        if(arrayOfThings) {
            return 'archive';
         } else {
            return 'delete';
         }
    };

    function handleModalToggle () {
        if (!reference.current.open) {
            reference.current.showModal(); // open modal
        } 
        else {
            reference.current.close(); // close modal
            toggleExpand(); 
        }
    } 
    return (
        <>
            <Button 
                handleClick={handleModalToggle}
                className='textButton'
            >
                {action()}
            </Button>
            <Modal
                reference={reference}
                path={path}
                nodeID={nodeID}
                handleModalToggle={handleModalToggle}
                toggleExpand={toggleExpand}
                arrayOfThings={arrayOfThings}
                type={type}
                action={action}
            />
        </>
    )
}
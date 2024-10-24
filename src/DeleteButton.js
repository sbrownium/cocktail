import React, { useState } from "react";
import Delete from "./Delete";
import Button from "./Button";
import Modal from "./Modal";

export default function DeleteButton ({
    deletePath,
    deleteNodeID,
    handleToggle,
    buttonText,
    className,
    reference,
    message,
    toggleExpand
}) {

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
                Delete
            </Button>
            <Modal
                className={className}
                reference={reference}
                message={message}
                deletePath={deletePath}
                deleteNodeID={deleteNodeID}
                handleModalToggle={handleModalToggle}
                toggleExpand={toggleExpand}
            />
        </>
    )
}
import React, { useState } from "react";
import Delete from "./Delete";
import Button from "./Button";
import Modal from "./Modal";

export default function MoreEditButton ({
    path,
    nodeID,
    reference,
    toggleExpand,
    categoryObject
}) {
    const type = path.replaceAll('/', '').slice(0,-1);

    const thisOne = () => {
        if (categoryObject){
            return Object.values(categoryObject).filter(a => a[type + 'ID'] === nodeID);
        }}

    const action = () => {
        if(categoryObject && thisOne()[0].archived === true) {
            return 'unarchive';
         } if(categoryObject && thisOne()[0].archived === false) {
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
                thisOne={thisOne}
                type={type}
                action={action}
            />
        </>
    )
}
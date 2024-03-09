import React from "react";
import './EditIcon.css';
import PencilIcon from "./PencilIcon";

export default function EditIcon ({handleEdit, handleToggle, beingEditted}){
    return (
        < >
        {beingEditted ? 
        <>
        <button onClick={handleEdit}>Save</button> 
        <button onClick={handleToggle}>Never Mind</button>
        </> : 
        (<button className='edit' onClick={handleEdit}>
            <PencilIcon fillColor='black'/>
        </button>)}
        </>
    )
}
import React from "react";
import './EditIcon.css';
import PencilIcon from "./PencilIcon";

export default function Edit ({handleEdit, beingEditted}){
    return (
        < >
        {beingEditted ? 
        <>
        <button onClick={handleEdit}>Save</button> 
        <button>Never Mind</button>
        </> : 
        (<button className='edit' onClick={handleEdit}>
            <PencilIcon fillColor='black'/>
        </button>)}
        </>
    )
}
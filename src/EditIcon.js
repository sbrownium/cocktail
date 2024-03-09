import React from "react";
import './EditIcon.css';
import PencilIcon from "./PencilIcon";

export default function EditIcon ({handleToggle, beingEditted}){
    return (
        <>
            {beingEditted ? '' :
            <>
                <button className='edit' onClick={handleToggle}>
                    <PencilIcon fillColor='black'/>
                </button>
            </>}
        </>
    )
}
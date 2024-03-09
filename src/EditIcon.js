import React from "react";
import './EditIcon.css';
import PencilIcon from "./PencilIcon";

export default function Edit ({handleEdit}){
    return (
        <>
        <button className='edit' onClick={handleEdit}>
            <PencilIcon fillColor='black'/>
        </button> 
        </>
    )
}
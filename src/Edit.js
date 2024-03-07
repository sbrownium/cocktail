import React from "react";
import './Edit.css';
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
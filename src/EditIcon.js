import React from "react";
import './EditIcon.css';
import PencilIcon from "./PencilIcon";
import Submit from "./Submit";

export default function Edit ({handleEdit}){
    return (
        <>
        <button className='edit' onClick={handleEdit}>
            <PencilIcon fillColor='black'/>
        </button> 
        <Submit value='save'/>
        </>
    )
}
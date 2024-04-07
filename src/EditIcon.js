import React from "react";
import './EditIcon.css';
import PencilIcon from "./PencilIcon";

export default function EditIcon ({handleToggle, beingEditted}){
    return (
        <>
            {beingEditted ? '' :
            <>
                <Button className='edit' onClick={handleToggle}>
                    <PencilIcon fillColor='black' width='16' heigth='16'/>
                </Button>
            </>}
        </>
    )
}
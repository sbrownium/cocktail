import React from "react";
import './Edit.css';


export default function Edit ({handleEdit}){
    return (
        <>
        <button onClick={handleEdit}>Edit</button> 
        {/* {showEdit ? <EditBox/> : ''} */}
        </>
    )
}
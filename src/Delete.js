import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function Delete ({
    deletePath,
    deleteNodeID,
    handleModalToggle
}) {
    
     function handleDelete(e){
        const updates = {};
        e.preventDefault(); 
        handleModalToggle();
        updates[deletePath + deleteNodeID] = null;
        return (
            update(ref(db), updates).then(() => {
                console.log('Data saved successfully!')
          })
      .catch((error) => {
        console.log('problem deleting')
      })
       )    
    }
    return (
        <>
            <Button className={null} handleClick={handleDelete}>
            Delete
            </Button>
        </>
    )
}
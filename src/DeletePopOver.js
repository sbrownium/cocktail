import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function DeletePopOver ({
    path,
    nodeID,
    nodeName,
    handleToggle,
    reset
}) {
    
     function handleDelete(e){
        const updates = {};
        e.preventDefault(); 
        handleToggle();
        reset(); 
        updates[path + nodeID] = null;
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
            <p>Just double-checking, you do want to delete {nodeName}?</p>
            <Button className={null} handleClick={handleDelete}>
            Delete
            </Button>
            <Button className={null} handleClick={handleToggle}>
                Never Mind
            </Button>  
        </>
    )
}
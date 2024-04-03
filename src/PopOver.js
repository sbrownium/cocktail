import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function PopOver ({path, nodeID, nodeName, handleToggle, toggleVisible}) {

    function handleClick(e){
        const updates = {};
        e.preventDefault();
        handleToggle(); 
        updates[path + nodeID] = null;
        return (
            update(ref(db), updates).then(() => {
                console.log('Data saved successfully!')
          })
      .catch((error) => {
        console.log('problem deleting')
      })
       ) 
    };
    
    return (
        <>
            <p>Just double-checking, you do want to delete {nodeName}</p>
            <Button value='Delete' handleClick={handleClick}/>
            <button onClick={toggleVisible}>
                Never Mind
            </button>  
        </>
    )
}
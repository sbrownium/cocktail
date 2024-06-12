import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function ArchiveOrDeletePopOver ({
    path,
    nodeID,
    nodeName,
    handleToggle,
    reset,
    arrayOfThings,
    IDType,
    childArray,
    childIDType,
    action
}) { 
    const thisThing = arrayOfThings.filter(a => a[IDType] === nodeID);
    const childrenOfThing = childArray.filter(a => a[childIDType] === nodeID);

   
    function handleArchive(e){
        const updates = {};
        e.preventDefault();
        const newArchive = {
            ...thisThing[0],
            archived: true,
            lastTimeStamp: Date.now()
          };
          updates[path + nodeID] = newArchive;
          handleToggle();
          reset();
return (
  update(ref(db), updates).then(() => {
        console.log("Data saved successfully!");
    }).catch((error) => {
         console.error("Error updating data:", error);
})
)
}
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
        {(childrenOfThing.length === 0) ? 
            <>
            <p>Do you want to {action} {nodeName}?</p>
            <Button className={null} handleClick={handleDelete}>
            Delete
            </Button>
            </> :
            <p>Do you want to {action} {nodeName}?</p>
            }
            <Button className={null} handleClick={handleArchive}>
            Archive
            </Button>
        </>
    )
}
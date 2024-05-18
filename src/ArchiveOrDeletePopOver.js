import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function ArchiveOrDeletePopOver ({
    drinks,
    path,
    nodeID,
    nodeName,
    handleToggle,
    resetDrinks
}) {
    const thisDrink = Object.values(drinks).filter(drink => drink.drinkID === nodeID); 
    
    function handleArchive(e){
        const updates = {};
        e.preventDefault();
        const newArchive = {
            ...thisDrink[0],
            archived: true,
            lastTimeStamp: Date.now()
          };
          updates[path + nodeID] = newArchive;
          handleToggle();
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
        resetDrinks(); 
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
            <p>Do you want to archive or delete {nodeName}?</p>
            <Button className={null} handleClick={handleDelete}>
            Delete
            </Button>
            <Button className={null} handleClick={handleArchive}>
            Archive
            </Button>
        </>
    )
}
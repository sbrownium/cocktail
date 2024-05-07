import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function ArchivePopOver ({path, nodeID, nodeName, handleToggle, drinks}) {
const thisDrink = drinks.filter(drink => drink.drinkID === nodeID);

    function handleClick(e){
        const updates = {};
        e.preventDefault();
        handleToggle(); 
        const newArchive = {
            ...thisDrink[0],
            archived: true,
          };
          updates[path + nodeID] = newArchive;
return (
  update(ref(db), updates).then(() => {
        console.log("Data saved successfully!");
    }).catch((error) => {
         console.error("Error updating data:", error);
})
)
}
    
    return (
        <>
            <p>Just double-checking, you do want to archive {nodeName}</p>
            <Button className={null} handleClick={handleClick}>
            Archive
            </Button>
            <Button className={null} handleClick={handleToggle}>
                Never Mind
            </Button>  
        </>
    )
}

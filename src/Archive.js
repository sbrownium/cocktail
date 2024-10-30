import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function Archive ({
    path,
    nodeID,
    className,
    handleModalToggle,
    toggleExpand,
    arrayOfThings,
    type
}) {
    
    const thisThing = Object.values(arrayOfThings).filter(a => a[type + 'ID'] === nodeID);

    function handleArchive(e){
        const updates = {};
        e.preventDefault();
        const newArchive = {
            ...thisThing[0],
            archived: true,
            lastTimeStamp: Date.now()
          };
          updates[path + nodeID] = newArchive;
          handleModalToggle();
        toggleExpand();
return (
  update(ref(db), updates).then(() => {
        console.log("Data saved successfully!");
    }).catch((error) => {
         console.error("Error updating data:", error);
})
)}
return (
    <>
        <Button className={className} handleClick={handleArchive}>
        Archive
        </Button>
    </>
)
}
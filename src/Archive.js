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
    thisOne,
    archived
}) {
    function handleArchive(e){
        const updates = {};
        e.preventDefault();

    //    const thisOne = () => {
    //     if (categoryObject && (path !== 'drinks')){ // categoryObject only for archive/unarchive
    //         // return this one
    //         return Object.values(categoryObject).filter(a => a[type + 'ID'] === nodeID)[0];
    //     } if (categoryObject && (path === 'drinks')){ // categoryObject only for archive/unarchive
    //         // return this one
    //         return Object.values(categoryObject).filter(a => a[type + 'ID'] === nodeID);
    //     }
    // } 
        const newArchive = {
            ...thisOne()[0],
            archived: (thisOne()[0].archived === true) ? false : true,
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
        {archived ? `Unarchive` : `Archive` }
        </Button>
    </>
)
}
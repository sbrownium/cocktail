import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function Unarchive({
    path,
    nodeID,
    IDType,
    arrayOfThings
}){
    const thisThing = arrayOfThings.filter(a => a[IDType] === nodeID);

    function handleClick(e){
        const updates = {};
        e.preventDefault();
        const newUnarchive = {
            ...thisThing[0],
            archived: false,
            lastTimeStamp: Date.now()
          };
          updates[path + nodeID] = newUnarchive;
return (
  update(ref(db), updates).then(() => {
        console.log("Data saved successfully!");
    }).catch((error) => {
         console.error("Error updating data:", error);
})
)
}
    return (
            <Button className={null} handleClick={handleClick}>
            Unarchive
            </Button>
    )

}

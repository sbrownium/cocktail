import React from 'react';
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from './Button.js';


export default function DeleteComment ({commentID, handleToggle, beingEditted}) {
    
      
    

    function handleClick(e){
        const updates = {};
      e.preventDefault();
      handleToggle(); 
      updates['/comments/' + commentID] = null;
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
        <Button handleClick={handleClick} value='Delete' />
    )

};

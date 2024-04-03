import React, {useContext} from "react";
import { UserContext } from "./UserContext";
import PencilIcon from "./PencilIcon";
import Button from "./Button";

export default function Edit ({handleToggle, beingEditted, filteredBars, handleClick, selectedBar}) {
    const [user, setUser] = useContext(UserContext);
    const { userID } = user
    // function showEdit(){
    //     if (selectedBar === '' || selectedBar === 'Pick a bar, any bar') {
    //         return false
    //     } else {
    //         return true
    //     }
    // }
    return (
        <>
    {user && filteredBars.length > 0 ? 
       <>
        {beingEditted ? 
      <>
      {/* <Button onClick={handleClick} value='Save'/> */}
        <button onClick={handleToggle}>Never Mind</button>
        
      </>
      :
        <>
        <button className='edit' onClick={handleToggle}>
            <PencilIcon fillColor='black' width='26' heigth='26'/>
        </button>
        
        </>}
        </>
        : '' }
      </>
    )
}
import React, {useContext} from "react";
import { UserContext } from "./UserContext";
import PencilIcon from "./PencilIcon";

export default function Edit ({handleToggleTest, beingEdittedTest, selectedBar}) {
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
        {/* {beingEdittedTest ?  */}
      
        <button className='edit' onClick={handleToggleTest}>
            <PencilIcon fillColor='black' width='26' heigth='26'/>
        </button>
      
      
        
        <button>Save</button>
        <button>Never Mind</button>
        </>
        
      
    )
}
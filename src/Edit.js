import React, {useContext, useState} from "react";
import { UserContext } from "./UserContext";
import PencilIcon from "./PencilIcon";
import Button from "./Button";


export default function Edit ({handleToggle, beingEditted, filteredBars, handleClick, selectedBar}) {
    const [user, setUser] = useContext(UserContext);
    const { userID } = user
    const [allowEdit, setAllowEdit] = useState (false);

    // function toggleEdit () {
    //     setAllowEdit(allowEdit => !allowEdit)
    // }
    // if (filteredBars.length > 0) {
    //     setAllowEdit(true)
    // }
    return (
        <>
            {(user && filteredBars.length > 0) && // checks if user is logged in and if there are any bars selected before displaying edit icon
                <>
                    {beingEditted ? 
                    <Button className={null} handleClick={handleToggle}>
                        Never Mind
                    </Button>
                    :
                    <>
                        <Button className='edit icon' handleClick={handleToggle}>
                            <PencilIcon fillColor='black' width='26' heigth='26'/>
                        </Button>
                    </>}
                </>}
      </>
    )
}
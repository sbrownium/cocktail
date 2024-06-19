import React, {useContext} from "react";
import { UserContext } from "./UserContext";
import PencilIcon from "./PencilIcon";
import Button from "./Button";


export default function Edit ({
    handleToggle,
    beingEditted,
    filteredBar
}) {
    const [user] = useContext(UserContext);
   
    return (
        <>
            {(user && filteredBar.length > 0) && // checks if user is logged in and if there are any bars selected before displaying edit icon
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
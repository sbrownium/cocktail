import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import Button from "./Button";
import XIcon from "./XIcon";
import SignIn from "./SignIn";

export default function SignInModule ({
    message,
    reference,
    handleModuleToggle,
    users,
    handleCommentSubmit
}){
    const [user] = useContext(UserContext)
    useEffect(() => {
        if(user) {
            reference.current.close();
        }
      }, [user]);
  
    return (
        <dialog ref={reference} className='overlay'>
            <div className='buttonHolder'>
                <Button className='modalBtn' handleClick={handleModuleToggle}>
                    <XIcon
                    height='1.25em'
                    fillColor='#303030'
                    />
                </Button>
            </div>
            {message}
            <SignIn
                users={users}
                handleModuleToggle={handleModuleToggle}
                handleCommentSubmit={handleCommentSubmit}
            />
        </dialog>
    )
}
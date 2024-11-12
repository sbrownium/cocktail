import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import Button from "./Button";
import XIcon from "./XIcon";
import SignIn from "./SignIn";
import "./SignInModal.css";

export default function SignInModal ({
    message,
    reference,
    handleToggle,
    users
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
                <Button className='modalBtn' handleClick={handleToggle}>
                    <XIcon
                    height='1.25em'
                    fillColor='#303030'
                    />
                </Button>
            </div>
            <div className='messageHolder'>
                <p>Please sign in to {message}</p>
                <SignIn
                    users={users}
                />
            </div>
        </dialog>
    )
}
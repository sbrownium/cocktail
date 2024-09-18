import React from "react";
import Button from "./Button";
import XIcon from "./XIcon";
import SignIn from "./SignIn";

export default function SignInModule ({
    message,
    reference,
    handleModuleToggle,
    users
}){

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
            />
        </dialog>
    )
}
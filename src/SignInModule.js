import React from "react";
import Button from "./Button";
import XIcon from "./XIcon";
import SignIn from "./SignIn";

export default function SignInModule ({
    message,
    reference,
    handleCloseModule
}){

    return (
        <dialog ref={reference} className='overlay'>
            <div className='buttonHolder'>
                <Button className='modalBtn' handleClick={handleCloseModule}>
                    <XIcon
                    height='1.25em'
                    fillColor='#303030'
                    />
                </Button>
            </div>
            {message}
            <SignIn/>
        </dialog>
    )
}
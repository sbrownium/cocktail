import React from "react";
import Button from "./Button";
import SignIn from "./SignIn";

export default function Alert ({ signIn, setAlert }) {

    return (
        <>
       {/* {signIn && <SignIn />} */}
    <Button className={null} handleClick={setAlert}>
    Got it, but I don't want to sign in
</Button> 
</>
    ) 
}
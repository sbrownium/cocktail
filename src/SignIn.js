import React from 'react'; 

// https://developers.google.com/identity/sign-in/web/sign-in
// https://blog.logrocket.com/guide-adding-google-login-react-app/


export default function SignIn (){
    return (
    <div className="g-signin2" data-onsuccess="onSignIn">
        <button>Sign In with Google</button>
    </div>
    )
}
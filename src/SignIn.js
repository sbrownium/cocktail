import React from 'react'; 

// https://developers.google.com/identity/sign-in/web/sign-in
<script src="https://apis.google.com/js/platform.js" async defer></script>

export default function SignIn (){
    return (
    <div className="g-signin2" data-onsuccess="onSignIn">
        <button>Sign In with Google</button>
    </div>
    )
}
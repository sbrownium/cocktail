import React from 'react'; 
import { GoogleLogin } from '@react-oauth/google';

// https://developers.google.com/identity/sign-in/web/sign-in
// https://blog.logrocket.com/guide-adding-google-login-react-app/


export default function SignIn (){
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
      return (
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      );
}



import React, { useState, useEffect } from 'react'; 
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// https://developers.google.com/identity/sign-in/web/sign-in
// https://blog.logrocket.com/guide-adding-google-login-react-app/
// https://www.dhiwise.com/post/react-google-oauth-the-key-to-secure-and-quick-logins#designing-a-custom-login-button
// https://alexb72.medium.com/how-to-add-google-login-to-a-react-app-37f525cd7f01


export default function SignIn (){
const [userInfo, setUserInfo] = useState([]);
const [profileInfo, setProfileInfo] = useState([]);

    const responseMessage = (response) => {
      const token = response.credential;
      // everything happens here:
      // database request
      
      setUserInfo(response);
      console.log(jwtDecode(token));
    }
    const errorMessage = (error) => {
        console.log(error);
    };

  //   useEffect(
  //     () => {
  //         if (userInfo) {
  //             fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo.credential}`, {
            
  //                 })
  //                 .then((response) => {
  //                     setProfileInfo(response.data);
  //                 })
  //                 .catch((error) => console.log(error));
  //         }
  //     },
  //     [ userInfo ]
  // );
      return (
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      );
}

// export default function SignIn () {
//       const responseMessage = (response) => {
//         console.log(response);
//       }
//       const errorMessage = (error) => {
//           console.log(error);
//       };
//         return (
//           <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
//         );
//   }

//https://www.npmjs.com/package/jwt-decode
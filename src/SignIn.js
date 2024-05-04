import React, { useState, useContext } from 'react'; 
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import Button from './Button.js';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// https://developers.google.com/identity/sign-in/web/sign-in
// https://blog.logrocket.com/guide-adding-google-login-react-app/
// https://www.dhiwise.com/post/react-google-oauth-the-key-to-secure-and-quick-logins#designing-a-custom-login-button
// https://alexb72.medium.com/how-to-add-google-login-to-a-react-app-37f525cd7f01

// https://www.npmjs.com/package/jwt-decode
// React context


export default function SignIn ({users}) {
const [user, setUser] = useContext(UserContext);
const usersArray = Object.values(users);
const provider = new GoogleAuthProvider();

function handleLogOut (e) {
  e.preventDefault();
  googleLogout();
  setUser('');
}

function handleClick (e) {
  e.preventDefault();
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    
    const currentUser = {
            userName: result.user.displayName,
            email: result.user.email,
            userID: result.user.uid
          }  
          setUser(currentUser);
          const existingUser = usersArray.find((u) => u.userID === currentUser.userID )
      if (!existingUser) {
      const newUserKey = push(child(ref(db), '/users/')).key;
      const updates = {};
      updates['/users/' + newUserKey] = currentUser;
  return (
      update(ref(db), updates).then(() => {
          console.log('Data saved successfully!');
    })
    .catch((error) => {
      console.log('problem writing')
    })
  )
}   
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  })
}


  //   const responseMessage = (response) => {
  //     const token = response.credential;
  //     const decoded = jwtDecode(token);
  //     const {name, given_name, family_name, email, sub} = decoded
  //     const currentUser = {
  //       userName: name,
  //       giveName: given_name,
  //       familyName: family_name,
  //       email,
  //       userID: sub
  //     }
  //     setUser(currentUser);
  //     const existingUser = usersArray.find((u) => u.userID === currentUser.userID )
  //     if (!existingUser) {
  //     const newUserKey = push(child(ref(db), '/users/')).key;
  //     const updates = {};
  //     updates['/users/' + newUserKey] = currentUser;
  // return (
  //     update(ref(db), updates).then(() => {
  //         console.log('Data saved successfully!');
  //   })
  //   .catch((error) => {
  //     console.log('problem writing')
  //   })
  // )
  //   }}
  //   const errorMessage = (error) => {
  //       console.log(error);
  //   };
    if (!user) {
      // return (
      //   <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      // )
      return (
        <Button className={null} handleClick={handleClick}>
            Sign In
          </Button>
      )
    }
      else {
        return (
          <Button className={null} handleClick={handleLogOut}>
            Log Out
          </Button>
        )
      }
};


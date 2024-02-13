import React, { useState } from 'react'; 
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// https://developers.google.com/identity/sign-in/web/sign-in
// https://blog.logrocket.com/guide-adding-google-login-react-app/
// https://www.dhiwise.com/post/react-google-oauth-the-key-to-secure-and-quick-logins#designing-a-custom-login-button
// https://alexb72.medium.com/how-to-add-google-login-to-a-react-app-37f525cd7f01

// https://www.npmjs.com/package/jwt-decode
// React context


export default function SignIn ({users}){
const [user, setUser] = useState();

const usersArray = Object.values(users);

    const responseMessage = (response) => {
      const token = response.credential;
      const decoded = jwtDecode(token);
      const {name, given_name, family_name, email, sub} = decoded
      const currentUser = {
        userName: name,
        giveName: given_name,
        familyName: family_name,
        email,
        userID: sub
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
    }}
    const errorMessage = (error) => {
        console.log(error);
    };
      return (
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      );
}


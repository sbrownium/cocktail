import React, { useState, useContext } from 'react'; 
import { GoogleLogin, googleLogout } from '@react-oauth/google';
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


export default function SignIn ({users}){
const [user, setUser] = useContext(UserContext);
const usersArray = Object.values(users);

function handleClick (e) {
  e.preventDefault();
  googleLogout();
  setUser('');
}

    const responseMessage = (response) => {
      const token = response.credential;
      const decoded = jwtDecode(token);
      const {name, given_name, family_name, email, sub} = decoded
      const currentUser = {
        userName: name,
        giveName: given_name,
        familyName: family_name,
        email,
        userID: sub,
        lastBar: '-NqtP2KgP0su3VWrXHaf',
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
    if (!user) {
      return (
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      )}
      else {
        return (
          <Button className={null} handleClick={handleClick}>
            Log Out
          </Button>
        )
      }
};


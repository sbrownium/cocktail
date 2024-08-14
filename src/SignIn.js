import React, { useContext } from 'react'; 
import { googleLogout } from '@react-oauth/google';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import Button from './Button.js';
import GoogleSignInButton from './GoogleSignInButton.js';
import GoogleSignOutButton from './GoogleSignOutButton.js';


export default function SignIn ({
  users,
  handleToggle
}) {
const [user, setUser] = useContext(UserContext);


const usersArray = Object.values(users);
const provider = new GoogleAuthProvider();

function findPreferredName (name) { // emoves last name from UI
  const space = name.indexOf(' '); // finds first space
  return name.substring(0, space) // makes new string from index 0 through first space
}

function handleLogOut (e) {
  e.preventDefault();
  googleLogout();
  setUser('');
  handleToggle();
}

function handleClick (e) {
  e.preventDefault();
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {    
    const currentUser = {
            preferredName: findPreferredName(result.user.displayName),
            userID: result.user.uid
          };
    const newUserPrivate = {
      email: result.user.email,
      userID: result.user.uid,
      userName: result.user.displayName
    }        
          setUser(currentUser);
          const existingUser = usersArray.find((u) => u.userID === currentUser.userID )
      if (!existingUser) {
      const newUserPublicKey = push(child(ref(db), '/usersPublic/')).key;
      const newUserPrivateKey = push(child(ref(db), '/usersPrivate/')).key;
      const updates = {};
      updates['/usersPublic/' + newUserPublicKey] = currentUser;
      // updates['/usersPrivate/' + newUserPrivateKey] = newUserPrivate;
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
  
  })
}
    if (!user) {
      return (
        // <Button className={null} handleClick={handleClick}>
        //     Sign In
        //   </Button>
        <GoogleSignInButton 
          handleClick={handleClick}
        />
      )
    }
      else {
        return (
          <GoogleSignOutButton 
          handleClick={handleLogOut}
        />
          // <Button className={null} handleClick={handleLogOut}>
          //   Log Out
          // </Button>
        )
      }
};
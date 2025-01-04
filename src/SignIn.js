// import React, { useContext, useEffect } from 'react'; 
// import { googleLogout } from '@react-oauth/google';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { ref, child, push, update } from "firebase/database";
// import { db } from "./firebase.js";
// import { UserContext } from './UserContext.js';
// import GoogleSignInButton from './GoogleSignInButton.js';
// import GoogleSignOutButton from './GoogleSignOutButton.js';


// export default function SignIn ({
//   users,
//   setBeingEditted,
//   finishFlowFunction
// }) {
// const [user, setUser] = useContext(UserContext);

// // useEffect(() => {
// //   handleModuleToggle();
// // }, [user]);

// const provider = new GoogleAuthProvider();

// function findPreferredName (name) { // emoves last name from UI
//   const space = name.indexOf(' '); // finds first space
//   return name.substring(0, space) // makes new string from index 0 through first space
// }

// function handleLogOut (e) {
//   e.preventDefault();
//   googleLogout();
//   setUser('');
//   setBeingEditted(false);
// }

// // function handleSignIn () {
// //   handleClick();
// // }

// function handleClick (e) {
//   e.preventDefault();
// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {    
//     const currentUser = {
//             preferredName: findPreferredName(result.user.displayName),
//             userID: result.user.uid
//           };
//     const newUserPrivate = {
//       email: result.user.email,
//       userID: result.user.uid,
//       userName: result.user.displayName
//     }        
//           setUser(currentUser);
          
//           const usersArray = Object.values(users);
//           const existingUser = usersArray.find((u) => u.userID === currentUser.userID)
//       if (!existingUser) {
//       const newUserPublicKey = push(child(ref(db), '/usersPublic/')).key;
//       const newUserPrivateKey = push(child(ref(db), '/usersPrivate/')).key;
//       const updates = {};
//       updates['/usersPublic/' + newUserPublicKey] = currentUser;
//       // updates['/usersPrivate/' + newUserPrivateKey] = newUserPrivate;
      
//   return (
//       update(ref(db), updates).then(() => {
//           console.log('Data saved successfully!');
//           finishFlowFunction(); 
//     })
//     .catch((error) => {
//       console.log('problem writing')
//     })
//   )
// }   
//   }).catch((error) => {
  
//   })
  
// }

//     if (!user) {
//       return (
//         // <Button className={null} handleClick={handleClick}>
//         //     Sign In
//         //   </Button>
//         <GoogleSignInButton 
//           handleClick={handleClick}
//         />
//       )
//     }
//       else {
//         return (
//           <GoogleSignOutButton 
//           handleClick={handleLogOut}
//         />
//           // <Button className={null} handleClick={handleLogOut}>
//           //   Log Out
//           // </Button>
//         )
        
//       }
      
// };
// import React, { useContext } from 'react';
// import { googleLogout } from '@react-oauth/google';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { ref, child, push, update } from "firebase/database";
// import { db } from "./firebase.js";
// import { UserContext } from './UserContext.js';
// import GoogleSignInButton from './GoogleSignInButton.js';
// import GoogleSignOutButton from './GoogleSignOutButton.js';

// export default function SignIn({
//   users,
//   setBeingEditted,
//   finishFlowFunction,
//   onSignInSuccess
// }) {
//   const [user, setUser] = useContext(UserContext);
//   const provider = new GoogleAuthProvider();

//   function findPreferredName(name) {
//     const space = name.indexOf(' ');
//     return space !== -1 ? name.substring(0, space) : name; // handles case where there's no space
//   }

//   function handleLogOut(e) {
//     e.preventDefault();
//     googleLogout();
//     setUser('');
//     // setBeingEditted(false);
//   }

//   async function handleClick(e) {
//     e.preventDefault();
//     await handleLogIn();
//     if (onSignInSuccess) {
//       onSignInSuccess(); // This triggers updateRating in NewRating
//     }
//   }
//   async function handleLogIn() {
//   const auth = getAuth();
//   signInWithPopup(auth, provider)
//     .then((result) => {    
//       const currentUser = {
//               preferredName: findPreferredName(result.user.displayName),
//               userID: result.user.uid
//             };
//       const newUserPrivate = {
//         email: result.user.email,
//         userID: result.user.uid,
//         userName: result.user.displayName
//       }        
//             setUser(currentUser);
            
//             const usersArray = Object.values(users);
//             const existingUser = usersArray.find((u) => u.userID === currentUser.userID)
//         if (!existingUser) {
//         const newUserPublicKey = push(child(ref(db), '/usersPublic/')).key;
//         const newUserPrivateKey = push(child(ref(db), '/usersPrivate/')).key;
//         const updates = {};
//         updates['/usersPublic/' + newUserPublicKey] = currentUser;
//         // updates['/usersPrivate/' + newUserPrivateKey] = newUserPrivate;
        
//     return (
//         update(ref(db), updates).then(() => {
//             console.log('Data saved successfully!');
//             finishFlowFunction(); 
//       })
//       .catch((error) => {
//         console.log('problem writing: ', error)
//       })
//     )
//   }   
//     }).catch((error) => {
//       console.error('Error signing in or saving data:', error);
//     })
    
//   }
//   //   async function handleLogIn() {
//   //   const auth = getAuth();
    
//   //   try {
//   //     const result = await signInWithPopup(auth, provider);
//   //     const currentUser = {
//   //       preferredName: findPreferredName(result.user.displayName),
//   //       userID: result.user.uid,
//   //     };
//   //     const newUserPrivate = {
//   //       email: result.user.email,
//   //       userID: result.user.uid,
//   //       userName: result.user.displayName,
//   //     };

//   //     setUser(currentUser);

//   //     // Check if user already exists in users object
//   //     const usersArray = Object.values(users);
//   //     const existingUser = usersArray.find((u) => u.userID === currentUser.userID);

//   //     // Add user to Firebase if not existing
//   //     if (!existingUser) {
//   //       const newUserPublicKey = push(child(ref(db), '/usersPublic/')).key;
//   //       const newUserPrivateKey = push(child(ref(db), '/usersPrivate/')).key;

//   //       const updates = {};
//   //       updates['/usersPublic/' + newUserPublicKey] = currentUser;
//   //       updates['/usersPrivate/' + newUserPrivateKey] = newUserPrivate;

//   //       await update(ref(db), updates);
//   //       console.log('Data saved successfully!');
//   //     }
//   //     // Finish flow function only after updating the database
//   //     // finishFlowFunction();
      
//   //   } catch (error) {
//   //     console.error('Error signing in or saving data:', error);
//   //   }
//   // }
  

  
//   // Conditional rendering based on whether the user is signed in
//   return user ? (
//     <GoogleSignOutButton handleClick={handleLogOut} />
//   ) : (
//     <GoogleSignInButton handleClick={handleClick} />
//   );
// }
import React, { useContext , useState} from 'react';
import { googleLogout } from '@react-oauth/google';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import GoogleSignInButton from './GoogleSignInButton.js';
import GoogleSignOutButton from './GoogleSignOutButton.js';

export default function SignIn({
  users,
  setBeingEditted,
  finishFlowFunction,
  onSignInSuccess
}) {
  const [user, setUser] = useContext(UserContext);
  const provider = new GoogleAuthProvider();

  function findPreferredName(name) {
    const space = name.indexOf(' ');
    return space !== -1 ? name.substring(0, space) : name;
  }

  function handleLogOut(e) {
    e.preventDefault();
    googleLogout();
    setUser('');
  }

  async function handleClick(e) {
    e.preventDefault();
    const success = await handleLogIn();
    // const updateSuccess = await handleAddUser(success);
    await handleAddUser(success);
    // const userSet = await setUser({
    //   preferredName: findPreferredName(success.user.displayName),
    //   userID: success.user.uid,
    // });
    const userSet = await handleSetUser(success);
    if (userSet && onSignInSuccess) {
        await onSignInSuccess(userSet);
      }
      // } catch (error) {
      //   console.error('Error during sign-in flow:', error);
      // }


    // try {
    //   //Wait for handleLogIn to complete fully before proceeding
      
    //   if (success && onSignInSuccess) {
    //       onSignInSuccess(success);
    // }
    // } catch (error) {
    //   console.error('Error during sign-in flow:', error);
    // }
  }

  async function handleSetUser(params) {
    setUser({
      preferredName: findPreferredName(params.user.displayName),
      userID: params.user.uid
  });
  return params.user.uid;
  }
  
  async function handleAddUser (result) {
      // Check if user already exists in the database
      const usersArray = Object.values(users);
      const existingUser = usersArray.find((u) => u.userID === result.user.uid);
     
      const currentUser = {
        preferredName: findPreferredName(result.user.displayName),
        userID: result.user.uid,
      }
      const newUserPrivate = {
        email: result.user.email,
        userID: result.user.uid,
        userName: result.user.displayName
      }    
  
    try {
      if (!existingUser) {
        const newUserPublicKey = push(child(ref(db), '/usersPublic/')).key;
        const newUserPrivateKey = push(child(ref(db), '/usersPrivate/')).key;
      
        const updates = {};
        updates['/usersPublic/' + newUserPublicKey] = currentUser;
        updates['/usersPrivate/' + newUserPrivateKey] = newUserPrivate;
      
        // Ensure the database update is fully awaited
        await update(ref(db), updates);
        console.log('Data saved successfully!');
      }
      return true
    }
      catch (error) {
            console.error('Error saving data:', error);
            throw error; // Ensure errors are propagated up to handleClick
          }

  }

  // async function handleLogIn() {
  //   const auth = getAuth();
  
  //   try {
  //     const result = await signInWithPopup(auth, provider);
   
  //     const currentUser = {
  //       preferredName: findPreferredName(result.user.displayName),
  //       userID: result.user.uid,
  //     };
  //     const newUserPrivate = {
  //       email: result.user.email,
  //       userID: result.user.uid,
  //       userName: result.user.displayName,
  //     };

  //     // Update User Context
  //     setUser(currentUser);
  
  //     // Check if user already exists in the database
  //     const usersArray = Object.values(users);
  //     const existingUser = usersArray.find((u) => u.userID === currentUser.userID);
  
  //     if (!existingUser) {
  //       const newUserPublicKey = push(child(ref(db), '/usersPublic/')).key;
  //       const newUserPrivateKey = push(child(ref(db), '/usersPrivate/')).key;
      
  //       const updates = {};
  //       updates['/usersPublic/' + newUserPublicKey] = currentUser;
  //       updates['/usersPrivate/' + newUserPrivateKey] = newUserPrivate;
      
  //       // Ensure the database update is fully awaited
  //       await update(ref(db), updates);
  //       console.log('Data saved successfully!');
  //     }
  //     return currentUser.userID;
      
  
  //   } catch (error) {
  //     console.error('Error signing in or saving data:', error);
  //     throw error; // Ensure errors are propagated up to handleClick
  //   }
  
  // }
  async function handleLogIn() {
    const auth = getAuth();
  
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
      } 
      catch (error) {
      console.error('Error signing in:', error);
      throw error; // Ensure errors are propagated up to handleClick
    }
  
  }
  

  // Conditional rendering based on whether the user is signed in
  return user ? (
    <GoogleSignOutButton handleClick={handleLogOut} />
  ) : (
    <GoogleSignInButton handleClick={handleClick} />
  );
}

import React from 'react';
import Read from './Read.js';
import { GoogleLogin } from '@react-oauth/google';
// import SignIn from './SignIn.js';

function App() {
  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};
  return (
    <>
    <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    {/* <SignIn/> */}
    <Read/>
    </>
  );
}

export default App;

/* 
Login page
  • Username
  • password
  • Attempt to only make field for sign-up/login. Queries the database for username and
  if you can't find it then takes to new sign-up step

Restaurant page
  • Restaurant name
  • Drink list
    – Name
    - Description
  • Comments
    - Add new
    - Expand/read

Database
  • Needs to contain:
    - username
    - password
    - comments
      • date
      • thumbs up, down, the best emoji, and puke face
*/
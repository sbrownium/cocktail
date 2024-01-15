import React from 'react';
import Bar from './Bar.js';
import Read from './Read.js';

function App() {
  return (
    <>
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
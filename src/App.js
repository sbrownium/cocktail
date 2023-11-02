import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
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
import './App.css';
import Login from "./presenter/LoginPresenter"
import {Authenticate} from './integration/DBCaller'
import {useState, useEffect} from 'react';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const setLoggedInState = (bool) =>{
    console.log(bool)
    setLoggedIn(bool);
}
  function callDB(user){
    Authenticate(user, setLoggedInState);
  }
  return (
    <div className="App">
      <Login callDB = {callDB} loggedIn={loggedIn}/>
    </div>
  );
}

export default App;

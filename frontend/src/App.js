import './App.css';
import Login from "./presenter/LoginPresenter"
import {Authenticate} from './integration/DBCaller'
import React, { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const forceUpdate = React.useCallback(() => React.updateState({}), []);
  
  function callDB(user){
    Authenticate(user);
  }
  return (
    <div className="App">
      <Login callDB = {callDB} user={user}/>
    </div>
  );
}

export default App;

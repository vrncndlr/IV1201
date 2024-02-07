import './App.css';
import Login from "./presenter/LoginPresenter"
import Registration from "./presenter/RegistrationPresenter";
import {Authenticate} from './integration/DBCaller'
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// Express-based auth server that uses JWT tokens to authenticate users
// npm i cors bcrypt jsonwebtoken lowdb

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const forceUpdate = React.useCallback(() => React.updateState({}), []);
  
  function callDB(user){
    Authenticate(user);
  }
  return (
        <div className={"App"}>
          <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
            </Routes>
          </Router>
        </div>)
}

export default App;

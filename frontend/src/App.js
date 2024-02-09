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
  const [userObject, setUserObject] = useState({});
  const[failedLogin, setFailedLogin] = useState(false);

  async function setLoggedInState(bool, loggedInUser){
    setUserObject(loggedInUser);
    setLoggedIn(bool);
  }

  async function callDB(user){
    const response = await Authenticate(user);
    if(response === 404)
      setFailedLogin(true)
    await setLoggedInState(true, response)
  }
  return (
        <div className={"App"}>
          <Router>
            <Routes>
                <Route path="/login" element={<Login callDB = {callDB} failedLogin = {failedLogin} user = {userObject}/>}/>
                <Route path="/register" element={<Registration/>}/>
            </Routes>
          </Router>
        </div>)
}

export default App;

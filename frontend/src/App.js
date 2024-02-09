import './App.css';
import Login from "./presenter/LoginPresenter"
import Registration from "./presenter/RegistrationPresenter";
import Error from "./view/ErrorView";
import {Authenticate} from './integration/DBCaller'
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// Express-based auth server that uses JWT tokens to authenticate users
// npm i cors bcrypt jsonwebtoken lowdb

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState({});
  const[failedLogin, setFailedLogin] = useState(false);
  const[error, setError] = useState(false);

  async function callDB(user){
    const response = await Authenticate(user);
    if(response === 404)
      setFailedLogin(true)
    else if(response !== 200 && response.name === undefined){
      console.log(response.status)
      console.log("error code in http response")
      setError(true)
    }
    else{
      console.log("loginpresenter")
      console.log(response)
      setUserObject(response)
      setLoggedIn(true)
    }
  }
  return (
        <div className={"App"}>
          <Router>
            <Routes>
                <Route path="/login" element={!error && <Login 
                  callDB = {callDB} 
                  failedLogin = {failedLogin} 
                  user = {userObject}
                  loggedIn={loggedIn}/>}/>
                <Route path="/register" element={!error && <Registration/>}/>
                
            </Routes>
          </Router>
          <div>{error && <Error/>}</div>
        </div>)
}

export default App;

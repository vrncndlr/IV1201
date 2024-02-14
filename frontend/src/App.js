import './App.css';
import Login from "./presenter/LoginPresenter"
import Registration from "./presenter/RegistrationPresenter";
import Error from "./view/ErrorView";
import {Authenticate, saveRegistrationData} from './integration/DBCaller'
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// 

/** Express-based auth server that uses JWT tokens to authenticate users
 * npm i cors bcrypt jsonwebtoken lowdb
 * 
 * Renders all the site presenters and ErrorView
 * 
 @returns LoginPresenter - handles logic for login and calls the relevant views
 * RegistrationPresenter - handles logic for registration and calls the relevant views.
 * ErrorView - shows simple error message on server error during api calls. 
 */
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState({});
  const[failedLogin, setFailedLogin] = useState(false);
  const[error, setError] = useState(false);

  /**
   * Function that calls the backend api and sets the result as the user state 
   * and sets loggedIn boolean state to true in LoginPresenter on a succesful api call. 
   * Also handles errors in failed api calls.
   * @async
   * @param {Object} user takes argument on the form of: {username: 'username', password:'pw'}
   * 
   */
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

    /**
     *
     * @param fieldValues The values provided by the user trying to register
     * @returns {Promise<void>}
     */
    async function handleRegistration(fieldValues) {
        try {
            // Make API call to register the user
            const response = await saveRegistrationData(fieldValues);
            // Check if registration was successful
            if (response && response.status === 201) {
                // Registration successful, do something (e.g., redirect to login page)
                console.log('User registered successfully');
            } else {
                // Registration failed, handle error (e.g., display error message)
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error registering user:', error);
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
                <Route path="/register" element={!error && <Registration
                    handleRegistration={handleRegistration}/>}/>
                <Route path="/error" element={error && <Error/>}  />
            </Routes>
          </Router>
          <div>{error && <Error/>}</div>
        </div>)
}

export default App;

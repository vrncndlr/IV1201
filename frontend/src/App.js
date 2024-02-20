import './styling/App.css';
import Login from "./presenter/LoginPresenter"
import Registration from "./presenter/RegistrationPresenter";
import MissingUserDataUpdate from "./presenter/UpdateMissingUserDataPresenter";
import Applicant from "./presenter/ApplicantPresenter"
import Error from "./view/ErrorView";

import {Authenticate, saveRegistrationData, restoreAccountByEmail, saveUpdatedData} from './integration/DBCaller'
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";

/** Express-based auth server that uses JWT tokens to authenticate users
 * npm i cors bcrypt jsonwebtoken lowdb
 * 
 * Renders all the site presenters and ErrorView
 * Saves loggedIn state in sessionStorage for persistance;
 * When the application refreshes, check if the user information exists in sessionStorage
 * 
 @returns LoginPresenter - handles logic for login and calls the relevant views
 *        RegistrationPresenter - handles logic for registration and calls the relevant views.
 *        ErrorView - shows simple error message on server error during api calls.
 */
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState({});
  const[failedLogin, setFailedLogin] = useState(false);
  
  const[error, setError] = useState(false);
  const [registered, setRegistered] = useState(false);

    useEffect(() => {
    // Check sessionStorage on page load
    const user = sessionStorage.getItem('user');
    if (user) {
        setLoggedIn(true);
        setUserObject(JSON.parse(user));
        }
    }, []);
    /**
     * Attempt to fetch rows from table competence in db,
     * so far not working

    useEffect(()=> {
        fetchTable().then((result)=>{
            setCompetenceObject(result);
        }).catch(error=>{
            console.error("Failed to fetch from database: ", error);
        });
    }, []) */

  /**
   * Function that calls the backend api and sets the result as the user state 
   * and sets loggedIn boolean state to true in LoginPresenter on a successful api call.
   * Also handles errors in failed api calls.
   * @async
   * @param {Object} user takes argument on the form of: {username: 'username', password:'pw'}
   * 
   */
  async function callDB(user){
    const response = await Authenticate(user);
    try{
      if(response === 404)
        setFailedLogin(true)
      else if(response === 500)
        throw new Error("500 http code from server")
      else{
        console.log("loginpresenter")
        console.log(response)
        setFailedLogin(false)
        setUserObject(response)
        setLoggedIn(true)
        sessionStorage.setItem('user', JSON.stringify(response));
      }
    }catch(e){
      console.log("response in callDB: " + response)
      console.log(`error in callDB: ${e}`)
      setError(true)
    }
  }
    /**
     * Function that calls the backend api,
     * sets 'registered' boolean state to true on a successful api call.
     * @param fieldValues The values provided by the user trying to register as an object
     */
    async function handleRegistration(fieldValues) {
        try {
            const response = await saveRegistrationData(fieldValues);
            if (response) {
                console.log('User registered successfully');
                setRegistered(true);
            } else {
                console.error('Registration failed:', response.statusText);
                setRegistered(false);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setRegistered(false);
        }
    }
    

  async function updateUserData(email){
    console.log("jsoning email")
    console.log(JSON.stringify(email))
    restoreAccountByEmail(email)
  }

  return (<div className={"App"}><Router>
            <Routes>
                <Route path="/" element={!error && <Login
                      callDB = {callDB}
                      failedLogin = {failedLogin}
                      user = {userObject}
                      loggedIn={loggedIn}/>}/>
                <Route path="/register" element={!error && <Registration
                        handleRegistration={handleRegistration}
                        registered={registered}/>}/>
                <Route path="/updateUser" element = {!error && <MissingUserDataUpdate 
                  updateUserData = {updateUserData}/>}/>
                <Route path="/register" element={!error && <Registration/>}/>
                <Route path="/apply" element={loggedIn ? <Applicant
                        user = {userObject}
                        /> : <Error/>} />
                <Route path="/error" element={error && <Error/>}  />
                
            </Routes>
          </Router>
          
          <div>{error && <Error/>}</div>
        </div>)
}

export default App;

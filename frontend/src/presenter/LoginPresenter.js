import LoginView from "../view/LoginView";
import UserView from "../view/UserView"
import React, { useState} from "react";
import Applicant from "./ApplicantPresenter";

/**
 * Handles logic for login-related views
 * @param {Object} params
 * @param {boolean} props.loggedIn - true if user is logged in
 * @param {boolean} props.failedLogin - true if the user has tried to log in and failed
 * @param {function} props.callDB - login function that calls the backend api to login user
 * @returns LoginView - view that shows the login page
 * FailedLoginView - shows the LoginView with added error message about failed login
 * UserView - landing page after succesful login
 */
export default function Login(props) {

    return (<>
      <div>{!props.loggedIn && <LoginView 
          loggedIn = {props.loggedIn}
          failedLogin = {props.failedLogin}
          onLogin={props.callDB}/>}</div>
      <div>{props.loggedIn && <UserView user={props.user}/>}</div>
    </>)
}
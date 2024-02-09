import LoginView from "../view/LoginView";
import FailedLoginView from "../view/FailedLoginView"
import UserView from "../view/UserView"
import React, { useState , useEffect} from "react";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (<>
      <div>{!props.loggedIn && !props.failedLogin &&  <LoginView onLogin={props.callDB}/>}</div>
      <div>{props.loggedIn && <UserView user={props.userObject}/>}</div>
      <div>{props.failedLogin && <FailedLoginView onLogin={props.callDB}/>}</div>
    </>)
}
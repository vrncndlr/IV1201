import LoginView from "../view/LoginView";
import FailedLoginView from "../view/FailedLoginView"
import UserView from "../view/UserView"
import React, { useState , useEffect} from "react";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userObject, setUserObject] = useState({});
    const[failedLogin, setFailedLogin] = useState(false);

    function setLoggedInState(bool, loggedInUser){
      setUserObject(loggedInUser);
      setLoggedIn(bool);
    }

    async function loginACB(cred) {
      if(!cred) return null;
      const URL = 'http://localhost:8000/login';
      try{
      const response = await fetch(URL, 
          {method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cred)}
          ,{mode:'cors'},
        );
      if(response.status === 404){
        console.log("backend api response");
        console.log(response);
        console.log("bad username or password")
        setFailedLogin(true);
        return;
      }
      else{
        const user = await response.json()
        if(user.name){
            console.log("dbc")
            console.log(user);
            setLoggedInState(true, user);
          }
        }
      }catch(error){console.log(error)};
    }

    return (<>
      <div>{!loggedIn && !failedLogin &&  <LoginView onLogin={loginACB}/>}</div>
      <div>{loggedIn && <UserView user={userObject}/>}</div>
      <div>{failedLogin && <FailedLoginView onLogin={loginACB}/>}</div>
    </>)
}
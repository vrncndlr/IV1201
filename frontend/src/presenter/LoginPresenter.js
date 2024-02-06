import LoginView from "../view/LoginView";
import UserView from "../view/UserView"
import React, { useState , useEffect} from "react";
import {useState, useEffect} from 'react';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userObject, setUserObject] = useState({});
    let user;
    function setLoggedInState(bool, loggedInUser){
        console.log(bool);
        console.log(user);
        setUserObject(loggedInUser);
        setLoggedIn(bool);
      }
      async function loginACB(cred) {
        if(!cred) return null;
        const URL = 'http://localhost:8000/login';
        fetch(URL, 
            {method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(cred)}
            ,{mode:'cors'},
          ).then(response => response.json())
          .then(user=>{
            console.log("dbc")
            console.log(user.name);
            setLoggedInState(true, user);
          })
          .catch(error => console.log(error));
        console.log("in presenter")
        console.log(userObject);
    }
    return (<>
        <div>{!loggedIn && <LoginView onLogin={loginACB}/>}</div>
        <div>{loggedIn && <UserView user={user}/>}</div>
        </>
    )
}
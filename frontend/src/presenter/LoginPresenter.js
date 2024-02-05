import LoginView from "../view/LoginView";
import UserView from "../view/UserView"
import React, { useState , useEffect} from "react";
export default

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

      let cred;
      let user;
      let pass;
    
    async function loginACB(cred) {
        if(!cred) return null;
        //let user = cred.username; //code to show object
        //let pass = cred.password; //it needs model?   user = await 
        console.log(cred);
        user = await props.callDB(cred)
        console.log("in presenter")
        console.log({user});
        //setLoggedIn(true);
        //setLoggedInState(true);
    }

    return (<>
      <div>{!props.loggedIn && <LoginView onLogin={loginACB} username={user} password={pass}/>}</div>
      <div>{props.loggedIn && <UserView user={user}/>}</div></>)
}
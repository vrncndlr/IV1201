import LoginView from "../view/LoginView";
import UserView from "../view/UserView"
import {useState, useEffect} from 'react';

export default function Login(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    let user;
    const setLoggedInState = (bool) =>{
        console.log(bool);
        setLoggedIn(bool);
      }
    async function loginACB(cred) {
        if(!cred) return null;
        //let user = cred.username; //code to show object
        //let pass = cred.password; //it needs model?   user = await 
        console.log(cred);
        user = await props.callDB(cred, setLoggedInState);
        console.log("in presenter")
        console.log({user});
        setLoggedIn(true);
        //setLoggedInState(true);
    }
    //console.log(cred)
    return (<>
        <div>{!loggedIn && <LoginView onLogin={loginACB}/>}</div>
        <div>{loggedIn && <UserView user={user}/>}</div>
        </>
    )
}

function Login2(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    let user;
    const setLoggedInState = (bool) =>{
        return setLoggedIn(bool);
    }
    async function loginACB(cred) {
        if(!cred) return null;
        //let user = cred.username; //code to show object
        //let pass = cred.password; //it needs model?   user = await 
        console.log(cred);
        user = await props.callDB(cred, setLoggedInState)
        console.log("in presenter")
        console.log({user});
        //setLoggedIn(true);
        //setLoggedInState(true);
    }
    //console.log(cred)
    return (<>
        <div>{!loggedIn && <LoginView onLogin={loginACB}/>}</div>
        <div>{loggedIn && <UserView user={user}/>}</div>
        </>
    )
}
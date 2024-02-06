import LoginView from "../view/LoginView";
import React, { useState } from "react";
export default

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

      let cred;
      let user;
      let pass;
          function loginACB(cred) {
              user = cred.username; //code to show object
              pass = cred.password; //it needs model?
              console.log(cred)
              props.callDB(cred);
          }

    return (
        <LoginView
            onLogin={loginACB}
            username={user}
            password={pass}
        />
    )
}
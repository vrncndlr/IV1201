import React, { useState } from 'react';
import '../styling/forms.css'
import {Link} from 'react-router-dom';
/**
 * 
 * @param {function} onLogin takes username and password and passes it to the login API in the backend
 * @returns forms for entering username and password
 */
function LoginView(props) {
    let username ="";
    let password="";
    const [error, setError] = useState('');
    function usernameHandlerACB(e){username=e.target.value; }
    function passwordHandlerACB(e){password=e.target.value}

    //two different functions are called at two different places in the forms, both handleSubmit and loginACB
    function loginACB(){
        props.onLogin({
            username: username,
            password: password
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }
    };

    return (
        <div className={"mainContainer"}>
            <h1>Welcome!</h1>
            <p>Please sign in before submitting an application</p>
            <form onSubmit={handleSubmit}>
                <div className={"inputGroup"}>
                    <input type="username"
                           placeholder="Username"
                           onChange={usernameHandlerACB}
                           className={"inputBox"}/>
                </div>
                <div className={"inputGroup"}>
                    <input onChange={passwordHandlerACB}
                           type={"password"}
                           placeholder="Password"
                           className={"inputBox"}/>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit" onClick={loginACB}>Log in</button>
            </form>
            <p>Not registered? <Link to={"/register"}>Sign up here</Link></p>
            <p>Add username and password to an existing account? <Link to={"/updateUser"}>Click here</Link></p>
        </div>
    )
}

export default LoginView;
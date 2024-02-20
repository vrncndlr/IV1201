import React, { useState } from 'react';
import '../styling/forms.css'
import {Link} from 'react-router-dom';
import {useFormik} from 'formik'
/**
 * 
 * @param {function} onLogin takes username and password and passes it to the login API in the backend
 * @returns forms for entering username and password
 */
function LoginView(props) {
    let username ="";
    let password="";

    //two different functions are called at two different places in the forms, both handleSubmit and loginACB
    function loginACB(){
        props.onLogin({
            username: username,
            password: password
        })
    }

    const formik = useFormik({
        // Manage form state
        initialValues: {
            username: '',
            password: '',
        },
        // Submit form data
        onSubmit: async (values) => {
            try {
                console.log(values)
                await props.onLogin(values);
            } catch (error) {
                // Handle error during login
                console.error('Error logging in user:', error);
            }
        },
        // Validate form fields
        validate: values => {
            let errors = {}
            if(!values.username){errors.username = "Required"}
            if(!values.password){errors.password = "Required"}
            return errors
        }
    })
    return(<div className={"mainContainer"}>
            <h1>Login here</h1>
            {props.failedLogin && <div>Bad username or password</div>}
            <div className={"inputContainer"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="inputGroup">
                        <label htmlFor={"username"}>Username</label>
                        <input type={"text"} id={"username"} name={"username"}
                               onChange={formik.handleChange}
                               value={formik.values.username}/>
                        {formik.errors.username ? <div className={"error-message"}>{formik.errors.username}</div> : null}
                    </div>
                    <div className="inputGroup">
                        <label htmlFor={"password"}>Password</label>
                        <input type={"password"} id={"password"} name={"password"}
                               onChange={formik.handleChange}
                               value={formik.values.password}/>
                        {formik.errors.password ? <div className={"error-message"}>{formik.errors.password}</div> : null}
                    </div>
                <button type={"submit"}>Log in</button>
                </form>
            </div>
        </div>)
}

export default LoginView;
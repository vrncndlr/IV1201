import React, {useState} from "react";
import '../styling/forms.css'
import {Link} from 'react-router-dom';

function RegistrationView(props) {
    const [formInput, setFormInput] = useState({
        firstname:"",
        lastname:"",
        username:"",
        pid:"",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formError, setFormError] = useState({
        firstname:"",
        lastname:"",
        username:"",
        pid:"",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const validateFormInput = (event) => {
        event.preventDefault();
        let inputError = {
            firstname:"",
            lastname:"",
            username:"",
            pid:"",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!formInput.email && !formInput.password) {
            setFormError({
                ...inputError,
                firstname:"Enter your first name",
                lastname:"Enter your last name",
                username:"Enter a username",
                pid:"Enter your personal identification number, 10 digits",
                email: "Enter valid email address",
                password: "Password should not be empty",
                confirmPassword: "Password and confirm password should be same",
            });
            return
        }
        if (!formInput.firstname) {
            setFormError({
                ...inputError,
                firstname:"Enter your first name",
            });
            return
        }
        if (!formInput.lastname) {
            setFormError({
                ...inputError,
                lastname:"Enter your last name",
            });
            return
        }
        if (!formInput.username) {
            setFormError({
                ...inputError,
                username:"Enter a username",
            });
            return
        }

        if (!formInput.email) {
            setFormError({
                ...inputError,
                email: "Enter valid email address",
            });
            return
        }

        if (!formInput.pid) {
            setFormError({
                ...inputError,
                email: "Enter valid email address",
            });
            return
        }

        if (formInput.confirmPassword !== formInput.password) {
            setFormError({
                ...inputError,
                confirmPassword: "Password and confirm password should be same",
            });
            return;
        }

        if (!formInput.password) {
            setFormError({
                ...inputError,
                pid:"Enter your personal identification number, 10 digits",
            });
            return
        }

        setFormError(inputError);
    };
    /* gamla
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstname || !lastname ||
            !email || !pid || !username|| !password) {
            setError('Please fill in all fields');
            return;
        }
        // Your sign-in logic here
    };
     */
    //TODO Missing fields check -> error message. <FORM/>?

    return (
        <div className={"mainContainer"}>
            <h1>Sign up</h1>
            <form onSubmit={validateFormInput}>
                {/*First name*/}
                <p className={"label"}>First Name</p>
                <input type="text"
                       value={formInput.firstname}
                       onChange={({ target }) => {
                           handleUserInput(target.name, target.value);}}
                       name={"firstname"}
                       placeholder="First Name"
                       className={"registerField"}/>
                <p className={"error-message"}>{formError.firstname}</p>
                <p className={"label"}>Last Name</p>
                {/*Last name*/}
                <input type="text"
                       value={formInput.lastname}
                       onChange={({ target }) => {
                           handleUserInput(target.name, target.value);}}
                       name={"lastname"}
                       placeholder="Last Name"
                       className={"registerField"}/>
                <p className={"error-message"}>{formError.lastname}</p>
                {/*Username*/}
                <p className={"label"}>Username</p>
                <input type="text"
                       value={formInput.username}
                       onChange={({ target }) => {
                           handleUserInput(target.name, target.value);}}
                       name={"username"}
                       placeholder="Username"
                       className={"registerField"}/>
                <p className={"error-message"}>{formError.username}</p>
                {/*Email*/}
                <p className={"label"}>Email</p>
                <input value={formInput.email}
                       type="email"
                       onChange={({ target }) => {
                           handleUserInput(target.name, target.value);}}
                       name={"email"}
                       placeholder="Email address"
                       className={"registerField"}/>
                <p className={"error-message"}>{formError.email}</p>
                {/*Personal id nr*/}
                <p className={"label"}>Personal ID number</p>
                <input type="number"
                       value={formInput.pid}
                       onChange={({ target }) => {
                           handleUserInput(target.name, target.value);}}
                       name={"pid"}
                       placeholder="Personal Identity Number"
                       className={"registerField"}/>
                <p className={"error-message"}>{formError.pid}</p>
                {/*Password*/}
                <p className={"label"}>Password</p>
                <input type="password"
                       value={formInput.password}
                       onChange={({ target }) => {
                           handleUserInput(target.name, target.value);}}
                       name="password"
                       placeholder="Password"
                       className={"registerField"}/>
                <p className={"error-message"}>{formError.password}</p>
                {/*Confirm password*/}
                <p className={"label"}>Confirm your password</p>
                <input type="password"
                       value={formInput.confirmPassword}
                       onChange={({ target }) => {
                           handleUserInput(target.name, target.value);}}
                       name="confirmPassword" placeholder="Confirm password"
                       className={"registerField"}/>
                <p className={"error-message"}>{formError.confirmPassword}</p>


                <p>Already a member? <Link to={"/login"}>Login</Link></p>
                <button>Submit & register</button>
                {/*<div className={"errorContainer"}>
                    {error && <div style={{color: 'red'}}>{error}</div>}
                </div>*/}
            </form>

        </div>
    )
}

export default RegistrationView;
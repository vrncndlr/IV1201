import React from "react";
import '../styling/forms.css';
import {useFormik} from "formik";

export default function UserCardView({user, handleSave}) {

    const formik = useFormik({
        initialValues: {
            person_id: user.person_id,
            name: user.name,
            surname: user.surname,
            pnr: user.pnr,
            email: user.email,
        },
        onSubmit: async (values) => {
            try {
                const data = {...values, person_id: user.person_id}
                console.log("Values send from form: ", data);
                await handleSave(data);
            } catch (error) {
                console.error('Error updating user information:', error);
            }
        },
        validate: values => {
            let errors = {}
            if(!values.name){errors.firstname = "Required"}
            if(!values.surname){errors.lastname = "Required" }
            if(!values.pnr){errors.pid = "Required"}
            if(!values.email){errors.email = "Required"}else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = "Invalid email format";}
            return errors
        }
    })

    return (
        <div className={"mainContainer"}>
            <h2>Hello, {user.name}</h2>
            <p>This is the information you have entered. If something is not correct, please update.</p>
            <div className={"inputContainer"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"nameFields"}>
                        <div className="inputGroup">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}/>
                            {formik.errors.name ? <div className={"error-message"}>{formik.errors.name}</div> : null}

                        </div>
                        <div className="inputGroup">
                            <label htmlFor="surname">Surname:</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={formik.values.surname}
                                onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="pnr">Personal ID number:</label>
                        <input
                            type="text"
                            id="pnr"
                            name="pnr"
                            value={formik.values.pnr}
                            onChange={formik.handleChange}/>
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}/>
                    </div>
            <button type={"submit"}>Save</button>
            </form>
            </div>
        </div>
    )
}
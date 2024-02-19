import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import {useFormik, Field} from 'formik'
import '../styling/forms.css'

export default function CompetenceView({ competences }) {
    console.log("View: ", competences)

    const formik = useFormik({
        initialValues: {
            expertise: '',
            yearOfExperience: '',
        },

    })
    return (<div className={"mainContainer"}>
            <div className={"inputContainer"}>
            <form onSubmit={formik.handleSubmit}>
                <div className={"inputGroup"}>
                    {/*TODO render the options from the db*/}
                    <label htmlFor={"expertise"}>Area of expertise</label>
                    <select
                        id={"expertise"}
                        name={"expertise"}
                        onChange={formik.handleChange}
                        value={formik.values.expertise}>
                        <option value="" label="Select area of expertise"></option>
                        {/* Render a disabled option with loading message while competences are being fetched */}
                        {!competences ? (
                            <option disabled>Loading competences...</option>) : (
                            <>
                                {/* Render options from the competences state */}
                                {competences.map((competence) => (
                                    <option key={competence.id} value={competence.id}>
                                        {competence.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>

                    <label htmlFor={"experience"}>Years of experience</label>
                    <select id={"experience"}>
                        <option value="" label="Select years of experience"></option>
                        <option value={"lt1"}> less than 1 year</option>
                        <option value={"1to2"}>1-2 years</option>
                        <option value={"2to5"}>2-5 years</option>
                        <option value={"gt5"}> More than 5 years</option>
                    </select>
                </div>
                <button>Submit</button>
            </form>
            </div>
        </div>
    )
}
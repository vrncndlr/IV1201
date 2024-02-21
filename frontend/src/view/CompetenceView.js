import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import {useFormik, Field} from 'formik'
import '../styling/forms.css'
import ArrowButton from "../components/ArrowButton";

export default function CompetenceView({ fetchCompetences, competences, handleCompetenceSave }) {

    const formik = useFormik({
        initialValues: {
            expertise: '',
            yearOfExperience: '',
        },
        onSubmit: async (values)=>{
            console.log(values);
            handleCompetenceSave(values);
        },
        validate: values => {
            let errors = {}
            if(!values.expertise){errors.expertise = "Required"}
            if(!values.yearOfExperience){errors.yearOfExperience = "Required" }
            return errors
        }

    })
    return (<div className={"mainContainer"}>
            <p>Please enter your field of expertise and your experience in the field.</p>
            <div className={"inputContainer"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"inputGroup"}>
                        <label htmlFor={"expertise"}>Area of expertise</label>
                        <select
                            id={"expertise"}
                            name={"expertise"}
                            onChange={formik.handleChange}
                            value={formik.values.expertise}
                            onClick={fetchCompetences}>
                            <option value="" label="Select area of expertise"></option>
                            {/* Render a disabled option with loading message while competences are being fetched */}
                            {!competences ? (
                                <option disabled>Loading competences...</option>) : (
                                <>
                                    {/* Render options from the competences state */}
                                    {competences.map((competence) => (
                                        <option key={competence.name}
                                                value={competence.id}>
                                            {competence.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                        {formik.errors.expertise ?
                            <div className={"error-message"}>{formik.errors.expertise}</div> : null}
                    </div>
                    <div className={"inputGroup"}>
                        <label htmlFor={"yearOfExperience"}>Years of experience</label>
                        <select id={"yearOfExperience"}
                                name={"yearOfExperience"}
                                onChange={formik.handleChange}
                                value={formik.values.yearOfExperience}>
                            <option value="" label="Select years of experience"></option>
                            <option value={"less than 1 year"}> less than 1 year</option>
                            <option value={"1-2 years"}>1-2 years</option>
                            <option value={"2-5 years"}>2-5 years</option>
                            <option value={"More than 5 years"}> More than 5 years</option>
                        </select>
                        {formik.errors.yearOfExperience ?
                        <div className={"error-message"}>{formik.errors.yearOfExperience}</div> : null}
                    </div>
                    {/* Render the user's choices */}
                    <div className={"userDataContainer"}>
                        <h2>Your Choices:</h2>
                        <p>Area of expertise: {formik.values.expertise}</p>
                        <p>Years of experience: {formik.values.yearOfExperience}</p>
                    </div>
                    <ArrowButton type={"submit"}/>
                </form>
            </div>
        </div>
    )
}
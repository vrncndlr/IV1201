import {useFormik} from "formik";
import React from "react";
import ArrowButton from "../components/ArrowButton";

export default function AvailabilityView({props, handleAvailabilitySave}) {
    const formik = useFormik({
        initialValues: {
            start: "",
            end: "",
        },
        onSubmit: async (values)=>{
            console.log(values);
            handleAvailabilitySave(values);
        },
        validate: values => {
            let errors = {}
            if(!values.start){errors.start = "Required"}
            if(!values.end){errors.end = "Required"}
            return errors;
        }
    })
    return (
        <div className={"mainContainer"}>
            <p>Please enter your availability period</p>
            <div className={"inputContainer"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"inputGroup"}>
                        <label htmlFor="start">Start date</label>
                        <input type={"date"}
                               name={"start"}
                               id={"start"}
                               placeholder={"Start date yy-mm-dd"}
                               onChange={formik.handleChange}/>
                        {formik.errors.start ? <div className={"error-message"}>{formik.errors.start}</div> : null}
                    </div>
                    <div className={"inputGroup"}>
                        <label htmlFor="end">End date</label>
                        <input type={"date"}
                               name={"end"}
                               id={"end"}
                               placeholder={"End date yy-mm-dd"}
                               onChange={formik.handleChange}/>
                        {formik.errors.end ? <div className={"error-message"}>{formik.errors.end}</div> : null}
                    </div>
                    <ArrowButton type={"submit"}/>
                </form>
            </div>
        </div>
    )
}
import React, { useState, useEffect } from "react";
import UserCardView from "../view/UserCardView"
import CompetenceView from "../view/CompetenceView"
import AvailabilityView from "../view/AvailabilityView"
import SummaryView from "../view/SummaryView"
import {fetchTable, saveUpdatedData} from '../integration/DBCaller'


/**
 * The interface for an authenticated user.
 * The user can submit an application from here
 * @param props
 * @returns {*|JSX.Element}
 * @constructor
 */
export default function Applicant({ user, handleSave }) {
    const [competenceObject, setCompetenceObject] = useState(null);
    const [updated, setUpdated] = useState(false);
    async function updateData(data){
        try {
            const response = await saveUpdatedData(data);
            console.log("App.js, saved data: ", response);
            if (response) {
                console.log("User registered successfully ", response);
                setUpdated(true);
            }
        }catch (e){
            console.error("Error saving user information: ", e);
        }
    }
    /**
     * Attempt to fetch rows from table competence in db,
     * so far not working
     */
    async function fetchCompetences() {
        if(!competenceObject){
            try {
                const response = await fetchTable();
                await setCompetenceObject(response);
            } catch(e){
                console.error(e);
            }}
    }
    return (<div>
        <UserCardView user={user} handleSave = {updateData}/>
        <CompetenceView competences={competenceObject} fetchCompetences={fetchCompetences}/>
        <AvailabilityView />
        <SummaryView />
    </div>);
}
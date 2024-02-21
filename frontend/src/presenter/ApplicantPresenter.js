import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
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
    const [activeComponent, setActiveComponent] = useState(1);
    const [formData, setFormData] = useState({
        //user: {},
        competence: {},
        availability: {}
    });
    const showNext = () => {
        setActiveComponent((prevActiveComponent) => prevActiveComponent + 1);
    };
    async function updateData(data){
        try {
            const response = await saveUpdatedData(data);
            console.log("App.js, saved data: ", response);
            if (response) {
                console.log("User info updated successfully ", response);
                setUpdated(true);
            }
        }catch (e){
            console.error("Error saving user information: ", e);
        }
    }
    /**
     * Fetching rows from table competence in db,
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
    const handleCompetenceSave = (competenceData) => {
        setFormData(prevData => ({
            ...prevData,
            competence: competenceData
        }));
        showNext();
    };
    const handleAvailabilitySave = (availabilityData) =>{
        setFormData(prevData => ({
            ...prevData,
            availability: availabilityData
        }));
        showNext();
    }
    return (<div>
        <NavigationBar user={user}/>
        {activeComponent===1 && <UserCardView user={user} handleSave={updateData} showNext={showNext}/>}
        {activeComponent===2 && <CompetenceView competences={competenceObject} handleCompetenceSave={handleCompetenceSave} fetchCompetences={fetchCompetences} showNext={showNext}/>}
        {activeComponent===3 && <AvailabilityView handleAvailabilitySave={handleAvailabilitySave} showNext={showNext}/>}
        {activeComponent===4 && <SummaryView formData={formData} />}
    </div>);
}

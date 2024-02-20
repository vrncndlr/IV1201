import React, { useState, useEffect } from "react";
import UserCardView from "../view/UserCardView"
import CompetenceView from "../view/CompetenceView"
import AvailabilityView from "../view/AvailabilityView"
import SummaryView from "../view/SummaryView"
import {fetchTable} from '../integration/DBCaller'


/**
 * The interface for an authenticated user.
 * The user can submit an application from here
 * @param props
 * @returns {*|JSX.Element}
 * @constructor
 */
export default function Applicant({ user, handleSave }) {
    const [competenceObject, setCompetenceObject] = useState([]);
    /**
     * Attempt to fetch rows from table competence in db,
     * so far not working
     */
    async function fetchCompetences() {
        try {
            const response = await fetchTable();
            await setCompetenceObject(response);
        } catch(e){
            console.error(e);
        }
    }
    {console.log("Presenter: ", competenceObject)}
    return (<div>
        <UserCardView user={user} handleSave={handleSave}/>
        <CompetenceView competences={competenceObject} fetchCompetences={fetchCompetences}/>
        <AvailabilityView />
        <SummaryView />
    </div>);
}
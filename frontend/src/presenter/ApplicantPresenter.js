import UserCardView from "../view/UserCardView"
import CompetenceView from "../view/CompetenceView"
import AvailabilityView from "../view/AvailabilityView"
import SummaryView from "../view/SummaryView"

/**
 * The interface for an authenticated user.
 * The user can submit an application from here
 * @param props
 * @returns {*|JSX.Element}
 * @constructor
 */
export default function Applicant({ user, competences }) {
    console.log("Presenter: ", competences);
    return (<div>
            <UserCardView user={user}/>
            <CompetenceView competences={competences}/>
            <AvailabilityView/>
            {/*|| if above is submitted:*/}
            <SummaryView/>
        </div>);
}
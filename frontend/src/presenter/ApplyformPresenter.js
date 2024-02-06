import UserCardView from "../view/UserCardView"
import ExperienceView from "../view/ExperienceView"
import AvailabilityView from "../view/AvailabilityView"
import SummaryView from "../view/SummaryView"
function ApplyformPresenter(props) {

    return ((
        <UserCardView/>,
        <ExperienceView/>,
        <AvailabilityView/>)
        || //if above is submitted
        <SummaryView/>
    )
}
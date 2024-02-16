import RegistrationView from "../view/RegistrationView"
export default
/**
 * Renders the RegistrationView component and passes the handleRegistration function as a prop
 * @param props registration form data
 * @returns {JSX.Element}
 */
function Registration(props) {
    return (
        <RegistrationView onRegister={props.handleRegistration}/>
    )
}
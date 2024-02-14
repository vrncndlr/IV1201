import RegistrationView from "../view/RegistrationView"
export default

function Registration(props) {

    return (
        <RegistrationView onRegister={props.handleRegistration}/>
    )
}
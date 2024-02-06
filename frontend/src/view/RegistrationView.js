export default RegistrationView;

function RegistrationView(props) {
    //TODO Missing fields check -> error message. <FORM/>?

    return (
        <div>
            <input placeholder="First Name"/>
            <input placeholder="Last Name"/>
            <input placeholder="Email address"/>
            <input placeholder="Personal Identity Number"/>
            <input placeholder="Username"/>
            <input placeholder="Password"/>
            <button>Submit & register</button>
        </div>
    )
}
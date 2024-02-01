import LoginView from "../view/LoginView";

export default

function Login(props) {
    function loginACB(cred) {
        let user = cred.username; //code to show object
        let pass = cred.password; //it needs model?
    }
console.log(cred)
    return (
        <LoginView
            onLogin={loginACB}
        />
    )
}
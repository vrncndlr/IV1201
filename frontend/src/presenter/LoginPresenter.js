import LoginView from "../view/LoginView";

export default

function Login(props) {
    let cred;
    function loginACB(cred) {
        let user = cred.username; //code to show object
        let pass = cred.password; //it needs model?
        console.log(cred)
        props.callDB(cred);
    }
console.log(cred)
    return (
        <LoginView
            onLogin={loginACB}
        />
    )
}
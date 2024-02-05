export default LoginView;

function LoginView(props) {
    let username ="";
    let password="";
    function usernameHandlerACB(e){username+=e.target.value; }
    function passwordHandlerACB(e){password=e.target.value}
//console.log(username)
    function loginACB(){
        props.onLogin({
            username: username,
            password: password
        })
    }

    return (
        <div>
            <input onChange={usernameHandlerACB} value={props.username || ""} placeholder="Username"/>
            <input onChange={passwordHandlerACB} value={props.password || ""} placeholder="Password"/> {/*TODO hide pass*/}
            <button onClick={loginACB}>Log in</button>
        </div>
    )
}


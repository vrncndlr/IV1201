export default LoginView;

function LoginView(props) {
    async function loginACB(event){
        //Send event to presenter
    }

    return (
        <div>
            <button onClick={loginACB}>Log in</button>
        </div>
    )
}


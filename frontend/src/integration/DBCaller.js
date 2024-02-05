async function Authenticate2(usernameAndPassword){
  const URL = 'http://localhost:8000/login';
  try{
    const response = await fetch(URL, 
      {method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usernameAndPassword)}
      ,{mode:'cors'},
    );
    const user = await response.json();
    console.log("in dbcaller")
    console.log(user.name);
    return await user;
  }catch(e) {
    console.log(e);
  }
}
function Authenticate(usernameAndPassword, setLoggedInState){
  const URL = 'http://localhost:8000/login';
  try{
    return fetch(URL, 
      {method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usernameAndPassword)}
      ,{mode:'cors'},
    ).then(response => response.json())
    .then(user=>{
      console.log("dbc")
      console.log(user.name);
      setLoggedInState(true);
    })
    .catch(error => console.log(error));
  }catch(e) {
    console.log(e);
  }
}

export {Authenticate}
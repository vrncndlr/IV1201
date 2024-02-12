/**
 * Calls backend api to authenticate a user on login. 
 * @param {Object} usernameAndPassword takes argument on the form of: {username: 'username', password:'pw'}
 * @returns a user json object on a succesful authentication, 
 * otherwise returns an int with the http error status.
 */
async function Authenticate(usernameAndPassword){
  const URL = 'http://localhost:8000/login';
  try{
    const response = await fetch(URL, 
      {method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usernameAndPassword)}
      ,{mode:'cors'},);
    console.log(response)
    if(response.status !== 200)
      return response.status;
    const user = await response.json()
    //console.log("dbc")
    //console.log(user);
    return user;
  }catch(e) {
    console.log(e);
  }
}

export {Authenticate}

/**
 * Calls backend api to authenticate a user on login. 
 * @param {Object} usernameAndPassword takes argument on the form of: {username: 'username', password:'pw'}
 * @returns a user json object on a succesful authentication, 
 * otherwise returns an int with the http error status.
 */
async function Authenticate(usernameAndPassword){
  const URL = 'login';
  return await callAPI(URL, usernameAndPassword)
}

async function restoreAccountByEmail(email){
  const URL = 'restoreAccountByEmail';
  return await callAPI(URL, email);
}

async function callAPI(url, data){
  const URL = 'http://localhost:8000/';
  try{
    const response = await fetch(URL + url, 
      {method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)}
      ,{mode:'cors'},);
    //console.log("dbcaller in frontend")
    //console.log(response)
    if(response.status !== 200)
      return response.status;
    const result = await response.json()
    //console.log("dbc")
    //console.log(result);
    return result;
  }catch(e) {
    console.log(e);
  }
}


/**
 * Calls backend api to register a new user.
 * @param userdata takes the user data as a single object
 * @returns {Promise<boolean>} True if response status is 200 or 201
 */
async function saveRegistrationData(userdata) {
  //console.log("integration: ", JSON.stringify(userdata));
  try {
    // Make a POST request to the backend API endpoint for saving registration data
    const response = await fetch('http://localhost:8000/registration', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata),
      mode:'cors'
    });
    // Check for both 200 and 201 status codes
    if (response.status === 200 || response.status === 201) {
      console.log("Registration successful")
      return true;
    }
    if (!response.ok) {
      throw new Error('Failed to save registration data');
    }
  } catch (error) {
    console.error('Error saving registration data:', error);
    return false;
  }
}

export {Authenticate, restoreAccountByEmail, saveRegistrationData}
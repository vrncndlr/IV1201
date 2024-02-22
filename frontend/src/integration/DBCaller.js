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
/**
 * Calls the API to check if account with this email exists and if it is missing username and password.
 * If so, an email will to this email address with a restoration code.
 * @param {String} email User email address as string
 * @returns HTTP response containing {emailSent:true} if the restoration code was sent,
 * 404 response otherwise.
 */
async function restoreAccountByEmail(email){
  const URL = 'restoreAccountByEmail';
  return await callAPI(URL, email);
}

/**
 * Calls the API to set the username and password for the user with this email address if the restoration
 * code is the same as the latest that was sent out.
 * @param {Object} userdata Has username, password, email and resetCode fields.
 * @returns 
 */
async function updateAccountByEmail(userdata){
  const URL = 'updateAccountByEmailCode';
  return await callAPI(URL, userdata);
}

/**
 * This function calls the root api address plus the supplied URL and returns the HTTP response.
 * @param {String} url The API URL that will be called
 * @param {Object} data Will be sent in a POST request to the above address.
 * @returns HTTP responseif response status is 200, otherwise returns response status code.
 */
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
    return result; }catch(e) {
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
async function saveUpdatedData(data){
  try {
    const response = await fetch('http://localhost:8000/update',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    mode:'cors'
    });
    if (response.status === 201) {
      console.log("Update successful")
      return true;
    }
    if (!response.ok) {
      throw new Error('Failed to update personal information');
    }
  }catch(e){
    console.error(e);
  }
}
async function fetchTable() {
  const URL = 'http://localhost:8000/fetch';
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    });
    console.log(response)
    if (!response.ok) {
      return response.status;
    }
    const data = await response.json();
    console.log("DBCaller: ", data)
    return data;
  } catch (e) {
    console.error(e);
  }
}
async function setAvailability(data){
  try {
    const response = await fetch('http://localhost:8000/availability',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      mode:'cors'
    });
    if (response.status === 201) {
      console.log("Availability added.")
    }
    if (!response.ok) {
      throw new Error('Failed to add availability.');
    }
  }catch(e){
    console.error(e);
  }
}
async function saveApplicationData(data){
  try {
    const response = await fetch('http://localhost:8000/registration', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
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

export {Authenticate, restoreAccountByEmail, saveRegistrationData, updateAccountByEmail, fetchTable, saveUpdatedData, saveApplicationData, setAvailability}

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
      body: JSON.stringify(usernameAndPassword),
      mode:'cors'
      });
    console.log(response)
    if(response.status !== 200)
      return response.status;
    const user = await response.json()
    return user;
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
async function fetchTable(){
  const URL = 'http://localhost:8000/fetch';
  try{
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode:'cors'
    });
    console.log(response)
    if(!response.ok) {
      return response.status;
    }
    const data = await response.json();
    console.log("DBCaller: ", data)
    return data;
  }catch(e) {
    console.error(e);
  }
}

export {Authenticate, saveRegistrationData,fetchTable}

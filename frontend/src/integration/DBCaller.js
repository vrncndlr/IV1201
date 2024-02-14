
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
async function saveRegistrationData(userdata) {
  console.log(userdata);
  try {
    // Make a POST request to the backend API endpoint for saving registration data
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    });
    if (!response.ok) {
      throw new Error('Failed to save registration data');
    }
    // Handle successful response if needed
  } catch (error) {
    console.error('Error saving registration data:', error);
    // Handle error
  }
}


export {Authenticate, saveRegistrationData}


async function Authenticate(usernameAndPassword){
  const URL = 'http://localhost:8000/login';
  try{
    return await fetch(URL, 
      {method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usernameAndPassword)}
      ,{mode:'cors'},)
      .then(response => {
        console.log(response)
        if(response.status === 404)
          return 404;
        response.json()})
      .then(user=>{
        console.log("dbc")
        console.log(user);
        return user;
      })
      .catch(error => console.log(error));
  }catch(e) {
    console.log(e);
  }
}

export {Authenticate}
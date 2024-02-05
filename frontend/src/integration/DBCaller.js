

async function Authenticate(usernameAndPassword){
  const URL = 'http://localhost:8000/login';
  const dummy = JSON.stringify({"dummy":[{"pw":"hello"}]})
  console.log(dummy)
  try{
    const response = await fetch(URL, 
      {method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usernameAndPassword)}
      ,{mode:'cors'},
    );
    const user = await response.json();
    console.log({user});

  }catch(e) {
    console.log(e);
  }
}


export {Authenticate}
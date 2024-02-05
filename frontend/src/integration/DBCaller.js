

const Authenticate = async () => {
  try{
    const response = await fetch('http://localhost:8000/login', {mode:'cors'});
    const user = await response.json();
    console.log({user});
  }catch(e) {
    console.log(e);
  }
}


export {Authenticate}
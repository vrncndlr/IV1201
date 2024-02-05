import logo from './logo.svg';
import './App.css';
import Login from "./presenter/LoginPresenter"
import {Authenticate} from './integration/DBCaller'
import {useEffect} from 'react';

function App() {
  function callDB(user){
    Authenticate(user);
  }
  return (
    <div className="App">
      <Login callDB = {callDB}/>
    </div>
  );
}

export default App;

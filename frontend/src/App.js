import logo from './logo.svg';
import './App.css';
import Login from "./presenter/LoginPresenter"
import {Authenticate} from './integration/DBCaller'
import React, { useState, useEffect } from "react";
// Express-based auth server that uses JWT tokens to authenticate users
// npm i cors bcrypt jsonwebtoken lowdb

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

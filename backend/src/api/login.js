'use strict';

const Controller = require('../controller/Controller');
const express = require('express');
const Authorization = require('./Authorization')
const router = express.Router();


router.post('/login', async (req, res) => {
  const contr = await new Controller();
  console.log("post request")
  console.log(req.body)
  try{
    const user = await contr.login(req.body.username, req.body.password);
  }catch(e){
    console.log(e)
    res.status(500).end();
    return;
  }
  console.log("user retrieved from db")
  if(user == undefined){
    console.log("undefined user")
    res.status(404).end();
    return;
  }
  if(user.row_to_json){
    console.log(user.row_to_json)
    //if(!Authorization.verifyIfAuthorized(req, res))
      Authorization.setAuthCookie(req.body, res);
    console.log("authorized");
    //console.log(res)
  }
  return res.send(user.row_to_json);
})

router.get('/login', async (req, res) => {
  console.log("get request")
  return res.send(null);
})
module.exports = router;
'use strict';

const Controller = require('../controller/Controller');
const express = require('express');
const Authorization = require('./Authorization')
const router = express.Router();


const contr = new Controller();

router.post('/login', async (req, res) => {
  console.log("post request")
  console.log(req.body)
  const user = await contr.login(req.body.username, req.body.password);
  if(!user){
    this.sendHttpResponse(res, 404, 'No user found in database');
    return;
  }
  if(user){
    //if(!Authorization.verifyIfAuthorized(req, res))
      Authorization.setAuthCookie(req.body, res);
    console.log("authorized");
    console.log(res)
  }
  return res.send(user);
})

router.get('/login', async (req, res) => {
  console.log("get request")
  return res.send(null);
})
module.exports = router;
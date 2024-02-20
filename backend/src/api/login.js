'use strict';

const Controller = require('../controller/Controller');
const express = require('express');
const Authorization = require('./Authorization')
const router = express.Router();

/**
 * Handles all post requests to /login, takes json object {username: <susername>, password:<password>}
 * On succesful login sets JWT as cookie in the response
 * @returns user object if username and password was found in database, otherwise sends empty response
 * with 404 status. 
 */
router.post('/login', async (req, res, next) => {
  const contr = await new Controller();
  console.log("post request")
  console.log(req.body)
  try{
    const user = await contr.login(req.body.username, req.body.password);
    if(user == undefined){
      console.log("undefined user")
      res.status(404).end();
      return;
    }
    if(user.row_to_json){
      //console.log(user.row_to_json)
      //if(!Authorization.verifyIfAuthorized(req, res))
        Authorization.setAuthCookie(user.row_to_json, res);console.log("authorized");
    }
    return res.send(user.row_to_json);
  }catch(e){
    //next("server or database error on login")
    next(e)
    return;
  }
})

/**
 * Handles get requests to /login. Sends empty response with 401 Unauthorized http code.
 * @returns nothing
 */
router.get('/login', async (req, res) => {
  res.status(401).end()
  return;
})
module.exports = router;
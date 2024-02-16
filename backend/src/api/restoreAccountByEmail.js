'use strict';

const Controller = require('../controller/Controller');
const express = require('express');
const Authorization = require('./Authorization')
const router = express.Router();

router.post('/restoreAccountByEmail', async (req, res, next) => {
  const contr = await new Controller();
  //console.log("post request")
  //console.log(req.body.email)
  try{
    const messageSent = await contr.restoreAccountByEmail(req.body.email);
    if(messageSent){
      console.log("successfully sent message")
      res.send({emailSent:true})
    }else{
      console.log("no message sent")
      res.status(404).end();
    }
  }catch(e){
    next(e)
  }
})

module.exports = router;
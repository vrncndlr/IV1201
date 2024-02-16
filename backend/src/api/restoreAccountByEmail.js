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
    await contr.restoreAccountByEmail(req.body.email);
  }catch(e){
    next(e)
    return;
  }
})

module.exports = router;
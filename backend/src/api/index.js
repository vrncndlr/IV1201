'use strict';
const Controller = require('../controller/Controller');
const express = require('express');

const router = express.Router();


const contr = new Controller();

router.post('/login', async (req, res) => {
  return res.send(contr.login());
})

router.get('/login', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  return res.send(contr.login());
})

module.exports = router;
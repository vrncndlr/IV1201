import app from '../server.js';
'use strict';

const express = require('express');
const Controller = require('../controller/Controller');
const DAO = require('../integration/DAO');

app.post('/login', async (req, res) => {
  return res.send(userJson);
})

module.exports = Login;
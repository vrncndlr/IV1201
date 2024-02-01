'use strict';

const express = require('express');
const router = express.Router();

const user = new Object();
user.name = "Joelle";
user.surname = "Wilkinson";
user.username = "JoelleWilkinson";
const userJson = JSON.stringify(user);

const DAO = require('../integration/DAO');
const dao = new DAO();

router.post('/login', async (req, res) => {
  return res.send(dao.loginUser());
})

module.exports = router;
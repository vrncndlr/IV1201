'use strict';

const Controller = require('../controller/Controller');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const contr = await new Controller();
    try {
        // Extract registration data from request body
        const { firstname, lastname, pid, email, username, password } = req.body;
        // Save registration data to the database (using DAO or any other method)
        const result = await contr.register({ firstname, lastname, pid, email, username, password });
        // Send success response
        res.status(200).send('Registration successful');
        console.log("Registered new user"+ username);
    } catch (error) {
        console.error('Registration error:', error);
        // Send error response
        res.status(500).send('Registration failed');
    }
});

module.exports = router;

'use strict';

const Controller = require('../controller/Controller');
const express = require('express');
const router = express.Router();

/**
 * TODO send application to db
 */
router.post('/application', async (req, res) => {
    const contr = await new Controller();
    try {
        //const { } = req.body;
        const result = await contr.saveApplication();
        res.status(201).send('Submission successful');
    } catch (error) {
        console.error('Failed to submit application:', error);
        res.status(500).send('Submission failed');
    }
});

module.exports = router;
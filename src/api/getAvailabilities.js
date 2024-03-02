'use strict';

const Controller = require('../controller/Controller');
const express = require('express');
const router = express.Router();

/**
 * Handles all post requests to /getCompetence, takes person_id
 * On successful registration send an ok status
 * @returns data with 201 status if call was successful, otherwise 500 status.
 */
router.get('/getAvailabilities/:person_id', async (req, res) => {
    const contr = await new Controller();
    const { person_id } = req.params;
    try {
        const availabilities = await contr.getUserAvailabilities(person_id);
        console.log(availabilities);
        return res.send(availabilities);
    } catch (error) {
        console.error('Fetching error:', error);
        res.status(500).send('Fetching competence failed');
    }
});

module.exports = router;
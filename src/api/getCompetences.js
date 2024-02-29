'use strict';

const Controller = require('../controller/Controller');
const express = require('express');
const router = express.Router();

/**
 * Handles all post requests to /competence, takes json object {person_id, competence_id, years_of_experience}
 * Takes apart the object into separate values that it sends to the controller
 * On successful registration send an ok status
 * @returns boolean value true with 201 status if call was successful. otherwise false with 500 status.
 */
router.get('/getCompetence', async (req, res) => {
    const contr = await new Controller();
    try {
        await contr.getUserCompetences(person_id);
        res.status(201).send('Competences retrieved successful');
    } catch (error) {
        console.error('Fetching error:', error);
        res.status(500).send('Fetching competence failed');
    }
});

module.exports = router;
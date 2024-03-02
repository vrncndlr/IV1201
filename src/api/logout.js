'use strict';

const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    res.clearCookie('authCookie'); // Clear the authCookie
    res.status(200).end();
});
module.exports = router;
'use strict';

const Controller = require("../controller/Controller");
const express = require("express");
const router = express.Router();

router.get('/fetchapplications', async(req, res)=>{
    const contr = await new Controller();
    try {
        const applications = await contr.fetchApplications();
        if(applications === undefined){
            console.log("Cannot fetch")
            return res.status(404).end();
        }
        return res.status(200).json(applications);
    }catch (e){
        console.error(e);
        res.status(500).send('Error fetching competences');
    }
})

module.exports = router;
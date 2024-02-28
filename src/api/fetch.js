'use strict';

const Controller = require("../controller/Controller");
const express = require("express");
const router = express.Router();

router.get('/fetch', async(req, res)=>{
    const contr = await new Controller();
    try {
        const competences = await contr.fetch();
        if(competences === undefined){
            console.log("Cannot fetch")
            return res.status(404).end();
        }
        //return res.status(200).json(competences);
        console.log(competences);
        return res.send(competences);
    }catch (e){
        console.error(e);
        res.status(500).send('Error fetching competences');
    }
})

module.exports = router;
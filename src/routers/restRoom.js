const express = require('express');
const router = new express.Router()
const RestRoom = require('../models/restRoom')
const User = require('../models/user')

router.post('/restrooms', async (req, res) => {
    const restrooms = new RestRoom(req.body)

    try {
        await restrooms.save()
        res.status(201).send(restrooms)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get  /restrooms?isActive=true
//get  /restrooms?isActive=false
router.get('/restrooms', async (req, res) => {
    const match = {}
    
    if (req.query.isActive) {
        match.isActive = req.query.isActive === 'true'
    }

    try {
        const restrooms = await RestRoom.find(match);

        res.send(restrooms);
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/restrooms/:id', async (req, res) => {
    try {
        const restrooms = await RestRoom.findByIdAndDelete(req.params.id)

        if (!restrooms) {
            res.status(404).send()
        }

        res.send(restrooms)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
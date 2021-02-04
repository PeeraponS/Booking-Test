const express = require('express');
const router = new express.Router()
const RestRoom = require('../models/restRoom')
const User = require('../models/user')

router.post('/restrooms', async (req, res) => {
    const resroom = new RestRoom(req.body)

    try {
        await resroom.save()
        res.status(201).send(resroom)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/restrooms', async (req, res) => {
    try {
        const resrooms = await RestRoom.find({})
        res.send(resrooms)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
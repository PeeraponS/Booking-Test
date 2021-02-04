const express = require('express');
const router = new express.Router()
const auth = require('../middleware/auth')
const RestRoom = require('../models/restRoom')
const User = require('../models/user')
const Book = require('../models/book')

router.get('/book', async (req, res) => {
    try {
        const book = await Book.find({})
        res.send(book)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/book/me', auth, async (req, res) => {
    try {
        const book = await Book.find({ user_id: req.user })
        res.send(book)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/book/booking/:restroomid', auth, async (req, res) => {
    try {
        const restroom = await RestRoom.findById(req.params.restroomid)
        if (!restroom) {
            return res.status(400).send({ error: "not found restroom." })
        }

        if (restroom.isActive === false) {
            return res.status(400).send({
                error: "restroom is no service."
            })
        }

        if (restroom.left <= 0) {
            return res.status(400).send({
                error: "The room was fully booked."
            })
        }

        if (restroom.left < req.body.count) {
            return res.status(400).send({
                error: "Not enough room left."
            })
        }
        console.log(restroom.left)
        //update left restroom
        restroom.left = restroom.left - req.body.count;
        await restroom.save()
        
        console.log(restroom.left)

        const book = new Book({
            user_id: req.user._id,
            restroom_id: req.params.restroomid,
            count: req.body.count
        })

        await book.save()


        res.send(book)
    } catch (e) {
        res.status(400).send(error.message)
    }
})



module.exports = router


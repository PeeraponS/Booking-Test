const express = require('express');
const router = new express.Router()
const auth = require('../middleware/auth')
const RestRoom = require('../models/restRoom')
const User = require('../models/user')
const Book = require('../models/book')

// get all book
router.get('/book', async (req, res) => {
    try {
        const book = await Book.find({})
        res.send(book)
    } catch (e) {
        res.status(400).send()
    }
})

// get all book booked with user
router.get('/book/me', auth, async (req, res) => {
    try {
        const book = await Book.find({ user_id: req.user })
        res.send(book)
    } catch (e) {
        res.status(400).send()
    }
})

// booking
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

        //update left restroom
        restroom.left = restroom.left - req.body.count;
        await restroom.save()

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

// cancel book
router.delete('/book/booking/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
    
        if (!book) {
            res.status(404).send()
        }

        const restroom = await RestRoom.findById(book.restroom_id)
        restroom.left = restroom.left + book.count;
        await restroom.save()

        await Book.findByIdAndDelete(req.params.id)

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
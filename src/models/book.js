const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestRoom'
    },
    count: {
        type: Number,
        required: true
    }
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
const mongoose = require('mongoose');
const validator = require('validator');

const restroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: [
        {
          latitude: {
            type: Number,
            require:true,
            trim: true
          },
          longitude: {
            type: Number,
            require:true,
            trim: true
          },
        },
    ],
    price: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("price must be positive number")
            }
        }
    },
    left: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("left must be positive number")
            }
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    customer: [
        {
            costomerId: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ]
})

restroomSchema.virtual("books", {
    ref: "Book",
    localField: "_id", //_id of restroom
    foreignField: "restroom_id"
})

const RestRoom = mongoose.model('RestRoom', restroomSchema)

module.exports = RestRoom
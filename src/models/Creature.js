const mongoose = require("mongoose")

const CreatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    species: {
        type: String,
        required: true,
        minLength: 3,

    },
    skinColor: {
        type: String,
        required: true,
        minLength: 2,
    },
    eyeColor: {
        type: String,
        required: true,
        minLength: 2,
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "invalid url"],
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 500,
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

})

const Creature = mongoose.model("Creature", CreatureSchema)

module.exports = Creature;
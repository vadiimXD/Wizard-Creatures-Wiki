const mongoose = require("mongoose")

const CreatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    skinColor: {
        type: String,
        required: true
    },
    eyeColor: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "invalid url"],
    },
    description: {
        type: String,
        required: true,
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
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 7
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
    },
    createdPosts: [{
        type: mongoose.Types.ObjectId,
        ref: "Creature",
    }]
})


const User = mongoose.model("User", userSchema)

module.exports = User;
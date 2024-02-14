const User = require("../models/User")

exports.getUser = (userId) => { return User.findById(userId) }
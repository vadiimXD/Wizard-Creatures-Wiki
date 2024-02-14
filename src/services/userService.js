const User = require("../models/User")
const creatureService = require("./creatureService")

exports.getUser = (userId) => { return User.findById(userId) }

exports.isOwner = async (req, res, next) => {
    const creature = await creatureService.getOneCreature(req.params.creatureId);

    if (creature.owner != req.user.userId) {
        return res.redirect("/")
    }
    
    next()
}